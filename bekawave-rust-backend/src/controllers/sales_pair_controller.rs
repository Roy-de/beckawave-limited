use rocket::http::Status;
use rocket::response::status::{Created, NoContent};
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use crate::models::{SalesPair, ErrorResponse};
use crate::services::{SalesPairService, SalesPairError};
use tracing::info;

pub async fn sales_pair_service_init(pool: &PgPool) -> SalesPairService {
    SalesPairService::new(pool.clone()).await
}

#[get("/sales_pairs/get-all")]
pub async fn get_all_sales_pairs(sales_pair_service: &State<SalesPairService>) -> Result<Json<Vec<SalesPair>>, (Status, Json<ErrorResponse>)> {
    match sales_pair_service.get_all_sales_pairs().await {
        Ok(sales_pairs) => {
            if sales_pairs.is_empty() {
                info!("No sales pairs found.");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No sales pairs found".to_string()
                })))
            } else {
                info!("Retrieved all sales pairs successfully.");
                Ok(Json(sales_pairs))
            }
        }
        Err(e) => {
            info!("Error retrieving sales pairs: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve sales pairs".to_string()
            })))
        }
    }
}

#[get("/sales_pairs/get_by_id/<sales_pair_id>")]
pub async fn get_sales_pair(sales_pair_service: &State<SalesPairService>, sales_pair_id: i32) -> Result<Json<SalesPair>, (Status, Json<ErrorResponse>)> {
    match sales_pair_service.get_sales_pair(sales_pair_id).await {
        Ok(sales_pair) => {
            info!("Successfully retrieved sales pair with ID {}", sales_pair_id);
            Ok(Json(sales_pair))
        }
        Err(e) => {
            info!("Failed to get sales pair with ID {}: {:?}", sales_pair_id, e);
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales pair not found".to_string() })))
        }
    }
}

#[post("/sales_pairs/create", data = "<sales_pair>")]
pub async fn create_sales_pair(sales_pair_service: &State<SalesPairService>, sales_pair: Json<SalesPair>) -> Result<Created<Json<SalesPair>>, (Status, Json<ErrorResponse>)> {
    match sales_pair_service.create_sales_pair(sales_pair.into_inner()).await {
        Ok(created_sales_pair) => {
            info!("Created sales pair successfully");
            Ok(Created::new("/sales_pairs/get-all").body(Json(created_sales_pair)))
        }
        Err(SalesPairError::DuplicateSalesPair) => {
            info!("Sales pair creation failed: duplicate key");
            Err((Status::Conflict, Json(ErrorResponse { message: "Sales pair already exists".to_string() })))
        }
        Err(e) => {
            info!("Failed to create sales pair: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "An error occurred".to_string() })))
        }
    }
}

#[put("/sales_pairs/update", data = "<sales_pair>")]
pub async fn update_sales_pair(sales_pair_service: &State<SalesPairService>, sales_pair: Json<SalesPair>) -> Result<Json<SalesPair>, (Status, Json<ErrorResponse>)> {
    match sales_pair_service.update_sales_pair(sales_pair.into_inner()).await {
        Ok(updated_sales_pair) => {
            info!("Successfully updated sales pair with ID {}", updated_sales_pair.sales_pair_id);
            Ok(Json(updated_sales_pair))
        }
        Err(SalesPairError::NotFound) => {
            info!("Sales pair not found");
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales pair not found".to_string() })))
        }
        Err(e) => {
            info!("Failed to update sales pair: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to update sales pair".to_string() })))
        }
    }
}

#[delete("/sales_pairs/delete/<sales_pair_id>")]
pub async fn delete_sales_pair(sales_pair_service: &State<SalesPairService>, sales_pair_id: i32, ) -> Result<NoContent, (Status, Json<ErrorResponse>)> {
    match sales_pair_service.delete_sales_pair(sales_pair_id).await {
        Ok(rows_affected) if rows_affected > 0 => {
            info!("Deleted sales pair with ID {}", sales_pair_id);
            Ok(NoContent)
        }
        Ok(_) => {
            info!("No sales pair found with ID {}", sales_pair_id);
            Err((Status::NotFound, Json(ErrorResponse { message: "No such sales pair found".to_string() })))
        }
        Err(SalesPairError::NotFound) => {
            // This should ideally not occur because we handle it earlier
            info!("Sales pair with ID {} not found", sales_pair_id);
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales pair not found".to_string() })))
        }
        Err(e) => {
            info!("Error deleting sales pair with ID {}: {:?}", sales_pair_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Error deleting sales pair".to_string() })))
        }
    }
}
