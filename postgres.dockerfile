# Use Postgres latest as parent image
FROM postgres:16.0

# Change the working directory on the Docker image to /app
WORKDIR /app

# Expose application port
EXPOSE 5432