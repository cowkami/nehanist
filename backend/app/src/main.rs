use anyhow::Result;
use dotenv::dotenv;
use tonic::{Request, Response, Status, transport::Server};
use tonic_web::GrpcWebLayer;

// import the generated rust code from the proto file
pub mod proto {
    tonic::include_proto!("app");
}

use proto::app_service_server::{AppService as AppServiceTrait, AppServiceServer};

#[derive(Default, Clone)]
pub struct AppService;

#[tonic::async_trait]
impl AppServiceTrait for AppService {
    async fn check_health(
        &self,
        request: Request<proto::CheckHealthRequest>,
    ) -> Result<Response<proto::CheckHealthResponse>, Status> {
        log::info!("Got health check request: {:?}", request);

        Ok(Response::new(proto::CheckHealthResponse {
            status: "OK".to_string(),
        }))
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    // load the environment variables for local development
    dotenv().ok();

    // initialize the logger
    env_logger::init();
    log::info!("App server starting...");

    let addr = "0.0.0.0:50051".parse()?;
    let app_service = AppService::default();
    let app_service = AppServiceServer::new(app_service);

    Server::builder()
        .accept_http1(true)
        .layer(GrpcWebLayer::new())
        .add_service(app_service)
        .serve(addr)
        .await?;

    log::info!("App server stopped");

    Ok(())
}
