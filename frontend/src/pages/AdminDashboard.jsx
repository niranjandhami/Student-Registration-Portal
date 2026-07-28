import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSummary } from "../services/studentService";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getSummary()
      .then(({ summary }) => setSummary(summary))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading overview" />;

  const stats = [
    { label: "Total students", value: summary?.total ?? 0, tone: "navy" },
    { label: "Active", value: summary?.active ?? 0, tone: "success" },
    { label: "Suspended", value: summary?.suspended ?? 0, tone: "danger" },
    { label: "Graduated", value: summary?.graduated ?? 0, tone: "gold" },
  ];

  return (
    <div className="container dashboard-container">
      <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Registrar overview
      </p>
      <h1 style={{ fontSize: 30, marginTop: 8 }}>Welcome, {user?.username}</h1>

      <div className="dashboard-stats">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--slate)", fontWeight: 700 }}>
              {s.label}
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, marginTop: 8 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card dashboard-action">
        <div>
          <h3 style={{ fontSize: 17 }}>Manage the roster</h3>
          <p style={{ marginTop: 6, color: "var(--slate)", fontSize: 14 }}>Search, review, and update any student's record.</p>
        </div>
        <Link to="/admin/students" className="btn btn-primary">
          View all students
        </Link>
      </div>
    </div>
  );
}