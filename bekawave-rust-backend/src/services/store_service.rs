use sqlx::{Error, PgPool};
use crate::models::store::Store;
use tracing::info;
use thiserror::Error;

/// A service for managing `Store` entities in a PostgreSQL database.
pub struct StoreService {
    pool: PgPool
}
#[derive(Error, Debug)]
pub enum StoreError {
    #[error("Duplicate store found")]
    DuplicateStore,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Store not found")]
    NotFound,
}
impl StoreService {
    /// Creates a new `StoreService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `StoreService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::StoreService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        StoreService { pool }
    }

    /// Creates a new store in the database.
    ///
    /// # Arguments
    ///
    /// * `store` - A `Store` instance containing the store's details.
    ///
    /// # Returns
    ///
    /// * `Ok(Store)` - On success, returns the created `Store` with the generated `store_id`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::store::Store;
    /// use crate::services::StoreService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// let new_store = Store { name: "My Store".into(), location: "My Location".into(), store_id: 0 };
    /// let created_store = store_service.create_store(new_store).await.unwrap();
    /// # };
    /// ```
    pub async fn create_store(&self, store: Store) -> Result<Store, StoreError> {
        info!("Attempting to create a new store with name: {} and location: {}", store.name, store.location);
        let check_query = "SELECT 1 FROM public.store WHERE name = $1 AND location = $2 LIMIT 1";
        let existing_store: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(&store.name)
            .bind(&store.location)
            .fetch_optional(&self.pool)
            .await?;

        if existing_store.is_some() {
            info!("Store with name: {} and location: {} already exists", store.name, store.location);
            return Err(StoreError::DuplicateStore);
        }
        let query = "INSERT INTO public.store (name, location) VALUES ( $1, $2 ) RETURNING store_id, name, location";
        let store_out = sqlx::query_as::<_, Store>(query)
            .bind(store.name)
            .bind(store.location)
            .fetch_one(&self.pool)
            .await?;

        Ok(store_out)
    }

    /// Retrieves a store from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the store to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Store)` - On success, returns the `Store` with the specified `store_id`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StoreService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// let store_id = 1;
    /// let store = store_service.get_store(store_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_store(&self, id: i32) -> Result<Store, Error> {
        info!("Attempting to get store with ID: {}.", id);

        let query = "SELECT * FROM public.store WHERE store_id = $1";

        let store_found = sqlx::query_as::<_, Store>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(store_found)
    }

    /// Updates an existing store's details in the database.
    ///
    /// # Arguments
    ///
    /// * `store` - A `Store` instance containing the updated details. Must include the `store_id` of the store to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Store)` - On success, returns the updated `Store`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::store::Store;
    /// use crate::services::StoreService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// let updated_store = Store { name: "Updated Store".into(), location: "Updated Location".into(), store_id: 1 };
    /// let result = store_service.update_store(updated_store).await.unwrap();
    /// # };
    /// ```
    pub async fn update_store(&self, store: Store) -> Result<Option<Store>, Error> {
        info!("Attempting to update store with ID: {}.", store.store_id);

        let query = "UPDATE public.store SET name = $1, location = $2 WHERE store_id = $3 RETURNING store_id, name, location";

        let updated_store = sqlx::query_as::<_, Store>(query)
            .bind(store.name)
            .bind(store.location)
            .bind(store.store_id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(updated_store)
    }

    /// Retrieves all stores from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Store>)` - On success, returns a vector of `Store` instances representing all stores in the database.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StoreService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// let stores = store_service.get_all_stores().await.unwrap();
    /// for store in stores {
    ///     println!("Store: {} located at {}", store.name, store.location);
    /// }
    /// # };
    /// ```
    pub async fn get_all_stores(&self) -> Result<Vec<Store>, Error> {
        info!("Attempting to retrieve all stores.");

        let query = "SELECT * FROM public.store";

        let stores = sqlx::query_as::<_, Store>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(stores)
    }


    /// Deletes a store from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the store to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(usize)` - On success, returns the number of rows affected (should be 1 for a successful deletion).
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::StoreService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let store_service = StoreService::new(pool).await;
    /// let store_id = 1;
    /// let rows_affected = store_service.delete_store(store_id).await.unwrap();
    /// assert_eq!(rows_affected, 1);
    /// # };
    /// ```
    pub async fn delete_store(&self, id: i32) -> Result<usize, StoreError> {
        info!("Attempting to delete store with ID: {}.", id);

        // Check if the store exists
        let check_query = "SELECT 1 FROM public.store WHERE store_id = $1 LIMIT 1";
        let existing_store: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_store.is_none() {
            return Err(StoreError::NotFound);
        }

        // Proceed with deletion
        let query = "DELETE FROM public.store WHERE store_id = $1";

        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }
}
