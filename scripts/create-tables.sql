CREATE DATABASE idt_census;

\c idt_census

CREATE TABLE state (
  state_id smallserial PRIMARY KEY UNIQUE NOT NULL,
  state_name varchar(30) UNIQUE NOT NULL,
  state_abbreviation char(2) UNIQUE NOT NULL,
  state_population integer NOT NULL
);

CREATE TABLE county (
  county_id smallserial PRIMARY KEY UNIQUE NOT NULL,
  county_name varchar(50) NOT NULL,
  state_id smallint NOT NULL REFERENCES state ON DELETE CASCADE,
  county_population integer NOT NULL,
  UNIQUE (state_id, county_name)
);

CREATE TABLE users (
  user_id serial PRIMARY KEY UNIQUE NOT NULL,
  user_name varchar(30) UNIQUE NOT NULL,
  user_password varchar(255) NOT NULL
);