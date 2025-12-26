const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController");

router.post("/projects/:projectId/tasks", auth, taskController.createTask);
router.get("/projects/:projectId/tasks", auth, taskController.listTasks);
router.put("/tasks/:taskId", auth, taskController.updateTask);
router.patch("/tasks/:taskId/status", auth, taskController.updateTaskStatus);
router.delete("/tasks/:taskId", auth, taskController.deleteTask);

module.exports = router;