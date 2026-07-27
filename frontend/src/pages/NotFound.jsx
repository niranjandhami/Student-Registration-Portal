import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "120px 24px" }}>
      <p className="mono" style={{ color: "var(--gold)", fontWeight: 700 }}>404</p>
      <h1 style={{ fontSize: 28, marginTop: 10 }}>This page isn't on record.</h1>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
        Return home
      </Link>
    </div>
  );
}
