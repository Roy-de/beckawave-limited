use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Stock {
    pub stock_id: Uuid,
    pub store_id: Uuid,
    pub date: String,
    pub product: String,
    pub quantity: i32,
}
