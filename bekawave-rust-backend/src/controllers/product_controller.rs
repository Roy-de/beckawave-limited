use rocket::http::Status;
use rocket::response::status::Created;
use rocket::serde::json::Json;
use rocket::State;
use sqlx::PgPool;
use crate::models::{ErrorResponse, Product};
use crate::services::{ProductService, ProductError};
use tracing::info;

pub async fn product_service_init(pool: &PgPool) -> ProductService {
    ProductService::new(pool.clone()).await
}

#[get("/products/get-all")]
pub async fn get_all_products(product_service: &State<ProductService>) -> Result<Json<Vec<Product>>, (Status, Json<ErrorResponse>)> {
    match product_service.get_all_products().await {
        Ok(products) => {
            if products.is_empty() {
                info!("No products found.");
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No products found".to_string(),
                })))
            } else {
                info!("Retrieved all products successfully.");
                Ok(Json(products))
            }
        }
        Err(e) => {
            info!("Error retrieving products: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve products".to_string(),
            })))
        }
    }
}

#[get("/products/get_product_by_id/<product_id>")]
pub async fn get_product(product_service: &State<ProductService>, product_id: i32) -> Result<Json<Product>, (Status, Json<ErrorResponse>)> {
    match product_service.get_product(product_id).await {
        Ok(product) => {
            info!("Successfully retrieved product with ID: {}", product_id);
            Ok(Json(product))
        }
        Err(ProductError::NotFound) => {
            info!("Product with ID {} not found.", product_id);
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Product not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error retrieving product with ID {}: {:?}", product_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to retrieve product".to_string(),
            })))
        }
    }
}

#[post("/products/create", data = "<product>")]
pub async fn create_product(product_service: &State<ProductService>, product: Json<Product>) -> Result<Created<Json<Product>>, (Status, Json<ErrorResponse>)> {
    match product_service.create_product(product.into_inner()).await {
        Ok(created_product) => {
            info!("Created product successfully with ID: {}", created_product.product_id);
            Ok(Created::new("/products/get-all").body(Json(created_product)))
        }
        Err(ProductError::DuplicateProduct) => {
            info!("Product creation failed: duplicate product");
            Err((Status::Conflict, Json(ErrorResponse {
                message: "Product with the same name and price already exists".to_string(),
            })))
        }
        Err(e) => {
            info!("Failed to create product: {:?}", e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to create product".to_string(),
            })))
        }
    }
}

#[put("/products/update", data = "<product>")]
pub async fn update_product(product_service: &State<ProductService>, product: Json<Product>, ) -> Result<Json<Product>, (Status, Json<ErrorResponse>)> {
    match product_service.update_product(product.into_inner()).await {
        Ok(updated_product) => {
            info!("Successfully updated product with ID: {}", updated_product.product_id);
            Ok(Json(updated_product))
        }
        Err(sqlx::Error::RowNotFound) => {
            info!("Product not found for update.");
            Err((
                Status::NotFound,
                Json(ErrorResponse {
                    message: "Product not found".to_string(),
                }),
            ))
        }
        Err(e) => {
            info!("Failed to update product: Error -> {:?}", e);
            Err((
                Status::InternalServerError,
                Json(ErrorResponse {
                    message: "Failed to update product".to_string(),
                }),
            ))
        }
    }
}


#[delete("/products/delete/<product_id>")]
pub async fn delete_product(product_service: &State<ProductService>, product_id: i32) -> Result<Json<usize>, (Status, Json<ErrorResponse>)> {
    match product_service.delete_product(product_id).await {
        Ok(rows_affected) => {
            if rows_affected > 0 {
                info!("Successfully deleted product with ID: {}", product_id);
                Ok(Json(rows_affected))
            } else {
                info!("No product found with ID: {} for deletion.", product_id);
                Err((Status::NotFound, Json(ErrorResponse {
                    message: "No product found".to_string(),
                })))
            }
        }
        Err(ProductError::NotFound) => {
            info!("Product with ID {} not found.", product_id);
            Err((Status::NotFound, Json(ErrorResponse {
                message: "Product not found".to_string(),
            })))
        }
        Err(e) => {
            info!("Error deleting product with ID {}: {:?}", product_id, e);
            Err((Status::InternalServerError, Json(ErrorResponse {
                message: "Failed to delete product".to_string(),
            })))
        }
    }
}
