use sqlx::PgPool;
use thiserror::Error;
use log::info;
use crate::models::SalesRep;

/// A service for managing `SalesRep` entities in a PostgreSQL database.
pub struct SalesRepService{
    pool: PgPool
}
#[derive(Error, Debug)]
pub enum SalesRepError {
    #[error("Duplicate rep found")]
    DuplicateSalesRep,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Rep not found")]
    NotFound,
}

impl SalesRepService {
    /// Creates a new `SalesRepService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `SalesRepService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::SalesRepService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = SalesRepService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        SalesRepService { pool }
    }
    /// Creates a new sales representative in the database.
    ///
    /// # Arguments
    ///
    /// * `sales_rep` - A `SalesRep` instance containing the sales representative's details.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesRep)` - On success, returns the created `SalesRep` with the generated `sales_rep_id`.
    /// * `Err(SalesRepError::DuplicateSalesRep)` - If a sales representative with the same name and phone number already exists.
    /// * `Err(SalesRepError::SqlxError)` - On database or query execution errors.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::SalesRep;
    /// use crate::services::SalesRepService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_rep_service = SalesRepService::new(pool).await;
    /// let new_sales_rep = SalesRep { name: "John Doe".into(), phone_no: "1234567890".into(), sales_rep_id: 0 };
    /// let created_sales_rep = sales_rep_service.create_sales_rep(new_sales_rep).await.unwrap();
    /// # };
    /// ```
    pub async fn create_sales_rep(&self, sales_rep: SalesRep) -> Result<SalesRep, SalesRepError> {
        info!("Attempting to create new sales rep");
        let check_query = "SELECT 1 FROM public.sales_rep WHERE name = $1 AND phone_no = $2 LIMIT 1";
        let existing_sales_rep:Option<(i32,)> = sqlx::query_as(check_query)
            .bind(&sales_rep.name)
            .bind(&sales_rep.phone_no)
            .fetch_optional(&self.pool)
            .await?;

        if existing_sales_rep.is_some() {
            info!("Existing sales rep with name: {} is found", &sales_rep.name);
            return Err(SalesRepError::DuplicateSalesRep)
        }

        let query = "INSERT INTO public.sales_rep (name, phone_no) VALUES ( $1, $2 ) RETURNING sales_rep_id, name, phone_no";
        let sales_rep_out = sqlx::query_as::<_, SalesRep>(query)
            .bind(sales_rep.name)
            .bind(sales_rep.phone_no)
            .fetch_one(&self.pool)
            .await?;
        Ok(sales_rep_out)
    }
    /// Retrieves a sales representative by their ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales representative to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesRep)` - On success, returns the `SalesRep` with the specified `sales_rep_id`.
    /// * `Err(SalesRepError::NotFound)` - If no sales representative with the given ID is found.
    /// * `Err(SalesRepError::SqlxError)` - On database or query execution errors.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesRepService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_rep_service = SalesRepService::new(pool).await;
    /// let sales_rep = sales_rep_service.get_sales_rep(1).await.unwrap();
    /// println!("Sales Rep: {} - {}", sales_rep.name, sales_rep.phone_no);
    /// # };
    /// ```
    pub async fn get_sales_rep(&self, id: i32) -> Result<SalesRep, SalesRepError> {
        info!("Attempting to get sales rep with ID: {}.", id);
        let query = "SELECT sales_rep_id, name, phone_no FROM public.sales_rep WHERE sales_rep_id = $1";
        let sales_rep = sqlx::query_as::<_, SalesRep>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await
            .map_err(|_| SalesRepError::NotFound)?;
        Ok(sales_rep)
    }
    /// Retrieves all sales representatives from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<SalesRep>)` - On success, returns a vector of all `SalesRep` instances.
    /// * `Err(SalesRepError::SqlxError)` - On database or query execution errors.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesRepService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_rep_service = SalesRepService::new(pool).await;
    /// let sales_reps = sales_rep_service.get_all_sales_reps().await.unwrap();
    /// for rep in sales_reps {
    ///     println!("Sales Rep: {} - {}", rep.name, rep.phone_no);
    /// }
    /// # };
    /// ```
    pub async fn get_all_sales_reps(&self) -> Result<Vec<SalesRep>, SalesRepError> {
        info!("Attempting to retrieve all sales reps.");
        let query = "SELECT sales_rep_id, name, phone_no FROM public.sales_rep";
        let sales_reps = sqlx::query_as::<_, SalesRep>(query)
            .fetch_all(&self.pool)
            .await
            .map_err(SalesRepError::from)?;
        Ok(sales_reps)
    }
    /// Updates an existing sales representative's details in the database.
    ///
    /// # Arguments
    ///
    /// * `sales_rep` - A `SalesRep` instance containing the updated details. Must include the `sales_rep_id` of the sales representative to update.
    ///
    /// # Returns
    ///
    /// * `Ok(SalesRep)` - On success, returns the updated `SalesRep`.
    /// * `Err(SalesRepError::NotFound)` - If no sales representative with the given ID is found.
    /// * `Err(SalesRepError::SqlxError)` - On database or query execution errors.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::SalesRep;
    /// use crate::services::SalesRepService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_rep_service = SalesRepService::new(pool).await;
    /// let updated_sales_rep = SalesRep { name: "Jane Doe".into(), phone_no: "0987654321".into(), sales_rep_id: 1 };
    /// let result = sales_rep_service.update_sales_rep(updated_sales_rep).await.unwrap();
    /// println!("Updated Sales Rep: {} - {}", result.name, result.phone_no);
    /// # };
    /// ```
    pub async fn update_sales_rep(&self, sales_rep: SalesRep) -> Result<SalesRep, SalesRepError> {
        info!("Attempting to update sales rep with ID: {}.", sales_rep.sales_rep_id);
        let check_query = "SELECT 1 FROM public.sales_rep WHERE sales_rep_id = $1";
        let exists: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(sales_rep.sales_rep_id)
            .fetch_optional(&self.pool)
            .await?;

        if exists.is_none() {
            info!("Sales rep with ID: {} not found.", sales_rep.sales_rep_id);
            return Err(SalesRepError::NotFound);
        }

        let query = "UPDATE public.sales_rep SET name = $1, phone_no = $2 WHERE sales_rep_id = $3 RETURNING sales_rep_id, name, phone_no";
        let updated_sales_rep = sqlx::query_as::<_, SalesRep>(query)
            .bind(&sales_rep.name)
            .bind(&sales_rep.phone_no)
            .bind(sales_rep.sales_rep_id)
            .fetch_one(&self.pool)
            .await?;
        Ok(updated_sales_rep)
    }
    /// Deletes a sales representative from the database by their ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the sales representative to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(())` - On success, returns an empty tuple indicating the deletion was successful.
    /// * `Err(SalesRepError::NotFound)` - If no sales representative with the given ID is found.
    /// * `Err(SalesRepError::SqlxError)` - On database or query execution errors.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::SalesRepService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let sales_rep_service = SalesRepService::new(pool).await;
    /// sales_rep_service.delete_sales_rep(1).await.unwrap();
    /// println!("Sales Rep with ID 1 has been deleted.");
    /// # };
    /// ```
    pub async fn delete_sales_rep(&self, id: i32) -> Result<usize, SalesRepError> {
        info!("Attempting to delete sales rep with ID: {}.", &id);
        let check_query = "SELECT 1 FROM public.sales_rep WHERE sales_rep_id = $1 LIMIT 1";
        let exists: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if exists.is_none() {
            info!("Sales rep with ID: {} not found.", id);
            return Err(SalesRepError::NotFound);
        }

        let query = "DELETE FROM public.sales_rep WHERE sales_rep_id = $1";
        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }
}