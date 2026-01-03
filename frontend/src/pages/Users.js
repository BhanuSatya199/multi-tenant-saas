import React, { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/tenants/me/users")
      .then(res => setUsers(res.data.data.users || []))
      .catch(() => alert("Failed to load users"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      {users.map(u => (
        <div key={u.id}>{u.fullName} ({u.role})</div>
      ))}
    </div>
  );
};

export default Users;
