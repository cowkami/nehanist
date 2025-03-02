build-dev:
	docker compose build
	docker compose run frontend npm i

up:
	docker compose up

build:
	docker compose -f compose.yaml -f compose.build.yaml build
