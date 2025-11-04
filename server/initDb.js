// server/initDb.js
const fs = require('fs');
const pool = require('./db');

async function initDatabase() {
  try {
    const sql = fs.readFileSync('../db/init.sql', 'utf8'); // path from server/
    await pool.query(sql);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    pool.end();
  }
}

initDatabase();
