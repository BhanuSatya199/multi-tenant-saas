require("dotenv").config();
const express = require("express");
const cors = require("cors");

const healthRoute = require("./routes/health");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/api", healthRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
