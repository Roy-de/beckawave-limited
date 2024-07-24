use sqlx::{Error, PgPool};
use crate::models::Stock;
use tracing::info;
pub struct StockService {
    pool: PgPool
}

impl StockService {
    pub async fn new(pool: PgPool) -> Self {
        StockService { pool }
    }

    pub async fn create_stock(&self, stock:Stock) -> Result<Stock, Error> {
        info!("Inserting this values Store_id: {}, Amount: {}, Product_id: {}, Quantity: {}, Product_Worth: {}",stock.store_id, stock.amount, stock.product_id, stock.quantity, stock.product_worth);
        let query = "INSERT INTO public.stock_record(store_id, amount, product_id, quantity, product_worth) \
        VALUES ($1, $2, $3, $4, $5) \
        RETURNING stock_id, store_id, amount, product_id, quantity, product_worth";

        let record = sqlx::query_as::<_, Stock>(query)
            .bind(stock.store_id)
            .bind(stock.amount)
            .bind(stock.product_id)
            .bind(stock.quantity)
            .bind(stock.product_worth)
            .fetch_one(&self.pool)
            .await?;

        Ok(record)
    }
}