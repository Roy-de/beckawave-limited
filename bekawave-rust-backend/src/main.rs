mod models;
mod service;

#[macro_use]
extern crate rocket;
use rocket::{routes};

#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] _conn_str: String ) -> shuttle_rocket::ShuttleRocket {

    let rocket = rocket::build()
        .mount("/", routes![]);

    Ok(rocket.into())
}
