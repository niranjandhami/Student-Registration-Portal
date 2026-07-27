import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(180deg, var(--navy) 0%, var(--ink) 100%)",
          color: "var(--parchment)",
          padding: "88px 0 96px",
        }}
      >
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--gold-soft)", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Registration &amp; Records
            </p>
            <h1 style={{ color: "var(--parchment)", fontSize: 46, lineHeight: 1.12, marginTop: 14, maxWidth: 560 }}>
              One record, from enrollment to graduation.
            </h1>
            <p style={{ marginTop: 18, fontSize: 16.5, color: "rgba(247,245,239,0.75)", maxWidth: 480, lineHeight: 1.6 }}>
              Enrolla gives every student a single, verified profile — and gives your registrar's office
              a fast, searchable roster to manage it.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
              <Link to="/register" className="btn btn-gold">
                Register as a student
              </Link>
              <Link to="/login" className="btn btn-ghost" style={{ borderColor: "rgba(247,245,239,0.3)", color: "var(--parchment)" }}>
                Student login
              </Link>
            </div>
            <Link
              to="/admin/login"
              style={{ display: "inline-block", marginTop: 22, fontSize: 13.5, color: "rgba(247,245,239,0.55)", fontWeight: 600 }}
            >
              Administrator sign in →
            </Link>
          </div>

          <div
            aria-hidden="true"
            style={{
              background: "linear-gradient(135deg, rgba(201,162,39,0.14), rgba(201,162,39,0.02))",
              border: "1px solid rgba(247,245,239,0.12)",
              borderRadius: "var(--radius-lg)",
              padding: 32,
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} style={{ width: 3, height: [16, 26, 20, 30, 14, 24][i % 6], background: "rgba(201,162,39,0.5)" }} />
              ))}
            </div>
            <p className="mono" style={{ fontSize: 12.5, color: "var(--gold-soft)" }}>ROLL NO. — CS2026-0142</p>
            <h3 style={{ color: "var(--parchment)", fontSize: 22, marginTop: 8 }}>Amara Osei</h3>
            <p style={{ fontSize: 13.5, color: "rgba(247,245,239,0.6)", marginTop: 4 }}>B.Sc. Computer Science · Year 3</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "72px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "Self-service registration", body: "Students register and keep their own profile current, with instant validation and no paperwork." },
            { title: "Searchable roster", body: "The registrar's office finds any student by name, roll number, or course in a keystroke." },
            { title: "Role-based access", body: "Students see and edit only their own record; administrators get the full, auditable roster." },
          ].map((f) => (
            <div key={f.title} className="card">
              <h3 style={{ fontSize: 18 }}>{f.title}</h3>
              <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--slate)", lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
