use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Debt{
    pub debt_id: i32,
    pub customer_id: i32,
    pub amount: i32,
    pub date: NaiveDate,
    pub paid_date: Option<NaiveDate>,
    pub is_paid: bool
}

pub fn build_debt(customer_id: i32, amount: i32, date: NaiveDate, paid_date: Option<NaiveDate>, is_paid: bool) -> Debt {
    Debt {
        debt_id: 0,
        customer_id,
        amount,
        date,
        paid_date,
        is_paid
    }
}