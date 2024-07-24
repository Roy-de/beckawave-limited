use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Sales {
    pub sales_id: i32,
    pub customer_id: i32,
    pub sales_pair_id: Option<i32>,
    pub sales_rep_id: Option<i32>,
    pub total_price: i32,
    pub product_id: i32,
    pub product_quantity: i32
}

pub fn build_sales(customer_id: i32, sales_pair_id: Option<i32>, sales_rep_id: Option<i32>, total_price: i32, product_id: i32, product_quantity: i32) -> Sales {
    Sales {
        sales_id: 0,
        customer_id,
        sales_pair_id,
        sales_rep_id,
        total_price,
        product_id,
        product_quantity
    }
}