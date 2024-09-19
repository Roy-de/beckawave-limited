use sqlx::{PgPool};
use thiserror::Error;
use tracing::info;
use crate::models::Sales;

/// A service for managing `Sales` entities in a PostgreSQL database.
pub struct SalesService {
    pool: PgPool,
}

/// Error type for the `SalesService`.
#[derive(Error, Debug)]
pub enum SalesError {
    #[error("Sales record not found")]
    NotFound,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Unsupported format")]
    UnsupportedFormat,
}

impl SalesService {
    /// Creates a new `SalesService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `SalesService` instance.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use sqlx::PgPool;
    /// use crate::services::SalesService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        SalesService { pool }
    }

    /// Creates a new sales record in the database.
    ///
    /// # Arguments
    ///
    /// * `sales` - A `Sales` instance containing the sales details.
    ///
    /// # Returns
    ///
    /// * `Ok(Sales)` - On success, returns the created `Sales` with the generated `sales_id`.
    /// * `Err(SalesError)` - On failure, returns a `SalesError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::models::Sales;
    /// use crate::services::SalesService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// let sales = Sales {
    ///     sales_id: 0,
    ///     customer_id: 1,
    ///     sales_pair_id: None,
    ///     sales_rep_id: Some(2),
    ///     total_price: 500,
    ///     sales_time: NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap(),
    ///     product_id: 3,
    ///     product_quantity: 10,
    /// };
    /// let created_sales = sales_service.create_sales(sales).await.unwrap();
    /// # };
    /// ```
    pub async fn create_sales(&self, sales: Sales) -> Result<Sales, SalesError> {
        info!("Attempting to create a new sales record for customer_id: {}, total_price: {}, sales_time: {}, product_id: {}, product_quantity: {}",
            sales.customer_id, sales.total_price, sales.sales_time, sales.product_id, sales.product_quantity);

        let query = "INSERT INTO public.sales (customer_id, sales_pair_id, sales_rep_id, total_price, sales_time, product_id, product_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING sales_id, customer_id, sales_pair_id, sales_rep_id, total_price, sales_time, product_id, product_quantity";
        let sales_out = sqlx::query_as::<_, Sales>(query)
            .bind(sales.customer_id)
            .bind(sales.sales_pair_id)
            .bind(sales.sales_rep_id)
            .bind(sales.total_price)
            .bind(sales.sales_time)
            .bind(sales.product_id)
            .bind(sales.product_quantity)
            .fetch_one(&self.pool)
            .await?;

        Ok(sales_out)
    }

    /// Retrieves a sales record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales record to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Sales)` - On success, returns the `Sales` with the specified `sales_id`.
    /// * `Err(SalesError)` - On failure, returns a `SalesError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::SalesService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// let sales_id = 1;
    /// let sales = sales_service.get_sales(sales_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_sales(&self, id: i32) -> Result<Sales, SalesError> {
        info!("Attempting to retrieve sales record with ID: {}.", id);

        let query = "SELECT * FROM public.sales WHERE sales_id = $1";
        let sales = sqlx::query_as::<_, Sales>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(sales)
    }
    /// Retrieves all sales records from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Sales>)` - On success, returns a vector of all `Sales` records.
    /// * `Err(SalesError)` - On failure, returns a `SalesError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::SalesService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// let all_sales = sales_service.get_all_sales().await.unwrap();
    /// # };
    /// ```
    pub async fn get_all_sales(&self) -> Result<Vec<Sales>, SalesError> {
        info!("Attempting to retrieve all sales records.");

        let query = "SELECT * FROM public.sales";
        let sales_list = sqlx::query_as::<_, Sales>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(sales_list)
    }

    /// Updates an existing sales record in the database.
    ///
    /// # Arguments
    ///
    /// * `sales` - A `Sales` instance containing the updated details. Must include the `sales_id` of the record to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Option<Sales>)` - On success, returns the updated `Sales`. If the sales record does not exist, returns `None`.
    /// * `Err(SalesError)` - On failure, returns a `SalesError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::models::Sales;
    /// use crate::services::SalesService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// let updated_sales = Sales {
    ///     sales_id: 1,
    ///     customer_id: 1,
    ///     sales_pair_id: Some(2),
    ///     sales_rep_id: Some(3),
    ///     total_price: 600,
    ///     sales_time: NaiveDateTime::parse_from_str("2024-08-02 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap(),
    ///     product_id: 4,
    ///     product_quantity: 12,
    /// };
    /// let result = sales_service.update_sales(updated_sales).await.unwrap();
    /// # };
    /// ```
    pub async fn update_sales(&self, sales: Sales) -> Result<Option<Sales>, SalesError> {
        info!("Attempting to update sales record with ID: {}.", sales.sales_id);

        let query = "UPDATE public.sales SET customer_id = $1, sales_pair_id = $2, sales_rep_id = $3, total_price = $4, sales_time = $5, product_id = $6, product_quantity = $7 WHERE sales_id = $8 RETURNING sales_id, customer_id, sales_pair_id, sales_rep_id, total_price, sales_time, product_id, product_quantity";
        let updated_sales = sqlx::query_as::<_, Sales>(query)
            .bind(sales.customer_id)
            .bind(sales.sales_pair_id)
            .bind(sales.sales_rep_id)
            .bind(sales.total_price)
            .bind(sales.sales_time)
            .bind(sales.product_id)
            .bind(sales.product_quantity)
            .bind(sales.sales_id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(updated_sales)
    }

    /// Deletes a sales record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales record to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(bool)` - Returns `true` if the sales record was successfully deleted; `false` if no sales record with the given ID was found.
    /// * `Err(SalesError)` - On failure, returns a `SalesError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::SalesService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_service = SalesService::new(pool).await;
    /// let sales_id = 1;
    /// let was_deleted = sales_service.delete_sales(sales_id).await.unwrap();
    /// # };
    /// ```
    pub async fn delete_sales(&self, id: i32) -> Result<bool, SalesError> {
        info!("Attempting to delete sales record with ID: {}.", id);

        let query = "DELETE FROM public.sales WHERE sales_id = $1";
        let result = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }
}