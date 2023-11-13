const Pool = require('pg').Pool;
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: 'idt_census',
  password: 'idt-census',
  port: 5432,
});

// TODO: Read secret from file.
// const secret = fs.readFileSync('../public.pem');
const secret = 'sdfgjkhlkjdfeqrtpoiuokvoijfshgfhwrthZVDX';
const issuer = 'idt_census';

// GET /states - returns a list of all states with their total population
const getStates = (request, response) => {
  pool.query('SELECT * FROM state ORDER BY state_id ASC',
    (error, results) => {
      if (error) {
        return response.status(500).send(`getStates failed: ${error.message}`);
      }
      response.status(200).json(results.rows);
    });
};

// GET /states/{state_id}/counties - returns a list of all counties in a state
const getCountiesByStateId = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const state_id = parseInt(request.params.state_id);
  pool.query('SELECT * FROM county WHERE state_id = $1',
    [state_id],
    (error, results) => {
      if (error) {
        return response.status(500).send(`getCountiesByStateId failed: ${error.message}`);
      }
      response.status(200).json(results.rows);
    });
};

// GET /counties/{county_id} - returns the population of a county
const getCounty = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const county_id = parseInt(request.params.county_id);
  pool.query('SELECT * FROM county WHERE county_id = $1',
    [county_id],
    (error, results) => {
      if (error) {
        return response.status(500).send(`getCounty failed: ${error.message}`);
      }
      response.status(200).json(results.rows);
    });
};

// POST /counties - creates a new county
const createCounty = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const { county_name, state_id, county_population } = request.body;
  pool.query('INSERT INTO county (county_name, state_id, county_population) VALUES ($1, $2, $3) RETURNING *',
    [county_name, state_id, county_population],
    (error, results) => {
      if (error) {
        return response.status(500).send(`createCounty failed: ${error.message}`);
      }
      response.status(201).send(
        `County added with county_id: ${results.rows[0].county_id}`);
    });
};

// PUT /counties/{county_id} - updates the population of a county
const updateCounty = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const county_id = parseInt(request.params.county_id);
  const { county_population } = request.body;
  pool.query(
    'UPDATE county SET county_population = $1 WHERE county_id = $2',
    [county_population, county_id],
    (error, results) => {
      if (error) {
        return response.status(500).send(`updateCounty failed: ${error.message}`);
      }
      response.status(200).send(`County modified with county_id: ${county_id}`);
    });
};

// DELETE /counties/{county_id} - deletes a county
const deleteCounty = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const county_id = parseInt(request.params.county_id);
  pool.query('DELETE FROM county WHERE county_id = $1 RETURNING *',
    [county_id],
    (error, results) => {
      if (error) {
        return response.status(500).send(`deleteCounty failed: ${error.message}`);
      }
      response.status(200).send(`County ${results.rowCount ? 'deleted' : 'not found'} with county_id: ${county_id}`);
    });
};



// POST /user - creating a user
const createUser = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const { user_name, user_password } = request.body;
  pool.query(
    'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *',
    [user_name, user_password],
    (error, results) => {
      if (error) {
        return response.status(500).send(`createUser failed: ${error.message}`);
      }
      response.status(201).send(
        `User added with user_id: ${results.rows[0].user_id}`);
    });
};

// GET /user/authentication - returning a token that will be used into the swagger for testing your server.
const authenticateUser = (request, response) => {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    return response.status(422).json(validation);
  }
  const user_id = parseInt(request.params.user_id);
  pool.query('SELECT * FROM users WHERE user_id = $1',
    [user_id],
    (error, results) => {
      if (error) {
        return response.status(500).send(`authenticateUser failed: ${error.message}`);
      }
      if (!results.rowCount) {
        return response.status(403).send(`user_id ${user_id} not found`);
      }
      // Include user_id in payload for later logging.
      jwt.sign({}, secret, { subject: user_id.toString(), issuer, expiresIn: '1h' }, function(err, token) {
        if (err) {
          return response.status(500).send(`authenticateUser failed: ${err.message}`);
        }
        response.status(200).json({token});
      });
    });
};

const verifyToken = (request, response, next) => {
  const token = request.body.token || request.query.token ||
    request.headers["x-access-token"];
  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }
  jwt.verify(token, secret, { issuer }, function(err, decoded) {
    if (err) {
      return response.status(401).send("Invalid Token");
    }
    // console.log(decoded);
    return next();
  });
};


module.exports = {
  getStates,
  getCountiesByStateId,
  getCounty,
  createCounty,
  updateCounty,
  deleteCounty,
  createUser,
  authenticateUser,
  verifyToken,
};