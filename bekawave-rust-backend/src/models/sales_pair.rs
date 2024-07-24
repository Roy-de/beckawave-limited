use rocket::serde::Serialize;
use rocket::serde::Deserialize;
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct SalesPair {
    pub sales_pair_id: i32,
    pub sales_rep_id_one: i32,
    pub sales_rep_id_two: i32
}

pub fn build_sales_rep_pair(sales_pair_id_one: i32, sales_pair_id_two: i32) -> SalesPair{
    SalesPair {
        sales_pair_id: 0,
        sales_rep_id_one: sales_pair_id_one,
        sales_rep_id_two: sales_pair_id_two
    }
}