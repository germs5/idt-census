# idt-census
Back-end coding competency test involving US states and census data, using node, express, UML, Docker, PostgreSQL.

## Requirements

See Requirements.md

Note that the need to supply a Swagger document has been dropped.

Additionally, the US Census data was supplied in a zip file, which is the source for the *states* folder.

*states/USA-states.json* contains the data for fetching all the states and their details.
*states/{state}.json* contains all the details relative to a state (county, population)

## Local Setup - perform once

Install jq, which is available for Mac by:
`brew install jq`

Run Docker Desktop. It is available at:
https://www.docker.com/products/docker-desktop/

In a terminal, in the root directory of this repo, run each of the following
lines sequentially:
`docker pull postgres`
`docker run --name idt-census-postgres -p 5432:5432 -e POSTGRES_PASSWORD=idt-census -d postgres`
`docker exec -i idt-census-postgres psql -U postgres < scripts/create-tables.sql`
`chmod +x scripts/populate-db.sh`
`scripts/populate-db.sh`

