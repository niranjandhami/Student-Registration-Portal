import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="container form-card" style={{ padding: "56px 24px 80px" }}>
      <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        New student
      </p>
      <h1 style={{ fontSize: 32, marginTop: 8 }}>Create your record</h1>
      <p style={{ marginTop: 8, color: "var(--slate)", fontSize: 14.5 }}>
        Already registered? <Link to="/login" style={{ color: "var(--navy)", fontWeight: 700 }}>Log in instead</Link>.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 28 }}>
        <Banner type="error">{error}</Banner>

        <div className="form-grid">
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

  <div style={{ position: "relative", width: "100%" }}>
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      required
      minLength={6}
      value={form.password}
      onChange={update("password")}
      placeholder="At least 6 characters"
      style={{
        width: "100%",
        padding: "11px 48px 11px 13px",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-sm)",
        background: "var(--white)",
        color: "var(--ink)",
        boxSizing: "border-box",
      }}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      style={{
        position: "absolute",
        top: "50%",
        right: "14px",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#666",
      }}
    >
      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
    </button>
  </div>
</div>
        <div className="form-grid">
         <div className="field">
  <label htmlFor="course">Course</label>
  <select
    id="course"
    value={form.course}
    onChange={update("course")}
    required
  >
    <option value="">Select Course</option>
    <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
    <option value="B.Sc. Information Technology">B.Sc. Information Technology</option>
    <option value="B.Sc. Software Engineering">B.Sc. Software Engineering</option>
    <option value="B.Sc. Cyber Security">B.Sc. Cyber Security</option>
    <option value="B.Sc. Data Science">B.Sc. Data Science</option>
  </select>
</div>
         <div className="field">
  <label htmlFor="department">Department</label>
  <select
    id="department"
    value={form.department}
    onChange={update("department")}
    required
  >
    <option value="">Select Department</option>
    <option value="Engineering">Engineering</option>
    <option value="Computing & Information Sciences">Computing & Information Sciences</option>
    <option value="Business Administration">Business Administration</option>
    <option value="Natural Sciences">Natural Sciences</option>
    <option value="Arts & Humanities">Arts & Humanities</option>
  </select>
</div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="yearOfStudy">Year of study</label>
            <select id="yearOfStudy" value={form.yearOfStudy} onChange={update("yearOfStudy")}>
             {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
  id="phone"
  type="tel"
  inputMode="numeric"
  pattern="[0-9]{10}"
  maxLength={10}
  value={form.phone}
  onChange={(e) =>
    setForm((f) => ({
      ...f,
      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
    }))
  }
  placeholder="1234567890"
/>
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%", marginTop: 6 }}>
          {submitting ? "Creating your record…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
