use chrono::NaiveDateTime;
use rocket::serde::{Serialize, Deserialize};
use sqlx::FromRow;

/// Represents a pair of sales representatives and the date they were paired.
///
/// # Fields
/// - `sales_pair_id`: Unique identifier for the sales pair. This ID is typically assigned by the database upon insertion.
/// - `sales_rep_id_one`: The ID of the first sales representative in the pair.
/// - `sales_rep_id_two`: The ID of the second sales representative in the pair.
/// - `paired_date`: The date and time when the sales pair was created or established.
///
/// # Examples
///
/// ```rust
/// use crate::models::SalesPair;
/// use chrono::NaiveDateTime;
///
/// let paired_date = NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap();
///
/// let sales_pair = SalesPair {
///     sales_pair_id: 1,
///     sales_rep_id_one: 101,
///     sales_rep_id_two: 102,
///     paired_date,
/// };
///
/// assert_eq!(sales_pair.sales_rep_id_one, 101);
/// assert_eq!(sales_pair.paired_date, paired_date);
/// ```
///
/// # Notes
/// - The `sales_pair_id` field is initialized to `0` in the `build_sales_rep_pair` function and should be updated with a value assigned by the database after insertion.
#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SalesPair {
    pub sales_pair_id: i64,
    pub sales_rep_id_one: i32,
    pub sales_rep_id_two: i32,
    pub paired_date: NaiveDateTime,
}

/// Constructs a new `SalesPair` instance.
///
/// # Arguments
///
/// * `sales_rep_id_one` - The ID of the first sales representative in the pair.
/// * `sales_rep_id_two` - The ID of the second sales representative in the pair.
/// * `paired_date` - The date and time when the sales pair was created or established.
///
/// # Returns
///
/// A `SalesPair` instance with `sales_pair_id` set to `0`. This ID is typically generated by the database upon insertion.
///
/// # Examples
///
/// ```rust
/// use crate::models::SalesPair;
/// use chrono::NaiveDateTime;
///
/// let paired_date = NaiveDateTime::parse_from_str("2024-08-01 12:00:00", "%Y-%m-%d %H:%M:%S").unwrap();
///
/// let sales_pair = build_sales_rep_pair(101, 102, paired_date);
///
/// assert_eq!(sales_pair.sales_rep_id_one, 101);
/// assert_eq!(sales_pair.paired_date, paired_date);
/// ```
///
/// # Notes
/// - The `sales_pair_id` field is initialized to `0` and should be updated with a value assigned by the database after insertion.
pub fn build_sales_rep_pair(sales_rep_id_one: i32, sales_rep_id_two: i32, paired_date: NaiveDateTime) -> SalesPair {
    SalesPair {
        sales_pair_id: 0,
        sales_rep_id_one,
        sales_rep_id_two,
        paired_date,
    }
}
