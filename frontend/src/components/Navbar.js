import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: 10, background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/projects">Projects</Link> |{" "}
      <Link to="/users">Users</Link>
    </div>
  );
}
