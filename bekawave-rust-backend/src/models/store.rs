use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct Store{
    pub store_id: i32,
    pub name: String,
    pub location: String
}

pub fn build_store( name: String, location: String) -> Store {

    Store{
        store_id: 0,
        name,
        location
    }
}