const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const userController = require("../controllers/userController");

router.post("/tenants/:tenantId/users", auth, role(["tenant_admin"]), userController.addUser);
router.get("/tenants/:tenantId/users", auth, userController.listUsers);
router.put("/users/:userId", auth, role(["tenant_admin"]), userController.updateUser);
router.delete("/users/:userId", auth, role(["tenant_admin"]), userController.deleteUser);

module.exports = router;
