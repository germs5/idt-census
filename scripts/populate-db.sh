#!/bin/bash

# Insert state data in one go of separate INSERT lines.
jq -r '.[] | "INSERT INTO state (state_name, state_abbreviation, state_population)
  VALUES ('\''\(.state)'\'', '\''\(.abbreviation)'\'', \(.population));"' states/USA-states.json |
  docker exec -i idt-census-postgres psql -U postgres -d idt_census

# Loop through each state file.
#   Insert county data in one go of separate INSERT lines.
counter=0
jq -r '.[] | .state' states/USA-states.json | while read state; do
  counter=$[$counter + 1]
  jq -r '.[] | .county |= sub("'\''";"'\'\''") | "INSERT INTO county (county_name, county_population, state_id)
    VALUES ('\''\(.county)'\'', \(.population), '$counter');"' states/"$state".json |
    docker exec -i idt-census-postgres psql -U postgres -d idt_census
done