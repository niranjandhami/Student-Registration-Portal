import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <h2 className="footer-logo">Enrolla</h2>

        <p className="footer-text">
          A modern student registration and records management system.
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} Enrolla. All rights reserved.
        </p>
      </div>
    </footer>
  );
}