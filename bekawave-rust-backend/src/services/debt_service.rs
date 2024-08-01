use sqlx::{PgPool};
use thiserror::Error;
use tracing::info;
use crate::models::Debt;

/// A service for managing `Debt` entities in a PostgreSQL database.
pub struct DebtService {
    pool: PgPool,
}
/// Error type for the `DebtService`.
#[derive(Error, Debug)]
pub enum DebtError {
    #[error("Duplicate debt found")]
    DuplicateDebt,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Debt not found")]
    NotFound,
}
impl DebtService {
    /// Creates a new `DebtService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `DebtService` instance.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use sqlx::PgPool;
    /// use crate::services::DebtService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        DebtService { pool }
    }

    /// Creates a new debt record in the database.
    ///
    /// # Arguments
    ///
    /// * `debt` - A `Debt` instance containing the debt's details.
    ///
    /// # Returns
    ///
    /// * `Ok(Debt)` - On success, returns the created `Debt` with the generated `debt_id`.
    /// * `Err(DebtError)` - On failure, returns a `DebtError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::models::Debt;
    /// use crate::services::DebtService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// let debt = Debt {
    ///     debt_id: 0,
    ///     customer_id: 1,
    ///     amount: 100,
    ///     date: NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap(),
    ///     paid_date: None,
    ///     is_paid: false,
    /// };
    /// let created_debt = debt_service.create_debt(debt).await.unwrap();
    /// # };
    /// ```
    pub async fn create_debt(&self, debt: Debt) -> Result<Debt, DebtError> {
        info!("Attempting to create a new debt with customer_id: {}, amount: {}, date: {}, paid_date: {:?}, is_paid: {}",
            debt.customer_id, debt.amount, debt.customer_date, debt.paid_date, debt.is_paid);

        let check_query = "SELECT 1 FROM public.debt WHERE customer_id = $1 AND amount = $2 AND date = $3 LIMIT 1";
        let existing_debt: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(debt.customer_id)
            .bind(debt.amount)
            .bind(debt.customer_date)
            .fetch_optional(&self.pool)
            .await?;

        if existing_debt.is_some() {
            info!("Debt with customer_id: {}, amount: {}, and date: {} already exists", debt.customer_id, debt.amount, debt.customer_date);
            return Err(DebtError::DuplicateDebt);
        }

        let query = "INSERT INTO public.debt (customer_id, amount, date, paid_date, is_paid) VALUES ($1, $2, $3, $4, $5) RETURNING debt_id, customer_id, amount, date, paid_date, is_paid";
        let debt_out = sqlx::query_as::<_, Debt>(query)
            .bind(debt.customer_id)
            .bind(debt.amount)
            .bind(debt.customer_date)
            .bind(debt.paid_date)
            .bind(debt.is_paid)
            .fetch_one(&self.pool)
            .await?;

        Ok(debt_out)
    }

    /// Retrieves a debt record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the debt to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Debt)` - On success, returns the `Debt` with the specified `debt_id`.
    /// * `Err(DebtError)` - On failure, returns a `DebtError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::DebtService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// let debt_id = 1;
    /// let debt = debt_service.get_debt(debt_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_debt(&self, id: i32) -> Result<Debt, DebtError> {
        info!("Attempting to retrieve debt with ID: {}.", id);

        let query = "SELECT * FROM public.debt WHERE debt_id = $1";
        let debt = sqlx::query_as::<_, Debt>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(debt)
    }
    // Other methods...

    /// Retrieves all debt records from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Debt>)` - On success, returns a vector of all `Debt` records.
    /// * `Err(DebtError)` - On failure, returns a `DebtError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::DebtService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// let debts = debt_service.get_all_debts().await.unwrap();
    /// # };
    /// ```
    pub async fn get_all_debts(&self) -> Result<Vec<Debt>, DebtError> {
        info!("Attempting to retrieve all debts.");

        let query = "SELECT * FROM public.debt";
        let debts = sqlx::query_as::<_, Debt>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(debts)
    }
    /// Updates an existing debt's details in the database.
    ///
    /// # Arguments
    ///
    /// * `debt` - A `Debt` instance containing the updated details. Must include the `debt_id` of the debt to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Option<Debt>)` - On success, returns the updated `Debt`. If the debt does not exist, returns `None`.
    /// * `Err(DebtError)` - On failure, returns a `DebtError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::models::Debt;
    /// use crate::services::DebtService;
    /// use sqlx::PgPool;
    /// use chrono::NaiveDateTime;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// let updated_debt = Debt {
    ///     debt_id: 1,
    ///     customer_id: 1,
    ///     amount: 150,
    ///     date: NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap(),
    ///     paid_date: Some(NaiveDateTime::parse_from_str("2024-08-02 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap()),
    ///     is_paid: true,
    /// };
    /// let result = debt_service.update_debt(updated_debt).await.unwrap();
    /// # };
    /// ```
    pub async fn update_debt(&self, debt: Debt) -> Result<Option<Debt>, DebtError> {
        info!("Attempting to update debt with ID: {}.", debt.debt_id);

        let query = "UPDATE public.debt SET customer_id = $1, amount = $2, date = $3, paid_date = $4, is_paid = $5 WHERE debt_id = $6 RETURNING debt_id, customer_id, amount, date, paid_date, is_paid";
        let updated_debt = sqlx::query_as::<_, Debt>(query)
            .bind(debt.customer_id)
            .bind(debt.amount)
            .bind(debt.customer_date)
            .bind(debt.paid_date)
            .bind(debt.is_paid)
            .bind(debt.debt_id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(updated_debt)
    }

    /// Deletes a debt record from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the debt to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(bool)` - Returns `true` if the debt was successfully deleted; `false` if no debt with the given ID was found.
    /// * `Err(DebtError)` - On failure, returns a `DebtError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```rust
    /// use crate::services::DebtService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let debt_service = DebtService::new(pool).await;
    /// let debt_id = 1;
    /// let was_deleted = debt_service.delete_debt(debt_id).await.unwrap();
    /// # };
    /// ```
    pub async fn delete_debt(&self, id: i32) -> Result<bool, DebtError> {
        info!("Attempting to delete debt with ID: {}.", id);

        let query = "DELETE FROM public.debt WHERE debt_id = $1";
        let result = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }
}