const express = require('express');
const { param, body } = require('express-validator');
const bodyParser = require('body-parser');
const { getStates, getCountiesByStateId, getCounty,
  createCounty, updateCounty, deleteCounty,
  createUser, authenticateUser } = require('./queries.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({
    info: 'Back-end coding competency test involving' +
      ' US states and census data, using node, express, UML, Docker, PostgreSQL.'
  });
});

// GET /states - returns a list of all states with their total population
app.get('/states', getStates);

// GET /states/{state_id}/counties - returns a list of all counties in a state
app.get('/states/:state_id/counties',
  param('state_id').escape().isInt({ min: 1, max: 51 }),
  getCountiesByStateId);

// GET /counties/{county_id} - returns the population of a county
app.get('/counties/:county_id',
  param('county_id').escape().isInt({ min: 1 }),
  getCounty);

// POST /counties - creates a new county
app.post('/counties',
  body('county_name').escape().notEmpty(),
  body('state_id').escape().isInt({ min: 1, max: 51 }),
  body('county_population').escape().isInt({ min: 0 }),
  createCounty);

// PUT /counties/{county_id} - updates the population of a county
app.put('/counties/:county_id',
  param('county_id').escape().isInt({ min: 1 }),
  body('county_population').escape().isInt({ min: 0 }),
  updateCounty);

// DELETE /counties/{county_id} - deletes a county
app.delete('/counties/:county_id',
  param('county_id').escape().isInt({ min: 1 }),
  deleteCounty);



// POST /user - creating a user
app.post('/user',
  body('user_name').escape().notEmpty(),
  body('user_password').escape().notEmpty(),
  createUser);

// GET /user/authentication - returning a token that will be used into the swagger for testing your server.
app.get('/user/authentication', authenticateUser);



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});