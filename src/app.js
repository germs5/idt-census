const express = require('express');
const { param, body } = require('express-validator');
const bodyParser = require('body-parser');
const { getStates, getCountiesByStateId, getCounty,
  createCounty, updateCounty, deleteCounty,
  createUser, authenticateUser, verifyToken } = require('./queries.js');

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
app.get('/states',
  verifyToken,
  getStates);

// GET /states/{state_id}/counties - returns a list of all counties in a state
app.get('/states/:state_id/counties',
  verifyToken,
  param('state_id').escape().isInt({ min: 1, max: 51 }),
  getCountiesByStateId);

// GET /counties/{county_id} - returns the population of a county
app.get('/counties/:county_id',
  verifyToken,
  param('county_id').escape().isInt({ min: 1 }),
  getCounty);

// POST /counties - creates a new county
app.post('/counties',
  verifyToken,
  body('county_name').escape().notEmpty(),
  body('state_id').escape().isInt({ min: 1, max: 51 }),
  body('county_population').escape().isInt({ min: 0 }),
  createCounty);

// PUT /counties/{county_id} - updates the population of a county
app.put('/counties/:county_id',
  verifyToken,
  param('county_id').escape().isInt({ min: 1 }),
  body('county_population').escape().isInt({ min: 0 }),
  updateCounty);

// DELETE /counties/{county_id} - deletes a county
app.delete('/counties/:county_id',
  verifyToken,
  param('county_id').escape().isInt({ min: 1 }),
  deleteCounty);



/* 
  The next two API's around JWT authentication 
  assume there is an entire other mechanism,
  including a front-end, that authorizes
  access to saving the user_name and user_password
  and subsequently providing a JWT token.
  This mechanism, thankfully, is allowed to
  not be implemented at this time.
*/

// POST /user - creating a user
app.post('/user',
  body('user_name').escape().notEmpty(),
  body('user_password').escape().notEmpty(),
  createUser);

// GET /user/authentication - returning a token that will be used into the swagger for testing your server.
app.get('/user/authentication/:user_id',
  param('user_id').escape().isInt({ min: 1 }),
  authenticateUser);



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});