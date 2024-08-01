use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use crate::models::{ErrorResponse, Stock};
use crate::services::{StockService, StockError};
use tracing::info;

/// Initialize the StockService with the database pool.
pub async fn stock_service_init(pool: &PgPool) -> StockService {
    StockService::new(pool.clone()).await
}

#[get("/stocks/get-all")]
pub async fn get_all_stocks(stock_service: &State<StockService>) -> Result<Json<Vec<Stock>>, (Status, Json<ErrorResponse>)> {
    match stock_service.get_all_stocks().await {
        Ok(stocks) => {
            if stocks.is_empty() {
                info!("No stocks found.");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No stocks found".to_string()
                })))
            } else {
                info!("Retrieved all stocks successfully.");
                Ok(Json(stocks))
            }
        }
        Err(e) => {
            info!("Error retrieving stocks: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve stocks".to_string()
            })))
        }
    }
}

#[get("/stocks/get_stock_by_id/<stock_id>")]
pub async fn get_stock(stock_service: &State<StockService>, stock_id: i32) -> Result<Json<Stock>, (Status, Json<ErrorResponse>)> {
    match stock_service.get_stock(stock_id).await {
        Ok(stock) => {
            info!("Successfully retrieved stock with ID: {}", stock_id);
            Ok(Json(stock))
        }
        Err(e) => {
            info!("Failed to get stock with ID {}: {:?}", stock_id, e);
            Err((Status::NotFound, Json(ErrorResponse { message: "Stock not found".to_string() })))
        }
    }
}

#[post("/stocks/create", data = "<stock>")]
pub async fn create_stock(stock_service: &State<StockService>, stock: Json<Stock>) -> Result<Created<Json<Stock>>, (Status, Json<ErrorResponse>)> {
    match stock_service.create_stock(stock.into_inner()).await {
        Ok(created_stock) => {
            info!("Created stock successfully");
            Ok(Created::new("/stocks/get-all").body(Json(created_stock)))
        }
        Err(e) if e.to_string().contains("duplicate key value") || e.to_string().contains("Duplicate stock") => {
            info!("Stock creation failed: duplicate key");
            Err((Status::Conflict, Json(ErrorResponse { message: "Duplicate stock entry".to_string() })))
        }
        Err(e) => {
            info!("Failed to create stock: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "An error has occurred".to_string() })))
        }
    }
}

#[put("/stocks/update", data = "<stock>")]
pub async fn update_stock(stock_service: &State<StockService>, stock: Json<Stock>) -> Result<Json<Stock>, (Status, Json<ErrorResponse>)> {
    match stock_service.update_stock(stock.into_inner()).await {
        Ok(Some(updated_stock)) => {
            info!("Successfully updated stock info");
            Ok(Json(updated_stock))
        },
        Ok(None) => Err((Status::NotFound, Json(ErrorResponse { message: "Stock not found".to_string() }))),
        Err(e) => {
            info!("Failed to update stock: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to update stock".to_string() })))
        }
    }
}

#[delete("/stocks/delete/<stock_id>")]
pub async fn delete_stock(stock_service: &State<StockService>, stock_id: i32) -> Result<Json<usize>, (Status, Json<ErrorResponse>)> {
    match stock_service.delete_stock(stock_id).await {
        Ok(deleted_count) => {
            if deleted_count > 0 {
                info!("Deleted stock with ID: {}", stock_id);
                Ok(Json(deleted_count))
            } else {
                info!("No such stock found");
                Err((Status::NotFound, Json(ErrorResponse { message: "No such stock found".to_string() })))
            }
        }
        Err(StockError::NotFound) => {
            info!("No such stock found");
            Err((Status::NotFound, Json(ErrorResponse { message: "No such stock found".to_string() })))
        }
        Err(e) => {
            info!("Error deleting stock with ID {}: {:?}", stock_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Error deleting stock".to_string() })))
        }
    }
}
