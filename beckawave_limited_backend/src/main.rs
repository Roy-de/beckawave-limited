use rocket::{launch, Rocket, routes};

#[launch]
fn rocket()-> _ {
    Rocket::build()
        .mount("/",routes![])
}
