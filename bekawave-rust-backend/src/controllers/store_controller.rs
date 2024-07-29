use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::{PgPool};
use crate::models::{ErrorResponse, Store};
use crate::services::{StoreError, StoreService};
use tracing::info;


pub async fn store_service_init(pool: &PgPool) -> StoreService {
        StoreService::new(pool.clone()).await
}
#[get("/stores/get-all")]
pub async fn get_all_stores(store_service: &State<StoreService>) -> Result<Json<Vec<Store>>, (Status, Json<ErrorResponse>)> {
    match store_service.get_all_stores().await {
        Ok(stores) => {
            if stores.is_empty() {
                info!("No stores found.");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No stores found".to_string()
                })))
            } else {
                info!("Retrieved all stores successfully.");
                Ok(Json(stores))
            }
        }
        Err(e) => {
            info!("Error retrieving stores: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve stores".to_string()
            })))
        }
    }
}
#[get("/stores/get_store_by_id/<store_id>")]
pub async fn get_store_by_id(store_service: &State<StoreService>, store_id: i32) -> Result<Json<Store>, (Status, Json<ErrorResponse>)> {
    match store_service.get_store(store_id).await {
        Ok(store) => {
            info!("Successfully retrieved a stores");
            Ok(Json(store))
        }
        Err(e) => {
            info!("Failed to get store with ID {}: {:?}", store_id, e);
            Err((Status::NotFound, Json(ErrorResponse { message: "Store not found".to_string() })))
        }
    }
}
#[post("/stores/create", data = "<store>")]
pub async fn create_store(store_service: &State<StoreService>, store: Json<Store>) -> Result<Created<Json<Store>>, (Status, Json<ErrorResponse>)> {
    match store_service.create_store(store.into_inner()).await {
        Ok(created_store) => {
            info!("Created store successfully");
            Ok(Created::new("/stores/get-all").body(Json(created_store)))
        }

        Err(e) if e.to_string().contains("duplicate key value") => {
            info!("Store creation failed: duplicate key");
            Err((Status::Conflict, Json(ErrorResponse { message: "There exist such a store in that location".to_string() })))
        }
        Err(e) if e.to_string().contains("Duplicate store found") => {
            info!("Failed to create store: {:?}", e);
            Err((Status::Conflict, Json(ErrorResponse { message: "There exist such a store in that location".to_string() })))
        }
        Err(e) => {
            info!("Failed to create store: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "An error has occurred".to_string() })))
        }
    }
}
#[put("/stores/update", data = "<store>")]
pub async fn update_store(store_service: &State<StoreService>, store: Json<Store>) -> Result<Json<Store>, (Status, Json<ErrorResponse>)> {
    match store_service.update_store(store.into_inner()).await {
        Ok(Some(updated_store)) => {
            info!("Successfully updated store info");
            Ok(Json(updated_store))
        },
        Ok(None) => Err((Status::NotFound, Json(ErrorResponse {message: "Store not found".to_string()}))),
        Err(e) => {
            info!("Failed to update store: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {message: "Failed to update store".to_string()})))
        }
    }
}
#[delete("/stores/delete/<store_id>")]
pub async fn delete_store(store_service: &State<StoreService>, store_id: i32) -> Result<Json<usize>, (Status, Json<ErrorResponse>)> {
    match store_service.delete_store(store_id).await {
        Ok(deleted_store) => {
            if deleted_store > 0 {
                info!("Deleted store");
                Ok(Json(deleted_store))
            } else {
                info!("No such store found");
                Err((Status::NotFound, Json(ErrorResponse { message: "No such store found".to_string() })))
            }
        }
        Err(StoreError::NotFound) => {
            info!("No such store found");
            Err((Status::NotFound, Json(ErrorResponse { message: "No such store found".to_string() })))
        }
        Err(e) => {
            info!("Error deleting store with id: {:?}: {:?}", store_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Error deleting store".to_string() })))
        }
    }
}