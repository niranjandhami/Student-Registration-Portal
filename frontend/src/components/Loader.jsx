import React from "react";

export default function Loader({ label = "Loading" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "80px 20px",
        color: "var(--slate)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "3px solid var(--line)",
          borderTopColor: "var(--gold)",
          animation: "srp-spin 0.8s linear infinite",
        }}
      />
      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{label}…</span>
      <style>{`@keyframes srp-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
