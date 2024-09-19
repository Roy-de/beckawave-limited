use rocket::State;
use crate::services::{CustomerService, download_file, ProductService, SalesService};

#[get("/download?<format>")]
pub async fn download_route(
    format: &str,
    customer_service: &State<CustomerService>,
    product_service: &State<ProductService>,
    sales_service: &State<SalesService>,
) -> Result<String, String> {
    match download_file(product_service, customer_service, sales_service, format).await {
        Ok(response) => Ok(format!("File generated successfully: {:?}", response)),
        Err(e) => Err(format!("Failed to generate file: {:?}", e)),
    }
}