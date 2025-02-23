build:
	docker compose build

up:
	docker compose up

build-dev:
	docker compose -f compose.dev.yaml build

up-dev:
	docker compose -f compose.dev.yaml up
