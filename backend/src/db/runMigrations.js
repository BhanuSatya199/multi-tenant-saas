const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

module.exports = async function runMigrations() {
  console.log("🚀 Running migrations...");

  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  console.log("✅ DB connected");

  // 👇 CORRECT PATH (relative to backend container /app)
  const migrationsDir = path.join(__dirname, "../../database/migrations");

  // ✅ If tables already exist → skip
  const check = await client.query(
    "SELECT to_regclass('public.tenants')"
  );

  if (check.rows[0].to_regclass) {
    console.log("✅ Tables already exist, skipping migrations");
    await client.end();
    return;
  }

  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    console.log("📄 Executing:", file);
    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      "utf8"
    );
    await client.query(sql);
  }

  await client.end();
  console.log("🎉 Migrations complete");
};
