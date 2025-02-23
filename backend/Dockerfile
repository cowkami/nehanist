FROM rust:1.85.0-slim AS builder

WORKDIR /work

RUN rustup target add aarch64-unknown-linux-musl
COPY . .
RUN cargo build --target=aarch64-unknown-linux-musl --release


# ローカル開発環境のビルドステージ
FROM builder AS dev
WORKDIR /work

COPY . .
RUN cargo install cargo-watch

CMD cargo watch -x run -d 2


# prod/stg/dev環境のデプロイステージ
FROM scratch AS deploy

COPY --from=builder /work/target/aarch64-unknown-linux-musl/release/app /app

CMD ["/app"]