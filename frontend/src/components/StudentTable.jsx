import React from "react";
import { Link } from "react-router-dom";

export default function StudentTable({ students, onDelete }) {
  if (!students.length) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px 24px", color: "var(--slate)" }}>
        <p style={{ fontWeight: 600 }}>No students to show</p>
        <p style={{ fontSize: 13.5, marginTop: 6 }}>Try a different search, or check back once students register.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--parchment-2)", textAlign: "left" }}>
              {["Roll No.", "Name", "Email", "Course", "Year", "Status", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "13px 18px",
                    fontSize: 11.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--slate)",
                    fontWeight: 700,
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td className="mono" style={{ padding: "14px 18px", fontWeight: 600 }}>
                  {s.rollNumber}
                </td>
                <td style={{ padding: "14px 18px", fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: "14px 18px", color: "var(--slate)" }}>{s.email}</td>
                <td style={{ padding: "14px 18px", color: "var(--slate)" }}>{s.course || "—"}</td>
                <td style={{ padding: "14px 18px", color: "var(--slate)" }}>{s.yearOfStudy || "—"}</td>
                <td style={{ padding: "14px 18px" }}>
                  <span className={`badge badge-${s.status}`}>{s.status}</span>
                </td>
                <td style={{ padding: "14px 18px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <Link to={`/admin/students/${s._id}`} className="btn btn-ghost btn-sm" style={{ marginRight: 8 }}>
                    Manage
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(s)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
