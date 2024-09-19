use serde::{Deserialize, Serialize};
use sqlx::FromRow;

/// Represents a customer record in the database.
///
/// # Fields
/// - `customer_id`: Unique identifier for the customer.
/// - `name`: The name of the customer.
/// - `phone_no`: The phone number of the customer.
/// - `location`: The location of the customer.
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Customer {
    pub customer_id: i64,
    pub name: String,
    pub phone_no: String,
    pub location: String

}
/// Constructs a new `Customer` instance.
///
/// # Arguments
///
/// * `name` - The name of the customer.
/// * `phone_no` - The phone number of the customer.
/// * `location` - The location of the customer.
///
/// # Returns
///
/// A `Customer` instance with `customer_id` set to `0`. This ID is typically generated by the database upon insertion.
///
/// # Examples
///
/// ```rust
/// use crate::models::Customer;
///
/// let customer = build_customer(
///     "John Doe".to_string(),
///     "123-456-7890".to_string(),
///     "123 Elm Street".to_string(),
/// );
///
/// assert_eq!(customer.name, "John Doe");
/// assert_eq!(customer.phone_no, "123-456-7890");
/// assert_eq!(customer.location, "123 Elm Street");
/// ```
///
/// # Notes
/// - The `customer_id` field is initialized to `0` and should be updated with a value assigned by the database after insertion.
impl Customer {
    pub fn new(customer_id: i64, name: String, phone_no: String, location: String) -> Self {
        Self { customer_id, name, phone_no, location }
    }
}

