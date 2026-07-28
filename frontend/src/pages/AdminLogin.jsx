import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";
import Banner from "../components/Banner.jsx";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { token, user } = await loginAdmin(email, password);
      login(token, user);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 68px)",
        background: "var(--ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <p style={{ color: "var(--gold-soft)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", textAlign: "center" }}>
          Registrar's office
        </p>
        <h1 style={{ color: "var(--parchment)", fontSize: 28, marginTop: 8, textAlign: "center" }}>Administrator sign in</h1>

        <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
          <Banner type="error">{error}</Banner>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
    <div className="field">
  <label htmlFor="password">Password</label>

  <div style={{ position: "relative", width: "100%" }}>
    <input
  id="password"
  type={showPassword ? "text" : "password"}
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    width: "100%",
    paddingRight: "48px",
    boxSizing: "border-box",
  }}
/>

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
  position: "absolute",
  top: "50%",
  right: "14px",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666",
}}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>
          <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%" }}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link to="/login" style={{ display: "block", textAlign: "center", marginTop: 18, fontSize: 13.5, color: "rgba(247,245,239,0.6)", fontWeight: 600 }}>
          ← Student login
        </Link>
      </div>
    </div>
  );
}
