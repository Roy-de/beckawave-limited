use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use tracing::info;
use crate::services::{DebtError, DebtService};
use crate::models::{ErrorResponse, Debt};

/// Initializes a `DebtService` instance using the provided `PgPool`.
pub async fn debt_service_init(pool: &PgPool) -> DebtService {
    DebtService::new(pool.clone()).await
}

/// Retrieves all debts.
#[get("/debts/all")]
pub async fn get_all_debts(debt_service: &State<DebtService>) -> Result<Json<Vec<Debt>>, (Status, Json<ErrorResponse>)> {
    match debt_service.get_all_debts().await {
        Ok(debts) => {
            if debts.is_empty() {
                info!("No debts found.");
                Err((
                    Status::NotFound,
                    Json(ErrorResponse {
                        message: "No debts found".to_string(),
                    }),
                ))
            } else {
                info!("Retrieved all debts successfully.");
                Ok(Json(debts))
            }
        }
        Err(e) => {
            info!("Error retrieving debts: {:?}", e);
            Err((
                Status::InternalServerError,
                Json(ErrorResponse {
                    message: "Failed to retrieve debts".to_string(),
                }),
            ))
        }
    }
}

/// Retrieves a debt by ID.
#[get("/debts/by-id/<id>")]
pub async fn get_debt(debt_service: &State<DebtService>, id: i32) -> Result<Json<Debt>, (Status, Json<ErrorResponse>)> {
    match debt_service.get_debt(id).await {
        Ok(debt) => {
            info!("Successfully retrieved a debt");
            Ok(Json(debt))
        }
        Err(DebtError::NotFound) => {
            info!("No debt found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Debt not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e.to_string());
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to get debt".to_string(),
            })))
        }
    }
}

/// Creates a new debt.
#[post("/debts/create", data = "<debt>")]
pub async fn create_debt(debt_service: &State<DebtService>, debt: Json<Debt>) -> Result<Created<Json<Debt>>, (Status, Json<ErrorResponse>)> {
    match debt_service.create_debt(debt.into_inner()).await {
        Ok(new_debt) => {
            info!("Created debt successfully");
            Ok(Created::new("/debts/all").body(Json(new_debt)))
        }
        Err(DebtError::DuplicateDebt) => {
            info!("Duplicate debt");
            Err((Status::Conflict, Json(ErrorResponse {
                message: "Duplicate debt".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to create debt".to_string(),
            })))
        }
    }
}

/// Updates an existing debt.
#[put("/debts/update", data = "<debt>")]
pub async fn update_debt(debt_service: &State<DebtService>, debt: Json<Debt>) -> Result<Json<Debt>, (Status, Json<ErrorResponse>)> {
    match debt_service.update_debt(debt.into_inner()).await {
        Ok(Some(updated_debt)) => {
            info!("Successfully updated debt info");
            Ok(Json(updated_debt))
        }
        Ok(None) => {
            info!("Debt not found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Debt not found".to_string(),
            })))
        }
        Err(DebtError::NotFound) => {
            info!("Debt not found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Debt not found".to_string(),
            })))
        }
        Err(DebtError::SqlxError(e)) => {
            info!("SQLx error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to update debt due to a database error".to_string(),
            })))
        }
        Err(e) => {
            info!("Unexpected error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to update debt due to an unexpected error".to_string(),
            })))
        }
    }
}

/// Deletes a debt by ID.
#[delete("/debts/delete/<id>")]
pub async fn delete_debt(debt_service: &State<DebtService>, id: i32) -> Result<Json<bool>, (Status, Json<ErrorResponse>)> {
    match debt_service.delete_debt(id).await {
        Ok(true) => {
            info!("Deleted debt");
            Ok(Json(true))
        }
        Ok(false) => {
            info!("No such debt found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "No such debt found".to_string(),
            })))
        }
        Err(DebtError::NotFound) => {
            info!("Debt not found for ID: {:?}", id);
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Debt not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to delete debt".to_string(),
            })))
        }
    }
}
