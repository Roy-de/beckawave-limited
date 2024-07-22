use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Debug)]
pub struct Store{
    pub id: Uuid,
    pub name: String,
    pub location: String
}