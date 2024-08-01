use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use crate::models::{ErrorResponse, Sales};
use crate::services::{SalesService, SalesError};
use tracing::info;

pub async fn sales_service_init(pool: &PgPool) -> SalesService {
    SalesService::new(pool.clone()).await
}

#[get("/sales/get-all")]
pub async fn get_all_sales(sales_service: &State<SalesService>) -> Result<Json<Vec<Sales>>, (Status, Json<ErrorResponse>)> {
    match sales_service.get_all_sales().await {
        Ok(sales) => {
            if sales.is_empty() {
                info!("No sales records found.");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No sales records found".to_string(),
                })))
            } else {
                info!("Retrieved all sales records successfully.");
                Ok(Json(sales))
            }
        }
        Err(e) => {
            info!("Error retrieving sales records: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve sales records".to_string(),
            })))
        }
    }
}

#[get("/sales/get_sales_by_id/<sales_id>")]
pub async fn get_sales(sales_service: &State<SalesService>, sales_id: i32) -> Result<Json<Sales>, (Status, Json<ErrorResponse>)> {
    match sales_service.get_sales(sales_id).await {
        Ok(sales) => {
            info!("Successfully retrieved sales record with ID: {}", sales_id);
            Ok(Json(sales))
        }
        Err(SalesError::NotFound) => {
            info!("Sales record with ID {} not found.", sales_id);
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Sales record not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error retrieving sales record with ID {}: {:?}", sales_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve sales record".to_string(),
            })))
        }
    }
}

#[post("/sales/create", data = "<sales>")]
pub async fn create_sales(sales_service: &State<SalesService>, sales: Json<Sales>) -> Result<Created<Json<Sales>>, (Status, Json<ErrorResponse>)> {
    match sales_service.create_sales(sales.into_inner()).await {
        Ok(created_sales) => {
            info!("Created sales record successfully with ID: {}", created_sales.sales_id);
            Ok(Created::new("/sales/get-all").body(Json(created_sales)))
        }
        Err(e) => {
            info!("Failed to create sales record: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to create sales record".to_string(),
            })))
        }
    }
}

#[put("/sales/update", data = "<sales>")]
pub async fn update_sales(sales_service: &State<SalesService>, sales: Json<Sales>) -> Result<Json<Sales>, (Status, Json<ErrorResponse>)> {
    match sales_service.update_sales(sales.into_inner()).await {
        Ok(Some(updated_sales)) => {
            info!("Successfully updated sales record with ID: {}", updated_sales.sales_id);
            Ok(Json(updated_sales))
        }
        Ok(None) => {
            info!("Sales record not found for update.");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Sales record not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Failed to update sales record with Error {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to update sales record".to_string(),
            })))
        }
    }
}

#[delete("/sales/delete/<sales_id>")]
pub async fn delete_sales(sales_service: &State<SalesService>, sales_id: i32) -> Result<Json<bool>, (Status, Json<ErrorResponse>)> {
    match sales_service.delete_sales(sales_id).await {
        Ok(was_deleted) => {
            if was_deleted {
                info!("Successfully deleted sales record with ID: {}", sales_id);
                Ok(Json(true))
            } else {
                info!("No sales record found with ID: {} for deletion.", sales_id);
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "Sales record not found".to_string(),
                })))
            }
        }
        Err(e) => {
            info!("Error deleting sales record with ID {}: {:?}", sales_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to delete sales record".to_string(),
            })))
        }
    }
}
