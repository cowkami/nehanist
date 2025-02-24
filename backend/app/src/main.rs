use anyhow::Result;
use chrono::prelude::*;
use dotenv::dotenv;
use tonic::{Request, Response, Status, transport::Server};
use tonic_web::GrpcWebLayer;
use tower_http::cors::CorsLayer;

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

    async fn add_weight(
        &self,
        request: Request<proto::AddWeightRequest>,
    ) -> Result<Response<proto::AddWeightResponse>, Status> {
        log::info!("Got add weight request: {:?}", request);

        let weight_record = request
            .into_inner()
            .weight_record
            .ok_or(Status::invalid_argument("weight_record is required"))?
            .try_into()
            .expect("invalid WeightRecord");

        log::info!("WeightRecord: {:?}", weight_record);

        log::info!("Writing WeightRecord...");
        // TODO: Add the weight record to the database
        log::info!("Completed writing WeightRecord!");

        Ok(Response::new(proto::AddWeightResponse {
            weight_record,
            status: "OK".to_string(),
        }))
    }
}

#[derive(Debug)]
struct WeightRecord {
    id: Option<String>,
    date: NaiveDate,
    weight: f32,
}

impl TryInto<WeightRecord> for proto::WeightRecord {
    type Error = anyhow::Error;

    fn try_into(self) -> Result<WeightRecord> {
        let date = self
            .date
            .ok_or_else(|| anyhow::anyhow!("date is required"))?
            .try_into()?;

        Ok(WeightRecord {
            id: if self.id.is_empty() {
                None
            } else {
                Some(self.id)
            },
            date,
            weight: self.weight,
        })
    }
}

impl TryInto<NaiveDate> for proto::Date {
    type Error = anyhow::Error;

    fn try_into(self) -> Result<NaiveDate> {
        Ok(
            NaiveDate::from_ymd_opt(self.year as i32, self.month as u32, self.day as u32)
                .ok_or(anyhow::anyhow!("Invalid date"))?,
        )
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
        .layer(
            CorsLayer::new()
                .allow_origin(tower_http::cors::Any)
                .allow_methods(tower_http::cors::Any)
                .allow_headers(tower_http::cors::Any),
        )
        .layer(GrpcWebLayer::new())
        .add_service(app_service)
        .serve(addr)
        .await?;

    log::info!("App server stopped");

    Ok(())
}
