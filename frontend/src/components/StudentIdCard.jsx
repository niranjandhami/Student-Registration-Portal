import React from "react";

// Signature UI element: renders the student's core profile as a stylized
// campus ID card — ties the "registration" subject matter directly into
// the visual language of the dashboard.
export default function StudentIdCard({ student }) {
  if (!student) return null;

  const initials = student.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--ink) 100%)",
        borderRadius: "var(--radius-lg)",
        padding: 28,
        color: "var(--parchment)",
        boxShadow: "var(--shadow-raised)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-soft)", fontWeight: 700 }}>
            Student Registration Portal
          </p>
          <p className="mono" style={{ fontSize: 13, color: "rgba(247,245,239,0.7)", marginTop: 6 }}>
            {student.rollNumber}
          </p>
        </div>
        <span
          className={`badge badge-${student.status}`}
          style={{ background: "rgba(201,162,39,0.18)", color: "var(--gold-soft)" }}
        >
          {student.status?.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          aria-hidden="true"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 26,
            color: "var(--ink)",
            flexShrink: 0,
            border: "2px solid rgba(247,245,239,0.35)",
          }}
        >
          {initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ color: "var(--parchment)", fontSize: 21, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {student.name}
          </h3>
          <p style={{ fontSize: 13.5, color: "rgba(247,245,239,0.7)", marginTop: 3 }}>
            {student.course || "Course not set"} {student.department ? `· ${student.department}` : ""}
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(247,245,239,0.14)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          fontSize: 13,
        }}
      >
        <div>
          <p
            style={{
              color: "rgba(247,245,239,0.55)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Year
          </p>
          <p style={{ marginTop: 3, fontWeight: 600 }}>
            {student.yearOfStudy ? `Year ${student.yearOfStudy}` : "—"}
          </p>
        </div>

        <div>
          <p
            style={{
              color: "rgba(247,245,239,0.55)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Email
          </p>
          <p
            style={{
              marginTop: 3,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {student.email}
          </p>
        </div>

        <div>
          <p
            style={{
              color: "rgba(247,245,239,0.55)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Phone
          </p>
          <p style={{ marginTop: 3, fontWeight: 600 }}>
            {student.phone || "Not provided"}
          </p>
        </div>

        <div>
          <p
            style={{
              color: "rgba(247,245,239,0.55)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Course
          </p>
          <p
            style={{
              marginTop: 3,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {student.course || "Not provided"}
          </p>
        </div>
      </div>

      {/* barcode-style flourish */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 2,
          height: 26,
          alignItems: "flex-end",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: [3, 5, 4, 6, 3, 5][i % 6] * 3.6,
              background: "rgba(201,162,39,0.55)",
            }}
          />
        ))}
      </div>
    </div>
  );
}