use anyhow::Result;
use dotenv::dotenv;

use app_server::AppServer;

#[tokio::main]
async fn main() -> Result<()> {
    // load the environment variables for local development
    dotenv().ok();

    // initialize the logger
    env_logger::init();
    log::info!("Log level: {}", log::max_level());
    log::info!("App server starting...");

    AppServer::run().await?;

    log::info!("App server stopped");

    Ok(())
}
