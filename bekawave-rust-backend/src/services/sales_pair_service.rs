use sqlx::{PgPool};
use crate::models::SalesPair;
use tracing::info;
use thiserror::Error;

/// A service for managing `SalesPair` entities in a PostgreSQL database.
pub struct SalesPairService {
    pool: PgPool
}

#[derive(Error, Debug)]
pub enum SalesPairError {
    #[error("Duplicate sales pair found")]
    DuplicateSalesPair,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Sales pair not found")]
    NotFound,
}

impl SalesPairService {
    /// Creates a new `SalesPairService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `SalesPairService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::SalesPairService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        SalesPairService { pool }
    }

    /// Creates a new sales pair in the database.
    ///
    /// # Arguments
    ///
    /// * `sales_pair` - A `SalesPair` instance containing the details of the sales representatives and the paired date.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesPair)` - On success, returns the created `SalesPair` with the generated `sales_pair_id`.
    /// * `Err(SalesPairError)` - On failure, returns a `SalesPairError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::SalesPair;
    /// use crate::services::SalesPairService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// let paired_date = NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap();
    /// let new_sales_pair = SalesPair { sales_pair_id: 0, sales_rep_id_one: 1, sales_rep_id_two: 2, paired_date };
    /// let created_sales_pair = sales_pair_service.create_sales_pair(new_sales_pair).await.unwrap();
    /// # };
    /// ```
    pub async fn create_sales_pair(&self, sales_pair: SalesPair) -> Result<SalesPair, SalesPairError> {
        info!("Attempting to create a new sales pair with sales_rep_id_one: {}, sales_rep_id_two: {}, paired_date: {}",
              sales_pair.sales_rep_id_one,
              sales_pair.sales_rep_id_two,
              sales_pair.paired_date);

        // Check if a sales pair with the same representatives and paired date already exists
        let check_query = "SELECT 1 FROM public.sales_pair WHERE sales_rep_id_one = $1 AND sales_rep_id_two = $2 AND paired_date = $3 LIMIT 1";
        let existing_sales_pair: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(sales_pair.sales_rep_id_one)
            .bind(sales_pair.sales_rep_id_two)
            .bind(sales_pair.paired_date)
            .fetch_optional(&self.pool)
            .await?;

        if existing_sales_pair.is_some() {
            info!("Sales pair with sales_rep_id_one: {}, sales_rep_id_two: {}, paired_date: {} already exists",
                  sales_pair.sales_rep_id_one,
                  sales_pair.sales_rep_id_two,
                  sales_pair.paired_date);
            return Err(SalesPairError::DuplicateSalesPair);
        }

        // Insert the new sales pair into the database
        let query = "INSERT INTO public.sales_pair (sales_rep_id_one, sales_rep_id_two, paired_date) VALUES ($1, $2, $3) RETURNING sales_pair_id, sales_rep_id_one, sales_rep_id_two, paired_date";
        let sales_pair_out = sqlx::query_as::<_, SalesPair>(query)
            .bind(sales_pair.sales_rep_id_one)
            .bind(sales_pair.sales_rep_id_two)
            .bind(sales_pair.paired_date)
            .fetch_one(&self.pool)
            .await?;

        Ok(sales_pair_out)
    }

    /// Retrieves a sales pair from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales pair to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesPair)` - On success, returns the `SalesPair` with the specified `sales_pair_id`.
    /// * `Err(SalesPairError)` - On failure, returns a `SalesPairError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesPairService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// let sales_pair_id = 1;
    /// let sales_pair = sales_pair_service.get_sales_pair(sales_pair_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_sales_pair(&self, id: i32) -> Result<SalesPair, SalesPairError> {
        info!("Attempting to get sales pair with ID: {}.", id);

        let query = "SELECT * FROM public.sales_pair WHERE sales_pair_id = $1";

        let sales_pair_found = sqlx::query_as::<_, SalesPair>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(sales_pair_found)
    }

    /// Updates an existing sales pair's details in the database.
    ///
    /// # Arguments
    ///
    /// * `sales_pair` - A `SalesPair` instance containing the updated details. Must include the `sales_pair_id` of the sales pair to update.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesPair)` - On success, returns the updated `SalesPair`.
    /// * `Err(SalesPairError)` - On failure, returns a `SalesPairError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::SalesPair;
    /// use crate::services::SalesPairService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// let updated_sales_pair = SalesPair { sales_pair_id: 1, sales_rep_id_one: 3, sales_rep_id_two: 4, paired_date: NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap() };
    /// let result = sales_pair_service.update_sales_pair(updated_sales_pair).await.unwrap();
    /// # };
    /// ```
    pub async fn update_sales_pair(&self, sales_pair: SalesPair) -> Result<SalesPair, SalesPairError> {
        info!("Attempting to update sales pair with ID: {}.", sales_pair.sales_pair_id);

        let query = "UPDATE public.sales_pair SET sales_rep_id_one = $1, sales_rep_id_two = $2, paired_date = $3 WHERE sales_pair_id = $4 RETURNING sales_pair_id, sales_rep_id_one, sales_rep_id_two, paired_date";

        let updated_sales_pair = sqlx::query_as::<_, SalesPair>(query)
            .bind(sales_pair.sales_rep_id_one)
            .bind(sales_pair.sales_rep_id_two)
            .bind(sales_pair.paired_date)
            .bind(sales_pair.sales_pair_id)
            .fetch_one(&self.pool)
            .await?;

        Ok(updated_sales_pair)
    }

    /// Retrieves all sales pairs from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<SalesPair>)` - On success, returns a vector of `SalesPair` instances representing all sales pairs in the database.
    /// * `Err(SalesPairError)` - On failure, returns a `SalesPairError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesPairService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// let sales_pairs = sales_pair_service.get_all_sales_pairs().await.unwrap();
    /// for sales_pair in sales_pairs {
    ///     println!("Sales Pair ID: {}, Rep 1: {}, Rep 2: {}, Date: {}", sales_pair.sales_pair_id, sales_pair.sales_rep_id_one, sales_pair.sales_rep_id_two, sales_pair.paired_date);
    /// }
    /// # };
    /// ```
    pub async fn get_all_sales_pairs(&self) -> Result<Vec<SalesPair>, SalesPairError> {
        info!("Attempting to retrieve all sales pairs.");

        let query = "SELECT * FROM public.sales_pair";

        let sales_pairs = sqlx::query_as::<_, SalesPair>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(sales_pairs)
    }

    /// Deletes a sales pair from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales pair to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(usize)` - On success, returns the number of rows affected (should be 1 for a successful deletion).
    /// * `Err(SalesPairError)` - On failure, returns a `SalesPairError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesPairService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_pair_service = SalesPairService::new(pool).await;
    /// let sales_pair_id = 1;
    /// let rows_affected = sales_pair_service.delete_sales_pair(sales_pair_id).await.unwrap();
    /// assert_eq!(rows_affected, 1);
    /// # };
    /// ```
    pub async fn delete_sales_pair(&self, id: i32) -> Result<usize, SalesPairError> {
        info!("Attempting to delete sales pair with ID: {}.", id);

        // Check if the sales pair exists
        let check_query = "SELECT 1 FROM public.sales_pair WHERE sales_pair_id = $1 LIMIT 1";
        let existing_sales_pair: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_sales_pair.is_none() {
            return Err(SalesPairError::NotFound);
        }

        // Proceed with deletion
        let query = "DELETE FROM public.sales_pair WHERE sales_pair_id = $1";
        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }

}
