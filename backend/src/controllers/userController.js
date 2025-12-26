const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  const { tenantId } = req.params;
  const { email, password, fullName, role = "user" } = req.body;

  // Check user count
  const countRes = await pool.query(
    "SELECT COUNT(*) FROM users WHERE tenant_id = $1",
    [tenantId]
  );

  const tenantRes = await pool.query(
    "SELECT max_users FROM tenants WHERE id = $1",
    [tenantId]
  );

  if (!tenantRes.rows.length) {
    return res.status(404).json({ success: false, message: "Tenant not found" });
  }

  if (parseInt(countRes.rows[0].count) >= tenantRes.rows[0].max_users) {
    return res.status(403).json({ success: false, message: "User limit reached" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (tenant_id, name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, created_at`,
      [tenantId, fullName, email, hash, role]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(409).json({ success: false, message: "Email already exists" });
  }
};

exports.listUsers = async (req, res) => {
  const { tenantId } = req.params;

  const result = await pool.query(
    `SELECT id, name, email, role, created_at
     FROM users
     WHERE tenant_id = $1
     ORDER BY created_at DESC`,
    [tenantId]
  );

  res.json({ success: true, data: result.rows });
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { fullName, role } = req.body;

  const result = await pool.query(
    `UPDATE users
     SET name = COALESCE($1, name),
         role = COALESCE($2, role),
         updated_at = NOW()
     WHERE id = $3
     RETURNING id, name, email, role`,
    [fullName, role, userId]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: result.rows[0] });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query(
    "DELETE FROM users WHERE id = $1",
    [userId]
  );

  if (!result.rowCount) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User deleted" });
};
