use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Product{
    pub product_id:i32,
    name: String,
    price: i32
}

pub fn build_product( name: String, price: i32) -> Product{
    Product {
        product_id: 0,
        name,
        price
    }
}