import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";
import Banner from "../components/Banner.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { token, user } = await loginStudent(email, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 440, padding: "80px 24px" }}>
      <h1 style={{ fontSize: 30 }}>Welcome back</h1>
      <p style={{ marginTop: 8, color: "var(--slate)", fontSize: 14.5 }}>
        New here? <Link to="/register" style={{ color: "var(--navy)", fontWeight: 700 }}>Create a student record</Link>.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
        <Banner type="error">{error}</Banner>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? "Signing in…" : "Log in"}
        </button>
      </form>

      <Link to="/admin/login" style={{ display: "block", textAlign: "center", marginTop: 20, fontSize: 13.5, color: "var(--slate)", fontWeight: 600 }}>
        Administrator? Sign in here →
      </Link>
    </div>
  );
}
