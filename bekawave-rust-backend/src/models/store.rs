use async_graphql::InputObject;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Deserialize, Serialize, Debug, FromRow)]
pub struct Store{
    pub store_id: i64,
    pub name: String,
    pub location: String
}
#[derive(InputObject)]
pub struct NewStore {
    pub name: String,
    pub location: String,
}

pub fn build_store( name: String, location: String) -> Store {

    Store{
        store_id: 0,
        name,
        location
    }
}