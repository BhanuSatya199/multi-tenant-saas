const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tenantController = require("../controllers/tenantController");

// public – register tenant
router.post("/register", tenantController.registerTenant);

// protected – get tenant details
router.get("/:tenantId", auth, tenantController.getTenant);

module.exports = router;
