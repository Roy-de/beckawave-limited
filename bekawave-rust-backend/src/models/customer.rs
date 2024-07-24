use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize,FromRow)]
pub struct Customer {
    pub customer_id: i32,
    pub name: String,
    pub phone_no: String,
    pub location: String
}

pub fn build_customer(name: String, phone_no: String, location: String) -> Customer {
    Customer {
        customer_id: 0,
        name,
        phone_no,
        location
    }
}