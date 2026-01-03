import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Details</h2>
      <p>Project ID: {projectId}</p>
    </div>
  );
};

export default ProjectDetails;
