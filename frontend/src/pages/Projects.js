import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then(res => setProjects(res.data.data.projects || []))
      .catch(() => alert("Failed to load projects"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>

      {projects.map(p => (
        <div key={p.id}>
          <Link to={`/projects/${p.id}`}>{p.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Projects;
