# idt-census
Back-end coding competency test involving US states and census data, using node, express, UML, Docker, PostgreSQL.

## Requirements

See Requirements.md

Note that the need to supply a Swagger document has been dropped.

Additionally, the US Census data was supplied in a zip file, which is the source for the *states* folder.

*states/USA-states.json* contains the data for fetching all the states and their details.
*states/{state}.json* contains all the details relative to a state (county, population)

## Container Setup - perform once

Install *jq*, which is available for Mac by:
`brew install jq`

Run *Docker Desktop*. It is available at:
https://www.docker.com/products/docker-desktop/

In a terminal, in the root directory of this repo,
run:
```
docker compose up
```

Once you see both containers come fully up, as evidenced by seeing the output line:
```
idt-census-node-1      | App running on port 3000.
```
you should then run in a different terminal in the root directory of this repo,
each of the following commands sequentially to create and populate the database tables:

```
docker exec -i idt-census-postgres-1 psql -U postgres < scripts/create-tables.sql

chmod +x scripts/populate-db.sh

scripts/populate-db.sh
```

## Test system

In any terminal, in any directory,
run each of the following commands sequentially:

```
curl -i -X GET http://localhost:3000

curl -i -X POST http://localhost:3000/user -d 'user_name=john&user_password=123456'

curl -i -X GET http://localhost:3000/user/authentication/1
```

Copy the token value returned from that last call. Insert it as a query parameter, or in the body, or as a header of subsequent calls. Note the value you get will be different, but should have the same form:

```
curl -i -X GET http://localhost:3000/states?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk4MzM0NDEsImV4cCI6MTY5OTgzNzA0MSwiaXNzIjoiaWR0X2NlbnN1cyIsInN1YiI6IjEifQ.z625xlooB-5ccRzlTxoW6ZIxbO2GwKDgwx97_eAHFMM

curl -i -X GET http://localhost:3000/states/39/counties -H "x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk4MzM0NDEsImV4cCI6MTY5OTgzNzA0MSwiaXNzIjoiaWR0X2NlbnN1cyIsInN1YiI6IjEifQ.z625xlooB-5ccRzlTxoW6ZIxbO2GwKDgwx97_eAHFMM"

curl -i -X POST http://localhost:3000/counties -d "county_name=Bogus County&state_id=16&county_population=360&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk4MzM0NDEsImV4cCI6MTY5OTgzNzA0MSwiaXNzIjoiaWR0X2NlbnN1cyIsInN1YiI6IjEifQ.z625xlooB-5ccRzlTxoW6ZIxbO2GwKDgwx97_eAHFMM"
```
