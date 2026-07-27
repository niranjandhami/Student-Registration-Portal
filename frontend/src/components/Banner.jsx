import React from "react";

export default function Banner({ type = "error", children }) {
  if (!children) return null;
  const styles = {
    error: { bg: "rgba(192,68,58,0.08)", color: "var(--danger)", border: "rgba(192,68,58,0.25)" },
    success: { bg: "rgba(47,158,104,0.08)", color: "var(--success)", border: "rgba(47,158,104,0.25)" },
  }[type];

  return (
    <div
      role="status"
      style={{
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: "var(--radius-sm)",
        padding: "11px 14px",
        fontSize: 13.5,
        fontWeight: 600,
        marginBottom: 18,
      }}
    >
      {children}
    </div>
  );
}
