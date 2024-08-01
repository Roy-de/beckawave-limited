#[macro_use]
extern crate rocket;
use sqlx::{Executor, PgPool};
use crate::controllers::*;

mod models;
mod services;
mod controllers;

#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] pool: PgPool) -> shuttle_rocket::ShuttleRocket {
    let customer_service = customer_service_init(&pool).await;
    let debt_service = debt_service_init(&pool).await;
    let product_service = product_service_init(&pool).await;
    let sales_service = sales_service_init(&pool).await;
    let sales_pair_service = sales_pair_service_init(&pool).await;
    let stock_service = stock_service_init(&pool).await;
    let store_service = store_service_init(&pool).await;
    let sales_rep_service = sales_rep_init(&pool).await;

    pool.execute(include_str!("../migrations/01_migration_schema.sql"))
        .await
        .expect("Unable to connect and execute the query :( ");

    let rocket = rocket::build()
        .manage(pool)
        .manage(store_service)
        .manage(sales_rep_service)
        .manage(stock_service)
        .manage(sales_pair_service)
        .manage(sales_service)
        .manage(product_service)
        .manage(debt_service)
        .manage(customer_service)
        .mount("/", routes![
            delete_customer, delete_store, delete_debt, delete_sales_rep, delete_sales, delete_product, delete_sales_pair, delete_stock,
            get_all_customers, get_all_stores, get_all_debts, get_all_sales_reps, get_all_sales, get_all_products, get_all_sales_pairs, get_all_stocks,
            get_customer, get_store, get_debt, get_sales_rep, get_sales, get_product, get_sales_pair, get_stock,
            update_customer, update_store, update_debt, update_sales_rep, update_sales, update_product, update_sales_pair, update_stock,
            create_customer, create_store, create_debt, create_sales_rep, create_sales, create_product, create_sales_pair, create_stock,
        ]);

    Ok(rocket.into())
}
