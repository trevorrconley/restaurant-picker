// server/initDb.js
const fs = require("fs");
const path = require("path");
const pool = require("./db");

async function initDatabase() {
  try {
    const sqlPath = path.join(__dirname, "..", "db", "init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await pool.query(sql);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
