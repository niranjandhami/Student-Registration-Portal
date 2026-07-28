import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p style={{ color: "var(--gold-soft)", fontWeight: 700, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Registration &amp; Records
            </p>
            <h1 className="hero-title">
              One record, from enrollment to graduation.
            </h1>
            <p className="hero-text">
              Enrolla gives every student a single, verified profile — and gives your registrar's office
              a fast, searchable roster to manage it.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-gold">
                Register as a student
              </Link>
              <Link to="/login" className="btn btn-ghost" style={{ borderColor: "rgba(247,245,239,0.3)", color: "var(--parchment)" }}>
                Student login
              </Link>
            </div>
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

      <Footer />
    </div>
  );
}