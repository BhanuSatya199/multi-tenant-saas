import React, { useState } from "react";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantSubdomain, setTenantSubdomain] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
        tenantSubdomain,
      });

      localStorage.setItem("token", res.data.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Tenant Subdomain"
        value={tenantSubdomain}
        onChange={(e) => setTenantSubdomain(e.target.value)}
      />

      <button onClick={submit}>Login</button>
    </div>
  );
}
