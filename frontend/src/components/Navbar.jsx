import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
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
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#16233F" />
            <path d="M14 26 L32 16 L50 26 L32 36 Z" fill="#C9A227" />
            <rect x="20" y="34" width="24" height="4" fill="#C9A227" />
            <rect x="30" y="26" width="2" height="18" fill="#C9A227" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>Enrolla</span>
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        <>
          <nav className="nav-links desktop-nav">
            {user?.role === "student" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile/edit">Edit profile</Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link to="/admin/dashboard">Overview</Link>
                <Link to="/admin/students">Students</Link>
              </>
            )}

            {user ? (
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <Link to="/login">Student login</Link>
                <Link to="/register" className="btn btn-gold btn-sm">
                  Register
                </Link>
              </>
            )}
          </nav>

          <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            {user?.role === "student" && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/profile/edit" onClick={() => setMenuOpen(false)}>Edit Profile</Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Overview</Link>
                <Link to="/admin/students" onClick={() => setMenuOpen(false)}>Students</Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>

                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>

                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Student Login
                </Link>

                <hr style={{ border: "0", borderTop: "1px solid var(--line)" }} />

                <p className="menu-title">
                  Administration
                </p>

                <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
                  Admin Login
                </Link>
              </>
            )}

            {user && (
              <button className="btn btn-gold" onClick={handleLogout}>
                Log out
              </button>
            )}
          </div>
        </>
      </div>
    </header>
  );
}