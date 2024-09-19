use std::collections::HashMap;

#[derive(Debug)]
pub struct Response<T> {
    data: HashMap<String,T>
}

impl <T> Response<T> {
    pub(crate) fn new() -> Self {
        Response {
            data: HashMap::new(),
        }
    }

    pub(crate) fn add_item(&mut self, key: String, value: T) {
        self.data.insert(key, value);
    }

    fn get_item(&self, key: &str) -> Option<&T> {
        self.data.get(key)
    }

    fn remove_item(&mut self, key: &str) -> Option<T>{
        self.data.remove(key)
    }
}