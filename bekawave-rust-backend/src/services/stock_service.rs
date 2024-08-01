use sqlx::{PgPool};
use crate::models::Stock;
use tracing::info;
use thiserror::Error;

/// A service for managing `Stock` entities in a PostgreSQL database.
pub struct StockService {
    pool: PgPool,
}

#[derive(Error, Debug)]
pub enum StockError {
    #[error("Duplicate stock entry found")]
    DuplicateStock,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Stock not found")]
    NotFound,
}

impl StockService {
    /// Creates a new `StockService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `StockService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::StockService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        StockService { pool }
    }

    /// Creates a new stock record in the database.
    ///
    /// # Arguments
    ///
    /// * `stock` - A `Stock` instance containing the stock's details.
    ///
    /// # Returns
    ///
    /// * `Ok(Stock)` - On success, returns the created `Stock` with the generated `stock_id`.
    /// * `Err(StockError)` - On failure, returns an `StockError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Stock;
    /// use crate::services::StockService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// let new_stock = Stock { store_id: 1, amount: 100, product_id: 1, quantity: 10, product_worth: 1000, stock_id: 0 };
    /// let created_stock = stock_service.create_stock(new_stock).await.unwrap();
    /// # };
    /// ```
    pub async fn create_stock(&self, stock: Stock) -> Result<Stock, StockError> {
        info!("Inserting this values Store_id: {}, Amount: {}, Product_id: {}, Quantity: {}, Product_Worth: {}", stock.store_id, stock.amount, stock.product_id, stock.quantity, stock.product_worth);

        // Check for duplicate stock entry
        let check_query = "SELECT 1 FROM public.stock_record WHERE store_id = $1 AND product_id = $2 LIMIT 1";
        let existing_stock: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(&stock.store_id)
            .bind(&stock.product_id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_stock.is_some() {
            return Err(StockError::DuplicateStock);
        }

        let query = "INSERT INTO public.stock_record (store_id, amount, product_id, quantity, product_worth) \
                     VALUES ($1, $2, $3, $4, $5) \
                     RETURNING stock_id, store_id, amount, product_id, quantity, product_worth";

        let record = sqlx::query_as::<_, Stock>(query)
            .bind(stock.store_id)
            .bind(stock.amount)
            .bind(stock.product_id)
            .bind(stock.quantity)
            .bind(stock.product_worth)
            .fetch_one(&self.pool)
            .await?;

        Ok(record)
    }

    /// Retrieves a stock record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the stock to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Stock)` - On success, returns the `Stock` with the specified `stock_id`.
    /// * `Err(StockError)` - On failure, returns an `StockError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StockService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// let stock_id = 1;
    /// let stock = stock_service.get_stock(stock_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_stock(&self, id: i32) -> Result<Stock, StockError> {
        info!("Attempting to get stock with ID: {}.", id);

        let query = "SELECT * FROM public.stock_record WHERE stock_id = $1";

        let stock_found = sqlx::query_as::<_, Stock>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(stock_found)
    }

    /// Updates an existing stock's details in the database.
    ///
    /// # Arguments
    ///
    /// * `stock` - A `Stock` instance containing the updated details. Must include the `stock_id` of the stock to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Stock)` - On success, returns the updated `Stock`.
    /// * `Err(StockError)` - On failure, returns an `StockError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Stock;
    /// use crate::services::StockService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// let updated_stock = Stock { store_id: 1, amount: 200, product_id: 1, quantity: 20, product_worth: 2000, stock_id: 1 };
    /// let result = stock_service.update_stock(updated_stock).await.unwrap();
    /// # };
    /// ```
    pub async fn update_stock(&self, stock: Stock) -> Result<Option<Stock>, StockError> {
        info!("Attempting to update stock with ID: {}.", stock.stock_id);

        let query = "UPDATE public.stock_record SET store_id = $1, amount = $2, product_id = $3, quantity = $4, product_worth = $5 WHERE stock_id = $6 RETURNING stock_id, store_id, amount, product_id, quantity, product_worth";

        let updated_stock = sqlx::query_as::<_, Stock>(query)
            .bind(stock.store_id)
            .bind(stock.amount)
            .bind(stock.product_id)
            .bind(stock.quantity)
            .bind(stock.product_worth)
            .bind(stock.stock_id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(updated_stock)
    }

    /// Retrieves all stock records from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Stock>)` - On success, returns a vector of `Stock` instances representing all stock records in the database.
    /// * `Err(StockError)` - On failure, returns an `StockError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StockService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// let stocks = stock_service.get_all_stocks().await.unwrap();
    /// for stock in stocks {
    ///     println!("Stock: {} with product ID: {} at store ID: {}", stock.amount, stock.product_id, stock.store_id);
    /// }
    /// # };
    /// ```
    pub async fn get_all_stocks(&self) -> Result<Vec<Stock>, StockError> {
        info!("Attempting to retrieve all stocks.");

        let query = "SELECT * FROM public.stock_record";

        let stocks = sqlx::query_as::<_, Stock>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(stocks)
    }

    /// Deletes a stock record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the stock to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(usize)` - On success, returns the number of rows affected (should be 1 for a successful deletion).
    /// * `Err(StockError)` - On failure, returns an `StockError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StockService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let stock_service = StockService::new(pool).await;
    /// let stock_id = 1;
    /// let rows_affected = stock_service.delete_stock(stock_id).await.unwrap();
    /// assert_eq!(rows_affected, 1);
    /// # };
    /// ```
    pub async fn delete_stock(&self, id: i32) -> Result<usize, StockError> {
        info!("Attempting to delete stock with ID: {}.", id);

        // Check if the stock exists
        let check_query = "SELECT 1 FROM public.stock_record WHERE stock_id = $1 LIMIT 1";
        let existing_stock: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_stock.is_none() {
            return Err(StockError::NotFound);
        }

        // Proceed with deletion
        let query = "DELETE FROM public.stock_record WHERE stock_id = $1";

        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }
}
