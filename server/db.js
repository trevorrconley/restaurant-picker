const { Pool } = require('pg');

// Production DB connection
// Assumes you have DATABASE_URL set in App Runner environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // RDS requires SSL; false is okay for Node app in prod
  },
});

// Optional: log connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
