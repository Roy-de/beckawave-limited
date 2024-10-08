use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

/// Represents a sales transaction in the database.
///
/// # Fields
/// - `sales_id`: Unique identifier for the sales transaction. This ID is typically assigned by the database upon insertion.
/// - `customer_id`: The ID of the customer who made the purchase.
/// - `sales_pair_id`: Optional ID representing a pair of sales representatives involved in the transaction. Can be `None` if not applicable.
/// - `sales_rep_id`: Optional ID of the sales representative who handled the transaction. Can be `None` if not applicable.
/// - `total_price`: The total price of the sales transaction in cents.
/// - `sales_time`: The date and time when the sales transaction occurred.
/// - `product_id`: The ID of the product sold in this transaction.
/// - `product_quantity`: The quantity of the product sold.
///
/// # Examples
///
/// ```rust
/// use crate::models::Sales;
/// use chrono::NaiveDateTime;
///
/// let sales_time = NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap();
///
/// let sales = Sales {
///     sales_id: 1,
///     customer_id: 123,
///     sales_pair_id: Some(456),
///     sales_rep_id: Some(789),
///     total_price: 29999,
///     sales_time,
///     product_id: 1001,
///     product_quantity: 3,
/// };
///
/// assert_eq!(sales.customer_id, 123);
/// assert_eq!(sales.total_price, 29999);
/// ```
///
/// # Notes
/// - The `sales_id` field is initialized to `0` in the `build_sales` function and should be updated with a value assigned by the database after insertion.
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Sales {
    pub sales_id: i64,
    pub customer_id: i32,
    pub sales_pair_id: Option<i32>,
    pub sales_rep_id: Option<i32>,
    pub total_price: i32,
    pub sales_time: NaiveDateTime,
    pub product_id: i32,
    pub product_quantity: i32,
}

/// Constructs a new `Sales` instance.
///
/// # Arguments
///
/// * `customer_id` - The ID of the customer making the purchase.
/// * `sales_pair_id` - Optional ID of a pair of sales representatives involved in the transaction.
/// * `sales_rep_id` - Optional ID of the sales representative who handled the transaction.
/// * `total_price` - The total price of the sales transaction in cents.
/// * `sales_time` - The date and time when the sales transaction occurred.
/// * `product_id` - The ID of the product sold in this transaction.
/// * `product_quantity` - The quantity of the product sold.
///
/// # Returns
///
/// A `Sales` instance with `sales_id` set to `0`. This ID is typically generated by the database upon insertion.
///
/// # Examples
///
/// ```rust
/// use crate::models::Sales;
/// use chrono::NaiveDateTime;
///
/// let sales_time = NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap();
///
/// let sales = build_sales(
///     123,
///     Some(456),
///     Some(789),
///     29999,
///     sales_time,
///     1001,
///     3
/// );
///
/// assert_eq!(sales.customer_id, 123);
/// assert_eq!(sales.total_price, 29999);
/// ```
///
/// # Notes
/// - The `sales_id` field is initialized to `0` and should be updated with a value assigned by the database after insertion.
pub fn build_sales(customer_id: i32, sales_pair_id: Option<i32>, sales_rep_id: Option<i32>, total_price: i32, sales_time: NaiveDateTime, product_id: i32, product_quantity: i32) -> Sales {
    Sales {
        sales_id: 0,
        customer_id,
        sales_pair_id,
        sales_rep_id,
        total_price,
        sales_time,
        product_id,
        product_quantity,
    }
}