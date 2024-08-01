use serde::Serialize;

/// Represents an error response that can be returned by an API or service.
///
/// This struct is used to encapsulate error messages in a consistent format when an operation fails.
///
/// # Fields
/// - `message`: A string containing the error message to be conveyed to the client or user.
///
/// # Examples
///
/// ```rust
/// use crate::models::ErrorResponse;
///
/// let error_response = ErrorResponse {
///     message: "An unexpected error occurred".to_string(),
/// };
///
/// assert_eq!(error_response.message, "An unexpected error occurred");
/// ```
///
/// # Notes
/// - The `message` field provides a description of the error, which can be used to inform the client or user about what went wrong.
#[derive(Serialize)]
pub struct ErrorResponse {
    pub(crate) message: String,
}
