const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🚫 NO auth middleware here
router.post("/login", authController.login);

module.exports = router;
