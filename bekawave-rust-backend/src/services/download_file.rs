use std::io::Cursor;
use chrono::{Local, NaiveDateTime};
use csv::WriterBuilder;
use rocket::http::ContentType;
use rocket::response::Response;
use crate::services::{CustomerService, ProductService, SalesError, SalesService};

pub async fn download_file(
    product_service: &ProductService,
    customer_service: &CustomerService,
    sales_service: &SalesService,
    format: &str,
) -> Result<Response<'static>, SalesError> {
    let csv_name = Local::now().date_naive().to_string();

    // Retrieve all sales records
    let sales_list = sales_service.get_all_sales().await?;

    let mut sales_with_customer_names = Vec::new();

    for sale in sales_list {
        // Retrieve the customer associated with each sale
        let customer = customer_service.get_customer(sale.customer_id).await.unwrap();
        let product = product_service.get_product(sale.product_id).await.unwrap();

        // Create a new struct that includes customer name with the sales record
        let sale_with_name = SalesWithCustomerName {
            sales_id: sale.sales_id,
            customer_name: customer.name.clone(),
            sales_rep_id: sale.sales_rep_id,
            total_price: sale.total_price,
            sales_time: sale.sales_time,
            product_name: product.name.clone(),
            product_price: product.price,
            product_quantity: sale.product_quantity,
        };

        sales_with_customer_names.push(sale_with_name);
    }

    let (content_type, file_contents) = match format {
        "csv" => {
            let mut wtr = WriterBuilder::new().from_writer(vec![]);

            // Write CSV headers
            wtr.write_record(&[
                "Customer Name",
                "Total Price",
                "Sales Time",
                "Product name",
                "Product Price",
                "Product Quantity",
            ]).unwrap();

            // Write CSV data rows
            for sale in sales_with_customer_names {
                wtr.write_record(&[
                    sale.customer_name,
                    sale.total_price.to_string(),
                    sale.sales_time.to_string(),
                    sale.product_name,
                    sale.product_price.to_string(),
                    sale.product_quantity.to_string(),
                ]).unwrap();
            }

            let file_contents = wtr.into_inner().unwrap();
            (ContentType::CSV, file_contents)
        }
        "xlsx" => {
            let mut book = umya_spreadsheet::new_file();
            let sheet = book.get_sheet_mut(&0).unwrap();

            // Write XLSX headers
            let headers = [
                "Customer Name",
                "Total Price",
                "Sales Time",
                "Product name",
                "Product Price",
                "Product Quantity",
            ];

            for (col_num, header) in headers.iter().enumerate() {
                sheet.get_cell_mut((1, col_num as u32 + 1)).set_value(header.to_string());
            }

            // Write XLSX data rows
            for (row_num, sale) in sales_with_customer_names.iter().enumerate() {
                let row_num = row_num as u32 + 2;  // Start from row 2
                sheet.get_cell_mut((row_num, 1)).set_value(&sale.customer_name);
                sheet.get_cell_mut((row_num, 2)).set_value(sale.total_price.to_string());
                sheet.get_cell_mut((row_num, 3)).set_value(&sale.sales_time.to_string());
                sheet.get_cell_mut((row_num, 4)).set_value(&sale.product_name);
                sheet.get_cell_mut((row_num, 5)).set_value(sale.product_price.to_string());
                sheet.get_cell_mut((row_num, 6)).set_value(sale.product_quantity.to_string());
            }

            let mut writer = vec![];
            umya_spreadsheet::writer::xlsx::write_writer(&book, &mut writer).unwrap();
            (ContentType::new("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"), writer)
        }
        _ => {
            return Err(SalesError::UnsupportedFormat);
        }
    };

    let response = Response::build()
        .header(content_type)
        .sized_body(file_contents.len(), Cursor::new(file_contents))
        .finalize();

    Ok(response)
}

// Example struct to hold sales data along with customer names
struct SalesWithCustomerName {
    sales_id: i64,
    customer_name: String,
    sales_rep_id: Option<i32>,
    total_price: i32,
    sales_time: NaiveDateTime,
    product_name: String,
    product_price: i64,
    product_quantity: i32,
}
