const pool = require("../config/db");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const { tenantId } = req.user;

  // Check project count
  const countRes = await pool.query(
    "SELECT COUNT(*) FROM projects WHERE tenant_id = $1",
    [tenantId]
  );

  const tenantRes = await pool.query(
    "SELECT max_projects FROM tenants WHERE id = $1",
    [tenantId]
  );

  if (!tenantRes.rows.length) {
    return res.status(404).json({ success: false, message: "Tenant not found" });
  }

  if (parseInt(countRes.rows[0].count) >= tenantRes.rows[0].max_projects) {
    return res.status(403).json({ success: false, message: "Project limit reached" });
  }

  const result = await pool.query(
    `INSERT INTO projects (tenant_id, name, description)
     VALUES ($1, $2, $3)
     RETURNING id, name, description, created_at`,
    [tenantId, name, description]
  );

  res.status(201).json({ success: true, data: result.rows[0] });
};

exports.listProjects = async (req, res) => {
  const { tenantId } = req.user;

  const result = await pool.query(
    `SELECT p.id, p.name, p.description, p.created_at,
      (SELECT COUNT(*) FROM tasks t WHERE t.project_id = p.id) AS task_count
     FROM projects p
     WHERE p.tenant_id = $1
     ORDER BY p.created_at DESC`,
    [tenantId]
  );

  res.json({ success: true, data: result.rows });
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  const result = await pool.query(
    `UPDATE projects
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         updated_at = NOW()
     WHERE id = $3
     RETURNING id, name, description`,
    [name, description, projectId]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.json({ success: true, data: result.rows[0] });
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  const result = await pool.query(
    "DELETE FROM projects WHERE id = $1",
    [projectId]
  );

  if (!result.rowCount) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  res.json({ success: true, message: "Project deleted" });
};