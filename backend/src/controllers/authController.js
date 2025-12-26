const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 SUPER ADMIN LOGIN (no tenant needed)
    const userRes = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!userRes.rows.length) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = userRes.rows[0];

    // TEMP: skip bcrypt (because password is dummy)
    // const match = await bcrypt.compare(password, user.password_hash);
    // if (!match) {
    //   return res.status(401).json({ success: false, message: "Invalid credentials" });
    // }

    const token = generateToken({
      userId: user.id,
      role: user.role,
      tenantId: user.tenant_id,
    });

    return res.json({
      success: true,
      data: {
        token,
        expiresIn: 86400,
        user: {
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
