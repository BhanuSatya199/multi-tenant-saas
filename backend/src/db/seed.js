const db = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = async () => {
  console.log("🌱 Seeding database...");

  const adminHash = await bcrypt.hash("Admin@123", 10);
  const demoHash = await bcrypt.hash("Demo@123", 10);
  const userHash = await bcrypt.hash("User@123", 10);

  // ================= SUPER ADMIN =================
  await db.query(
    `
    INSERT INTO users (email, password_hash, full_name, role)
    VALUES ('superadmin@system.com', $1, 'Super Admin', 'super_admin')
    ON CONFLICT (email) DO NOTHING
    `,
    [adminHash]
  );

  // ================= TENANT =================
  let tenantId;
  const tenantRes = await db.query(
    `SELECT id FROM tenants WHERE subdomain = 'demo'`
  );

  if (tenantRes.rows.length === 0) {
    const tenantInsert = await db.query(
      `
      INSERT INTO tenants (name, subdomain, subscription_plan, max_users, max_projects)
      VALUES ('Demo Company', 'demo', 'pro', 25, 15)
      RETURNING id
      `
    );
    tenantId = tenantInsert.rows[0].id;
  } else {
    tenantId = tenantRes.rows[0].id;
  }

  // ================= TENANT ADMIN =================
  let adminId;
  const adminRes = await db.query(
    `
    SELECT id FROM users
    WHERE email = 'admin@demo.com' AND tenant_id = $1
    `,
    [tenantId]
  );

  if (adminRes.rows.length === 0) {
    const adminInsert = await db.query(
      `
      INSERT INTO users (tenant_id, email, password_hash, full_name, role)
      VALUES ($1, 'admin@demo.com', $2, 'Demo Admin', 'tenant_admin')
      RETURNING id
      `,
      [tenantId, demoHash]
    );
    adminId = adminInsert.rows[0].id;
  } else {
    adminId = adminRes.rows[0].id;
  }

  // ================= REGULAR USER =================
  let userId;
  const userRes = await db.query(
    `
    SELECT id FROM users
    WHERE email = 'user1@demo.com' AND tenant_id = $1
    `,
    [tenantId]
  );

  if (userRes.rows.length === 0) {
    const userInsert = await db.query(
      `
      INSERT INTO users (tenant_id, email, password_hash, full_name, role)
      VALUES ($1, 'user1@demo.com', $2, 'User One', 'user')
      RETURNING id
      `,
      [tenantId, userHash]
    );
    userId = userInsert.rows[0].id;
  } else {
    userId = userRes.rows[0].id;
  }

  // ================= PROJECT =================
  let projectId;
  const projectRes = await db.query(
    `
    SELECT id FROM projects
    WHERE name = 'Project Alpha' AND tenant_id = $1
    `,
    [tenantId]
  );

  if (projectRes.rows.length === 0) {
    const projectInsert = await db.query(
      `
      INSERT INTO projects (tenant_id, name, created_by)
      VALUES ($1, 'Project Alpha', $2)
      RETURNING id
      `,
      [tenantId, adminId]
    );
    projectId = projectInsert.rows[0].id;
  } else {
    projectId = projectRes.rows[0].id;
  }

  // ================= TASK =================
  const taskRes = await db.query(
    `
    SELECT id FROM tasks
    WHERE title = 'Initial Task' AND project_id = $1
    `,
    [projectId]
  );

  if (taskRes.rows.length === 0) {
  await db.query(
  `
  INSERT INTO users (email, password_hash, full_name, role)
  VALUES ('superadmin@system.com', $1, 'Super Admin', 'super_admin')
  ON CONFLICT DO NOTHING
  `,
  [adminHash]
);

  }

  console.log("✅ Seeding completed safely");
};
