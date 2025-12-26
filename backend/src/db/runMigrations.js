const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const migrationsPath = path.join(__dirname, "../../database/migrations");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function waitForDatabase() {
  let connected = false;

  while (!connected) {
    try {
      await pool.query("SELECT 1");
      connected = true;
      console.log("Database connected");
    } catch (err) {
      console.log("Waiting for database...");
      await sleep(3000);
    }
  }
}

module.exports = async function runMigrations() {
  await waitForDatabase();

  const files = fs.readdirSync(migrationsPath).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");
    await pool.query(sql);
    console.log("Executed:", file);
  }
};
