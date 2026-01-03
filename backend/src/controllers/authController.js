const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwtUtils = require("../utils/jwt");

exports.login = async (req, res) => {
  try {
    const { email, password, tenantSubdomain } = req.body;

    if (!email || !password || !tenantSubdomain) {
      return res.status(400).json({
        success: false,
        message: "Email, password and tenant subdomain are required",
      });
    }

    // Tenant
    const tenantRes = await db.query(
      "SELECT id FROM tenants WHERE subdomain = $1",
      [tenantSubdomain]
    );

    if (tenantRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    const tenantId = tenantRes.rows[0].id;

    // User
    const userRes = await db.query(
      "SELECT * FROM users WHERE email = $1 AND tenant_id = $2",
      [email, tenantId]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = userRes.rows[0];

    // Password check
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT (🔥 FIX HERE)
    const token = jwtUtils.generateToken({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role,
    });

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          tenantId: user.tenant_id,
        },
        token,
        expiresIn: 86400,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
