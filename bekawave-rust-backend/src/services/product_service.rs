use sqlx::{Error, PgPool};
use crate::models::Product;
use tracing::info;
use thiserror::Error;

/// A service for managing `Product` entities in a PostgreSQL database.
pub struct ProductService {
    pool: PgPool
}

#[derive(Error, Debug)]
pub enum ProductError {
    #[error("Duplicate product found")]
    DuplicateProduct,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Product not found")]
    NotFound,
}

impl ProductService {
    /// Creates a new `ProductService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `ProductService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::ProductService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        ProductService { pool }
    }

    /// Creates a new product in the database.
    ///
    /// # Arguments
    ///
    /// * `product` - A `Product` instance containing the product's details.
    ///
    /// # Returns
    ///
    /// * `Ok(Product)` - On success, returns the created `Product` with the generated `product_id`.
    /// * `Err(ProductError)` - On failure, returns a `ProductError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Product;
    /// use crate::services::ProductService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// let new_product = Product { name: "New Product".into(), price: 10.0, product_id: 0 };
    /// let created_product = product_service.create_product(new_product).await.unwrap();
    /// # };
    /// ```
    pub async fn create_product(&self, product: Product) -> Result<Product, ProductError> {
        info!("Attempting to create a new product with name: {}", &product.name);
        let check_query = "SELECT 1 FROM public.product WHERE name = $1 AND price = $2 LIMIT 1";
        let existing_product: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(&product.name)
            .bind(&product.price)
            .fetch_optional(&self.pool)
            .await?;

        if existing_product.is_some() {
            info!("Product with name: {} and price: {} already exists", product.name, product.price);
            return Err(ProductError::DuplicateProduct);
        }

        let query = "INSERT INTO public.product (name, price) VALUES ( $1, $2 ) RETURNING product_id, name, price";
        let product_out = sqlx::query_as(query)
            .bind(product.name)
            .bind(product.price)
            .fetch_one(&self.pool)
            .await?;

        Ok(product_out)
    }

    /// Retrieves a product from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the product to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Product)` - On success, returns the `Product` with the specified `product_id`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::ProductService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// let product_id = 1;
    /// let product = product_service.get_product(product_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_product(&self, id: i32) -> Result<Product, ProductError> {
        info!("Attempting to get product with ID: {}.", id);

        let query = "SELECT * FROM public.product WHERE product_id = $1";

        let product_found = sqlx::query_as::<_, Product>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(product_found)
    }

    /// Updates an existing product's details in the database.
    ///
    /// # Arguments
    ///
    /// * `product` - A `Product` instance containing the updated details. Must include the `product_id` of the product to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Product)` - On success, returns the updated `Product`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Product;
    /// use crate::services::ProductService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// let updated_product = Product { name: "Updated Product".into(), price: 20.0, product_id: 1 };
    /// let result = product_service.update_product(updated_product).await.unwrap();
    /// # };
    /// ```
    pub async fn update_product(&self, product: Product) -> Result<Product, Error> {
        info!("Attempting to update product with ID: {}.", product.product_id);

        let query = "UPDATE public.product SET name = $1, price = $2 WHERE product_id = $3 RETURNING product_id, name, price";

        let updated_product = sqlx::query_as::<_, Product>(query)
            .bind(product.name)
            .bind(product.price)
            .bind(product.product_id)
            .fetch_one(&self.pool)
            .await?;

        Ok(updated_product)
    }

    /// Retrieves all products from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Product>)` - On success, returns a vector of `Product` instances representing all products in the database.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::ProductService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// let products = product_service.get_all_products().await.unwrap();
    /// for product in products {
    ///     println!("Product: {} priced at {}", product.name, product.price);
    /// }
    /// # };
    /// ```
    pub async fn get_all_products(&self) -> Result<Vec<Product>, Error> {
        info!("Attempting to retrieve all products.");

        let query = "SELECT * FROM public.product";

        let products = sqlx::query_as::<_, Product>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(products)
    }

    /// Deletes a product from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the product to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(usize)` - On success, returns the number of rows affected (should be 1 for a successful deletion).
    /// * `Err(ProductError)` - On failure, returns a `ProductError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::ProductService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let product_service = ProductService::new(pool).await;
    /// let product_id = 1;
    /// let rows_affected = product_service.delete_product(product_id).await.unwrap();
    /// assert_eq!(rows_affected, 1);
    /// # };
    /// ```
    pub async fn delete_product(&self, id: i32) -> Result<usize, ProductError> {
        info!("Attempting to delete product with ID: {}.", id);

        // Check if the product exists
        let check_query = "SELECT 1 FROM public.product WHERE product_id = $1 LIMIT 1";
        let existing_product: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_product.is_none() {
            return Err(ProductError::NotFound);
        }

        // Proceed with deletion
        let query = "DELETE FROM public.product WHERE product_id = $1";

        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }
}
