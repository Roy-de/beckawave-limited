use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Stock {
    pub stock_id: i32,
    pub store_id: i32,
    pub amount: i32,
    pub product_id: i32,
    pub quantity: i32,
    pub product_worth: i32,
}


pub fn build_stock(store_id: i32, amount: i32, product_id: i32, quantity: i32, product_worth: i32) -> Stock{
    Stock{
        stock_id: 0,
        store_id,
        amount,
        product_id,
        quantity,
        product_worth
    }
}