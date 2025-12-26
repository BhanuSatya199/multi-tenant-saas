require("dotenv").config();
const express = require("express");
const cors = require("cors");

const healthRoute = require("./routes/health");
const authRoutes = require("./routes/auth");
const tenantRoutes = require("./routes/tenants");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const runMigrations = require("./db/runMigrations");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/api", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);



// 🔥 Run migrations ONCE at startup
(async () => {
  try {
    await require("./db/runMigrations")();
    await require("./db/seed")();
  } catch (err) {
    console.error(err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend running on port", PORT);
});
