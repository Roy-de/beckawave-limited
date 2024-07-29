use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SalesRep {
    pub sales_rep_id: i64,
    pub name: String,
    pub phone_no: String
}

pub fn build_sales_rep(name: String, phone_no: String) -> SalesRep{
    SalesRep {
        sales_rep_id: 0,
        name,
        phone_no
    }
}