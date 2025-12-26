const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const migrationsPath = path.join(__dirname, "../../database/migrations");

(async () => {
  let connected = false;

  // 🔁 WAIT until database is ready
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

  // 🚀 Run migrations AFTER DB is ready
  const files = fs.readdirSync(migrationsPath).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");
    await pool.query(sql);
    console.log("Executed:", file);
  }

  console.log("All migrations completed");
})();
