const bcrypt = require("bcrypt");
const pool = require("../config/db");

(async () => {
  const hash = await bcrypt.hash("Admin@123", 10);

  await pool.query(
    "INSERT INTO users (id, tenant_id, email, password_hash, full_name, role) VALUES (gen_random_uuid(), NULL, 'superadmin@system.com', , 'Super Admin', 'super_admin')",
    [hash]
  );

  console.log("Seeded super admin");
  process.exit(0);
})();
