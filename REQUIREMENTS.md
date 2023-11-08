# Requirements

You have been tasked with building a REST API server using Node JS + Express, PostgreSQL, Docker and UML schema. The data model should be related to USA states, counties, and their populations. Your task is to write the Node JS code, implement it all in Docker containers, and store the code in either Github or Bitbucket. All API endpoints should be protected by a JWT token, and you should write a Bash script to upload data to the PostgreSQL database. Finally, you should document the API with Swagger.

Design and build a data model that allows storing data for USA States, County, and their population. Your data model should have at least the following fields:

- State name

- State abbreviation

- County name

- County population

## Your project should have the following features:

1. A REST API built with Node JS express  that has the following endpoints:

- GET /states - returns a list of all states with their total population

- GET /states/{state_id}/counties - returns a list of all counties in a state

- GET /counties/{county_id} - returns the population of a county

- POST /counties - creates a new county

- PUT /counties/{county_id} - updates the population of a county

- DELETE /counties/{county_id} - deletes a county


2. A PostgreSQL database that stores the data for states, counties, and their populations. You will need to design the UML schema for this database and SQL scripts to create this database.

3. Docker containers that run the REST API and the PostgreSQL database.

4. Node JS Express  code that interacts with the database to implement the above endpoints. All API endpoints should be protected by a JWT token.

5. Proper error handling and validation for all input and output data.

6. Use appropriate HTTP status codes and response formats.

7. Proper documentation for your code and API endpoints using Swagger.

8. A Bash script to upload data to the PostgreSQL database.


## Deliverables:

- The Node JS (Express) code for your REST API and database interaction

- The UML schema for your database design

- A Docker Compose file that can be used to start the REST API and database containers

- A README file that explains how to run your application, including any setup required for the database or Docker containers

- A Bash script to upload data to the PostgreSQL database

- Proper documentation and clear code organization using Swagger

- The code should be stored in either Github or Bitbucket.

## Notes:

In addition to USA states tables, set up a user table with name, password (encrypted) with the corresponding api’s

- POST /user - creating a user
- GET /user/authentication - returning a token that will be used into the swagger for testing your server.

UML schema tool: Preferred is StarUML You can choose any other Data Modeling tool at your preference.

https://staruml.io/

Swagger:

https://swagger.io/

##US States data:

You can access information on the Census Bureau website, which provides a variety of tools and resources for exploring US population data. Some of the most useful resources for your project include:

The Census Bureau's "Population Estimates" program, which provides current estimates of population size and characteristics for each county and state in the United States. You can access this data through the Population Estimates website (https://www.census.gov/programs-surveys/popest.html).

The Census Bureau's "American Community Survey" (ACS), which provides detailed demographic, economic, and social data for each county and state in the United States. You can access this data through the ACS website (https://www.census.gov/programs-surveys/acs).

The Census Bureau's "TIGER/Line Shapefiles" program, which provides spatial data for each county and state in the United States. You can access this data through the TIGER/Line Shapefiles website (https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html).

Using these resources, you should be able to gather the data you need to build your data model for USA states, counties, and their populations. Please note that some of this data may be subject to licensing and usage restrictions, so be sure to review the terms of use for each resource carefully.