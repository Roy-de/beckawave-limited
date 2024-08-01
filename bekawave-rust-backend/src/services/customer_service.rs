use sqlx::{Error, PgPool};
use crate::models::Customer;
use tracing::info;
use thiserror::Error;

/// A service for managing `Customer` entities in a PostgreSQL database.
pub struct CustomerService {
    pool: PgPool
}

#[derive(Error, Debug)]
pub enum CustomerError {
    #[error("Duplicate customer found")]
    DuplicateCustomer,
    #[error(transparent)]
    SqlxError(#[from] sqlx::Error),
    #[error("Customer not found")]
    NotFound,
}

impl CustomerService {
    /// Creates a new `CustomerService` instance.
    ///
    /// # Arguments
    ///
    /// * `pool` - A `PgPool` instance for interacting with the PostgreSQL database.
    ///
    /// # Returns
    ///
    /// A new `CustomerService` instance.
    ///
    /// # Examples
    ///
    /// ```
    /// use sqlx::PgPool;
    /// use crate::services::CustomerService;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// # };
    /// ```
    pub async fn new(pool: PgPool) -> Self {
        CustomerService { pool }
    }

    /// Creates a new customer in the database.
    ///
    /// # Arguments
    ///
    /// * `customer` - A `Customer` instance containing the customer's details.
    ///
    /// # Returns
    ///
    /// * `Ok(Customer)` - On success, returns the created `Customer` with the generated `customer_id`.
    /// * `Err(CustomerError)` - On failure, returns a `CustomerError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Customer;
    /// use crate::services::CustomerService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// let new_customer = Customer { name: "John Doe".into(), phone_no: "1234567890".into(), location: "Some Location".into(), customer_id: 0 };
    /// let created_customer = customer_service.create_customer(new_customer).await.unwrap();
    /// # };
    /// ```
    pub async fn create_customer(&self, customer: Customer) -> Result<Customer, CustomerError> {
        info!("Attempting to create a new customer with name: {}", customer.name);

        // Check if a customer with the same phone number already exists
        let check_query = "SELECT 1 FROM public.customer WHERE phone_no = $1 LIMIT 1";
        let existing_customer: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(&customer.phone_no)
            .fetch_optional(&self.pool)
            .await?;

        if existing_customer.is_some() {
            info!("Customer with phone number: {} already exists", customer.phone_no);
            return Err(CustomerError::DuplicateCustomer);
        }

        // Insert the new customer into the database
        let query = "INSERT INTO public.customer (name, phone_no, location) VALUES ($1, $2, $3) RETURNING customer_id, name, phone_no, location";
        let customer_out = sqlx::query_as::<_, Customer>(query)
            .bind(customer.name)
            .bind(customer.phone_no)
            .bind(customer.location)
            .fetch_one(&self.pool)
            .await?;

        Ok(customer_out)
    }

    /// Retrieves a customer from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the customer to retrieve.
    ///
    /// # Returns
    ///
    /// * `Ok(Customer)` - On success, returns the `Customer` with the specified `customer_id`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::CustomerService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// let customer_id = 1;
    /// let customer = customer_service.get_customer(customer_id).await.unwrap();
    /// # };
    /// ```
    pub async fn get_customer(&self, id: i32) -> Result<Customer, CustomerError> {
        info!("Attempting to get customer with ID: {}.", id);

        let query = "SELECT * FROM public.customer WHERE customer_id = $1";

        let customer_found = sqlx::query_as::<_, Customer>(query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        Ok(customer_found)
    }

    /// Updates an existing customer's details in the database.
    ///
    /// # Arguments
    ///
    /// * `customer` - A `Customer` instance containing the updated details. Must include the `customer_id` of the customer to update.
    ///
    /// # Returns
    ///
    /// * `Ok(Customer)` - On success, returns the updated `Customer`.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::models::Customer;
    /// use crate::services::CustomerService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// let updated_customer = Customer { name: "Jane Doe".into(), phone_no: "0987654321".into(), location: "Another Location".into(), customer_id: 1 };
    /// let result = customer_service.update_customer(updated_customer).await.unwrap();
    /// # };
    /// ```
    pub async fn update_customer(&self, customer: Customer) -> Result<Customer, CustomerError> {
        info!("Attempting to update customer with ID: {}.", customer.customer_id);

        let query = "UPDATE public.customer SET name = $1, phone_no = $2, location = $3 WHERE customer_id = $4 RETURNING customer_id, name, phone_no, location";

        let updated_customer = sqlx::query_as::<_, Customer>(query)
            .bind(customer.name)
            .bind(customer.phone_no)
            .bind(customer.location)
            .bind(customer.customer_id)
            .fetch_one(&self.pool)
            .await?;

        Ok(updated_customer)
    }

    /// Retrieves all customers from the database.
    ///
    /// # Returns
    ///
    /// * `Ok(Vec<Customer>)` - On success, returns a vector of `Customer` instances representing all customers in the database.
    /// * `Err(Error)` - On failure, returns an `sqlx::Error` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::CustomerService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// let customers = customer_service.get_all_customers().await.unwrap();
    /// for customer in customers {
    ///     println!("Customer: {} with phone number {}", customer.name, customer.phone_no);
    /// }
    /// # };
    /// ```
    pub async fn get_all_customers(&self) -> Result<Vec<Customer>, Error> {
        info!("Attempting to retrieve all customers.");

        let query = "SELECT * FROM public.customer";

        let customers = sqlx::query_as::<_, Customer>(query)
            .fetch_all(&self.pool)
            .await?;

        Ok(customers)
    }

    /// Deletes a customer from the database by its ID.
    ///
    /// # Arguments
    ///
    /// * `id` - The ID of the customer to delete.
    ///
    /// # Returns
    ///
    /// * `Ok(usize)` - On success, returns the number of rows affected (should be 1 for a successful deletion).
    /// * `Err(CustomerError)` - On failure, returns a `CustomerError` detailing the failure.
    ///
    /// # Examples
    ///
    /// ```
    /// use crate::services::CustomerService;
    /// use sqlx::PgPool;
    /// use anyhow::Result;
    ///
    /// # async {
    /// let pool = PgPool::connect("postgres://user:password@localhost/db").await.unwrap();
    /// let customer_service = CustomerService::new(pool).await;
    /// let customer_id = 1;
    /// let rows_affected = customer_service.delete_customer(customer_id).await.unwrap();
    /// assert_eq!(rows_affected, 1);
    /// # };
    /// ```
    pub async fn delete_customer(&self, id: i32) -> Result<usize, CustomerError> {
        info!("Attempting to delete customer with ID: {}.", id);

        // Check if the customer exists
        let check_query = "SELECT 1 FROM public.customer WHERE customer_id = $1 LIMIT 1";
        let existing_customer: Option<(i32,)> = sqlx::query_as(check_query)
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if existing_customer.is_none() {
            return Err(CustomerError::NotFound);
        }

        // Proceed with deletion
        let query = "DELETE FROM public.customer WHERE customer_id = $1";

        let rows_affected = sqlx::query(query)
            .bind(id)
            .execute(&self.pool)
            .await?
            .rows_affected();

        Ok(rows_affected as usize)
    }
}
