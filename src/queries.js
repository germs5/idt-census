const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'idt_census',
  password: 'idt-census',
  port: 5432,
});


// GET /states - returns a list of all states with their total population
const getStates = (request, response) => {
  pool.query('SELECT * FROM state ORDER BY state_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET /states/{state_id}/counties - returns a list of all counties in a state
const getCountiesByStateId = (request, response) => {
  const state_id = parseInt(request.params.state_id);
  pool.query('SELECT * FROM county WHERE state_id = $1 ORDER BY county_id ASC', [state_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET /counties/{county_id} - returns the population of a county
const getCounty = (request, response) => {
  const county_id = parseInt(request.params.county_id);
  pool.query('SELECT * FROM county WHERE county_id = $1', [county_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// POST /counties - creates a new county
const createCounty = (request, response) => {
  const { county_name, state_id, county_population } = request.body;
  pool.query(
    'INSERT INTO county (county_name, state_id, county_population) VALUES ($1, $2, $3) RETURNING *',
    [county_name, state_id, county_population],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`County added with county_id: ${results.rows[0].county_id}`);
    }
  );
};

// PUT /counties/{county_id} - updates the population of a county
const updateCounty = (request, response) => {
  const county_id = parseInt(request.params.county_id);
  const { county_population } = request.body;
  pool.query(
    'UPDATE county SET county_population = $1 WHERE county_id = $2',
    [county_population, county_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`County modified with county_id: ${county_id}`);
    }
  );
};

// DELETE /counties/{county_id} - deletes a county
const deleteCounty = (request, response) => {
  const county_id = parseInt(request.params.county_id);
  pool.query('DELETE FROM county WHERE county_id = $1', [county_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`County deleted with county_id: ${county_id}`);
  });
};



// POST /user - creating a user
const createUser = (request, response) => {
  const { user_name, user_password } = request.body;
  pool.query(
    'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *',
    [user_name, user_password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with user_id: ${results.rows[0].user_id}`);
    }
  );
};

// GET /user/authentication - returning a token that will be used into the swagger for testing your server.
const authenticateUser = (request, response) => {
  response.status(501).send('Not implemented yet');
};

module.exports = {
  getStates,
  getCountiesByStateId,
  createUser,
  getCounty,
  createCounty,
  updateCounty,
  deleteCounty,
  createUser,
  authenticateUser,
};