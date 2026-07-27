import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";
import Banner from "../components/Banner.jsx";

const initialForm = {
  rollNumber: "",
  name: "",
  email: "",
  password: "",
  course: "",
  department: "",
  yearOfStudy: 1,
  phone: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { token, user } = await registerStudent(form);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 560, padding: "56px 24px 80px" }}>
      <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        New student
      </p>
      <h1 style={{ fontSize: 32, marginTop: 8 }}>Create your record</h1>
      <p style={{ marginTop: 8, color: "var(--slate)", fontSize: 14.5 }}>
        Already registered? <Link to="/login" style={{ color: "var(--navy)", fontWeight: 700 }}>Log in instead</Link>.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 28 }}>
        <Banner type="error">{error}</Banner>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label htmlFor="rollNumber">Roll number</label>
            <input id="rollNumber" required value={form.rollNumber} onChange={update("rollNumber")} placeholder="CS2026-0142" />
          </div>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" required value={form.name} onChange={update("name")} placeholder="Amara Osei" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={form.email} onChange={update("email")} placeholder="you@campus.edu" />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required minLength={6} value={form.password} onChange={update("password")} placeholder="At least 6 characters" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label htmlFor="course">Course</label>
            <input id="course" value={form.course} onChange={update("course")} placeholder="B.Sc. Computer Science" />
          </div>
          <div className="field">
            <label htmlFor="department">Department</label>
            <input id="department" value={form.department} onChange={update("department")} placeholder="Engineering" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label htmlFor="yearOfStudy">Year of study</label>
            <select id="yearOfStudy" value={form.yearOfStudy} onChange={update("yearOfStudy")}>
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" value={form.phone} onChange={update("phone")} placeholder="Optional" />
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%", marginTop: 6 }}>
          {submitting ? "Creating your record…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
