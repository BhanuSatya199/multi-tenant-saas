import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then(res => setProjects(res.data.data))
      .catch(() => alert("Failed to load projects"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      {projects.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}

