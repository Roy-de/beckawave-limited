#[macro_use]
extern crate rocket;
use rocket::routes;
use sqlx::{Executor, PgPool};

use crate::controllers::*;

mod models;
mod services;
mod controllers;

#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] pool: PgPool) -> shuttle_rocket::ShuttleRocket {
    let store_service = store_service_init(&pool).await;
    pool.execute(include_str!("../migrations/01_migration_schema.sql"))
        .await
        .expect("Unable to connect and execute the query :( ");

    let rocket = rocket::build()
        .manage(pool)
        .manage(store_service)
        .mount("/", routes![get_all_stores, delete_store, create_store, update_store, get_store_by_id]);

    Ok(rocket.into())
}
