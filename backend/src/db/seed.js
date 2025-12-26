const pool = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = async function seed() {
  console.log("Seeding database...");

  // 1️⃣ Create tenant
  const tenantRes = await pool.query(
    `INSERT INTO tenants (name, subdomain)
     VALUES ($1, $2)
     ON CONFLICT (subdomain) DO NOTHING
     RETURNING id`,
    ["System Tenant", "demo"]
  );

  let tenantId;

  if (tenantRes.rows.length) {
    tenantId = tenantRes.rows[0].id;
  } else {
    const existingTenant = await pool.query(
      "SELECT id FROM tenants WHERE subdomain = $1",
      ["demo"]
    );
    tenantId = existingTenant.rows[0].id;
  }

  // 2️⃣ Create super admin user
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await pool.query(
    `INSERT INTO users (tenant_id, name, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING`,
    [
      tenantId,
      "Super Admin",
      "superadmin@system.com",
      passwordHash,
      "super_admin",
    ]
  );

  console.log("Seeding completed");
};
