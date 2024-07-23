mod models;
mod services;
mod schemas;

#[macro_use]
extern crate rocket;
use rocket::{routes};
use sqlx::{Executor, PgPool};

#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] pool: PgPool) -> shuttle_rocket::ShuttleRocket {

    pool.execute(include_str!("../migrations/01_migration_schema.sql"))
        .await
        .expect("Unable to connect and execute the query :( ");

    let rocket = rocket::build()
        .mount("/", routes![]);

    Ok(rocket.into())
}
