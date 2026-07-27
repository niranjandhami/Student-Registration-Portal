import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(user?.role === "admin" ? "/admin/login" : "/login");
  };

  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--parchment)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#16233F" />
            <path d="M14 26 L32 16 L50 26 L32 36 Z" fill="#C9A227" />
            <rect x="20" y="34" width="24" height="4" fill="#C9A227" />
            <rect x="30" y="26" width="2" height="18" fill="#C9A227" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>Enrolla</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {user?.role === "student" && (
            <>
              <Link to="/dashboard" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--slate)" }}>
                Dashboard
              </Link>
              <Link to="/profile/edit" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--slate)" }}>
                Edit profile
              </Link>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--slate)" }}>
                Overview
              </Link>
              <Link to="/admin/students" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--slate)" }}>
                Students
              </Link>
            </>
          )}
          {user ? (
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--slate)" }}>
                Student login
              </Link>
              <Link to="/register" className="btn btn-gold btn-sm">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
