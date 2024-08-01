use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use tracing::info;
use crate::services::{CustomerError, CustomerService};
use crate::models::{Customer, ErrorResponse};

/// Initializes a `CustomerService` instance using the provided `PgPool`.
pub async fn customer_service_init(pool: &PgPool) -> CustomerService {
    CustomerService::new(pool.clone()).await
}

/// Retrieves all customers.
#[get("/customers/all")]
pub async fn get_all_customers(customer_service: &State<CustomerService>) -> Result<Json<Vec<Customer>>, (Status, Json<ErrorResponse>)> {
    match customer_service.get_all_customers().await {
        Ok(customers) => {
            if customers.is_empty() {
                info!("No customers found");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No customers found".to_string(),
                })))
            } else {
                info!("Retrieved all customers");
                Ok(Json(customers))
            }
        }
        Err(e) => {
            info!("Error retrieving customers: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve customers".to_string(),
            })))
        }
    }
}

/// Retrieves a customer by ID.
#[get("/customers/by-id/<id>")]
pub async fn get_customer(customer_service: &State<CustomerService>, id: i32) -> Result<Json<Customer>, (Status, Json<ErrorResponse>)> {
    match customer_service.get_customer(id).await {
        Ok(customer) => {
            info!("Successfully retrieved a customer");
            Ok(Json(customer))
        }
        Err(CustomerError::NotFound) => {
            info!("No customer found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Customer not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e.to_string());
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to get customer".to_string(),
            })))
        }
    }
}

/// Creates a new customer.
#[post("/customers/create", data = "<customer>")]
pub async fn create_customer(customer_service: &State<CustomerService>, customer: Json<Customer>) -> Result<Created<Json<Customer>>, (Status, Json<ErrorResponse>)> {
    match customer_service.create_customer(customer.into_inner()).await {
        Ok(new_customer) => {
            info!("Created customer successfully");
            Ok(Created::new("/customers/all").body(Json(new_customer)))
        }
        Err(CustomerError::DuplicateCustomer) => {
            info!("Duplicate customer");
            Err((Status::Conflict, Json(ErrorResponse {
                message: "Duplicate customer".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to create customer".to_string(),
            })))
        }
    }
}

/// Updates an existing customer.
#[put("/customers/update", data = "<customer>")]
pub async fn update_customer(customer_service: &State<CustomerService>, customer: Json<Customer>) -> Result<Json<Customer>, (Status, Json<ErrorResponse>)> {
    match customer_service.update_customer(customer.into_inner()).await {
        Ok(updated_customer) => {
            info!("Successfully updated customer info");
            Ok(Json(updated_customer))
        }
        Err(CustomerError::NotFound) => {
            info!("Customer not found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Customer not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to update customer".to_string(),
            })))
        }
    }
}

/// Deletes a customer by ID.
#[delete("/customers/delete/<id>")]
pub async fn delete_customer(customer_service: &State<CustomerService>, id: i32) -> Result<Json<bool>, (Status, Json<ErrorResponse>)> {
    match customer_service.delete_customer(id).await {
        Ok(rows_affected) if rows_affected > 0 => {
            info!("Deleted customer");
            Ok(Json(true))
        }
        Ok(_) => {
            info!("No such customer found");
            Err((Status::NotFound, Json(ErrorResponse {
                message: "No such customer found".to_string(),
            })))
        }
        Err(CustomerError::NotFound) => {
            info!("Customer not found for ID: {:?}", id);
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Customer not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error occurred: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to delete customer".to_string(),
            })))
        }
    }
}
