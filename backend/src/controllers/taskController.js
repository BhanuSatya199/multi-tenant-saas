const pool = require("../config/db");
exports.createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, priority = "medium" } = req.body;
  const projectRes = await pool.query(
    "SELECT tenant_id FROM projects WHERE id = $1",
    [projectId]
  );

  if (!projectRes.rows.length) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  const tenantId = projectRes.rows[0].tenant_id;

  const result = await pool.query(
    `INSERT INTO tasks (project_id, tenant_id, title, description, priority)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, priority, status, created_at`,
    [projectId, tenantId, title, description, priority]
  );
  res.status(201).json({ success: true, data: result.rows[0] });
};
exports.listTasks = async (req, res) => {
  const { projectId } = req.params;

  const result = await pool.query(
    `SELECT id, title, description, priority, status, created_at
     FROM tasks
     WHERE project_id = $1
     ORDER BY created_at DESC`,
    [projectId]
  );
  res.json({ success: true, data: result.rows });
};
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, status } = req.body;

  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         priority = COALESCE($3, priority),
         status = COALESCE($4, status),
         updated_at = NOW()
     WHERE id = $5
     RETURNING id, title, priority, status`,
    [title, description, priority, status, taskId]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: result.rows[0] });
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status",
    [status, taskId]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: result.rows[0] });
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [taskId]
  );

  if (!result.rowCount) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, message: "Task deleted" });
};
