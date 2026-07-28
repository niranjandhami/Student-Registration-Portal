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

// Skeleton block — a gray placeholder shape that pulses while content loads.
// Pass width/height/radius to match whatever it's standing in for.
export function SkeletonBlock({ width = "100%", height = 16, radius = 6, style = {} }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, var(--parchment-2) 25%, rgba(15,23,41,0.06) 50%, var(--parchment-2) 75%)",
        backgroundSize: "200% 100%",
        animation: "srp-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

// Full skeleton layout that mirrors the Student Dashboard's shape:
// an ID card on the left, a details card on the right.
export function DashboardSkeleton() {
  return (
    <div className="container dashboard-container">
      <SkeletonBlock width={140} height={12} style={{ marginBottom: 12 }} />
      <SkeletonBlock width={280} height={30} style={{ marginBottom: 28 }} />

      <div className="dashboard-grid">
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, var(--navy) 0%, var(--ink) 100%)",
          }}
        >
          <SkeletonBlock width={120} height={10} style={{ marginBottom: 10, opacity: 0.3 }} />
          <SkeletonBlock width={90} height={10} style={{ marginBottom: 24, opacity: 0.3 }} />
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <SkeletonBlock width={72} height={72} radius={999} style={{ opacity: 0.3 }} />
            <div style={{ flex: 1 }}>
              <SkeletonBlock width="70%" height={18} style={{ marginBottom: 8, opacity: 0.3 }} />
              <SkeletonBlock width="50%" height={12} style={{ opacity: 0.3 }} />
            </div>
          </div>
        </div>

        <div className="card">
          <SkeletonBlock width={140} height={16} style={{ marginBottom: 20 }} />
          <div className="profile-details">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <SkeletonBlock width={70} height={10} style={{ marginBottom: 8 }} />
                <SkeletonBlock width="80%" height={14} />
              </div>
            ))}
          </div>
          <SkeletonBlock width={140} height={40} style={{ marginTop: 26 }} />
        </div>
      </div>

      <style>{`
        @keyframes srp-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}