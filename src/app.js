const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Back-end coding competency test involving' +
    ' US states and census data, using node, express, UML, Docker, PostgreSQL.' });
});

// GET /states - returns a list of all states with their total population
app.get('/states', db.getStates);

// GET /states/{state_id}/counties - returns a list of all counties in a state
app.get('/states/:state_id/counties', db.getCountiesByStateId);

// GET /counties/{county_id} - returns the population of a county
app.get('/counties/:county_id', db.getCounty)

// POST /counties - creates a new county
app.post('/counties', db.createCounty);

// PUT /counties/{county_id} - updates the population of a county
app.put('/counties/:county_id', db.updateCounty);

// DELETE /counties/{county_id} - deletes a county
app.delete('/counties/:county_id', db.deleteCounty);



// POST /user - creating a user
app.post('/user', db.createUser);

// GET /user/authentication - returning a token that will be used into the swagger for testing your server.
app.get('/user/authentication', db.authenticateUser);



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});