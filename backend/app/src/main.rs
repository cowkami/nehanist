use anyhow::Result;
use axum::{Router, routing::get};
use dotenv::dotenv;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> Result<()> {
    // load the environment variables for local development
    dotenv().ok();

    // initialize the logger
    env_logger::init();
    log::info!("App server starting...");

    // build the app
    let app = Router::new().route("/api/v1/health", get(|| async { "OK" }));

    // run the app
    let listener = TcpListener::bind("127.0.0.1:3000").await?;

    axum::serve(listener, app).await?;
    log::info!("App server stopped");

    Ok(())
}
