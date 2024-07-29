#[derive(serde::Serialize)]
pub struct ErrorResponse {
    pub(crate) message: String,
}
