const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurant_db',
  password: 'postgres', // same as above
  port: 5432
});

module.exports = pool;
