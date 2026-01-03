const app = require("./app");

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    const runMigrations = require("./db/runMigrations");
    const seed = require("./db/seed");

    await runMigrations();   // ⬅️ TABLES CREATED HERE
    await seed();            // ⬅️ DATA INSERTED HERE
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1); // DO NOT REMOVE
  }
})();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
