const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

async function initDatabase() {
  const defaultDbUrl = process.env.DATABASE_URL.replace(/\/[^/]+$/, "/postgres");
  const targetDbUrl = process.env.DATABASE_URL;

  // Connect to default DB to create target DB if needed
  const client = new Client({
    connectionString: defaultDbUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  const dbName = targetDbUrl.split("/").pop();
  await client.query(`CREATE DATABASE ${dbName}`).catch(err => {
    if (err.code === "42P04") {
      // Database already exists, ignore
      console.log("Database already exists");
    } else {
      throw err;
    }
  });

  await client.end();

  // Now run your normal init script
  const pool = new Client({
    connectionString: targetDbUrl,
    ssl: { rejectUnauthorized: false },
  });
  await pool.connect();

  const sqlPath = path.join(__dirname, "..", "db", "init.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");
  await pool.query(sql);

  console.log("Database initialized successfully.");
  await pool.end();
}

initDatabase().catch(err => {
  console.error("Error initializing database:", err);
  process.exit(1);
});