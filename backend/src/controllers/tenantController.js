const pool = require("../config/db");
const bcrypt = require("bcrypt");

exports.registerTenant = async (req, res) => {
  const { tenantName, subdomain, adminEmail, adminPassword, adminFullName } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // create tenant
    const tenantRes = await client.query(
      "INSERT INTO tenants (name, subdomain) VALUES ($1, $2) RETURNING *",
      [tenantName, subdomain]
    );

    const tenant = tenantRes.rows[0];

    // create tenant admin
    const hash = await bcrypt.hash(adminPassword, 10);
    const adminRes = await client.query(
      "INSERT INTO users (tenant_id, email, password_hash, name, role) VALUES ($1,$2,$3,$4,'tenant_admin') RETURNING id,email,name,role",
      [tenant.id, adminEmail, hash, adminFullName]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Tenant registered successfully",
      data: {
        tenantId: tenant.id,
        subdomain: tenant.subdomain,
        adminUser: adminRes.rows[0],
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(409).json({
      success: false,
      message: "Tenant or email already exists",
    });
  } finally {
    client.release();
  }
};

exports.getTenant = async (req, res) => {
  const { tenantId } = req.params;

  const result = await pool.query(
    "SELECT id,name,subdomain,status,subscription_plan,max_users,max_projects,created_at FROM tenants WHERE id=$1",
    [tenantId]
  );

  if (!result.rows.length) {
    return res.status(404).json({ success: false, message: "Tenant not found" });
  }

  res.json({ success: true, data: result.rows[0] });
};
