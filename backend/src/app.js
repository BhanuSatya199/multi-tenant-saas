const express = require("express");
const cors = require("cors");

const healthRoute = require("./routes/health");
const authRoutes = require("./routes/auth");
const tenantRoutes = require("./routes/tenants");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/api/health", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);

module.exports = app;
