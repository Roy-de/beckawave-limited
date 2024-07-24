use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use crate::models::Store;
use crate::services::StoreService;
use tracing::info;

#[get("/stores/get-all")]
pub async fn get_all_stores(pool: &State<PgPool>) -> Result<Json<Vec<Store>>, String> {
    let store_service = StoreService::new(pool.inner().clone());

    match store_service.await.get_all_stores().await{
        Ok(stores) => {
            info!("Successfully retrieved all stores");
            Ok(Json(stores))
        }
        Err(e) => {
            info!("Failed to retrieve stores: {:?}", e);
            Err("Failed to retrieve stores".into())
        }
    }
}