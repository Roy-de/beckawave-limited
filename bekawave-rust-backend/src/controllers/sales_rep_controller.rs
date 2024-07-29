use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::{PgPool};
use crate::services::{SalesRepError, SalesRepService};
use tracing::info;
use crate::models::{ErrorResponse, SalesRep};


pub async fn sales_rep_init(pool: &PgPool) -> SalesRepService {
    SalesRepService::new(pool.clone()).await
}
#[get("/sales-reps/all-reps")]
pub async fn get_all_sales_reps(sales_rep_service: &State<SalesRepService>) -> Result<Json<Vec<SalesRep>>, (Status, Json<ErrorResponse>)> {
    match sales_rep_service.get_all_sales_reps().await {
        Ok(sales_reps) => {
            if sales_reps.is_empty(){
                info!("No reps found");
                Err((Status::NotFound, Json( ErrorResponse {
                    message: "No sales reps found".to_string()
                })))
            } else {
                info!("Retrieved all sales reps");
                Ok(Json(sales_reps))
            }
        }
        Err(e) => {
            info!("Error retrieving sales reps: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
            message: "Failed to retrieve sales reps".to_string()
            })))
        }
    }
}
#[get("/sales-reps/by-id/<id>")]
pub async fn get_sales_rep(sales_rep_service: &State<SalesRepService>, id: i32) -> Result<Json<SalesRep>, (Status, Json<ErrorResponse>)> {
    match sales_rep_service.get_sales_rep(id).await {
        Ok(sales_rep) =>{
            info!("Successfully retrieved a sales rep");
            Ok(Json(sales_rep))
        }
        Err(SalesRepError::NotFound) => {
            info!("No sales rep found");
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales rep not found".to_string() })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e.to_string());
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to get sales rep".to_string() })))
        }
    }
}

#[post("/sales-reps/create-new", data = "<sales_rep>")]
pub async fn create_sales_rep(sales_rep_service: &State<SalesRepService>, sales_rep: Json<SalesRep>) -> Result<Created<Json<SalesRep>>, (Status, Json<ErrorResponse>)> {
    match sales_rep_service.create_sales_rep(sales_rep.into_inner()).await {
        Ok(new_sales_rep) => {
            info!("Created sales rep successfully");
            Ok(Created::new("/sales-reps/all-reps").body(Json(new_sales_rep)))
        }
        Err(SalesRepError::DuplicateSalesRep) => {
            info!("Duplicate sales reps");
            Err((Status::Conflict, Json(ErrorResponse { message: "Duplicate sales rep".to_string() })))
        }
        Err(e) => {
            info!("Error occurred: {:?}",e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to create sales rep".to_string() })))
        }
    }
}


#[put("/sales-reps/update", data = "<sales_rep>")]
pub async fn update_sales_rep(sales_rep_service: &State<SalesRepService>, sales_rep: Json<SalesRep>) -> Result<Json<SalesRep>, (Status, Json<ErrorResponse>)> {
    match sales_rep_service.update_sales_rep(sales_rep.into_inner()).await {
        Ok(updated_sales_rep) => {
            info!("Successfully updated sales reps info");
            Ok(Json(updated_sales_rep))
        },
        Err(SalesRepError::NotFound) => {
            info!("Sales rep not found by name");
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales rep not found".to_string() })))
        },
        Err(e) => {
            info!("Error occurred: {:?}",e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to update sales rep".to_string() })))
        },
    }
}

#[delete("/sales-reps/delete/<id>")]
pub async fn delete_sales_rep(sales_rep_service: &State<SalesRepService>, id: i32) -> Result<Json<usize>, (Status, Json<ErrorResponse>)> {
    match sales_rep_service.delete_sales_rep(id).await {
        Ok(deleted_store) => {
            if deleted_store > 0 {
                info!("Deleted sales rep");
                Ok(Json(deleted_store))
            } else {
                info!("No such store found");
                Err((Status::NotFound, Json(ErrorResponse { message: "No such store found".to_string() })))
            }
        },
        Err(SalesRepError::NotFound) => {
            info!("Sales rep not found for ID: {:?}",id);
            Err((Status::NotFound, Json(ErrorResponse { message: "Sales rep not found".to_string() })))
        },
        Err(e) => {
            info!("Error occurred: {:?}",e);
            Err((Status::InternalServerError, Json(ErrorResponse { message: "Failed to delete sales rep".to_string() })))
        },
    }
}