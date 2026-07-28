import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../services/studentService";
import StudentIdCard from "../components/StudentIdCard.jsx";
import { DashboardSkeleton } from "../components/Loader.jsx";
import Banner from "../components/Banner.jsx";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(({ student }) => setStudent(student))
      .catch((err) =>
        setError(
          err.response?.data?.message || "Could not load your profile."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="container dashboard-container">
      <p
        style={{
          color: "var(--gold)",
          fontWeight: 700,
          fontSize: "12.5px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Your dashboard
      </p>

      <h1 style={{ fontSize: "30px", marginTop: 8 }}>
        Welcome, {student?.name?.split(" ")[0] || "back"}
      </h1>

      {error && <Banner type="error">{error}</Banner>}

      <div className="dashboard-grid">
        <StudentIdCard student={student} />

        <div className="card">
          <h3 style={{ fontSize: "17px" }}>Profile details</h3>

          <dl className="profile-details">
            {[
              ["Phone", student?.phone || "Not provided"],
              ["Address", student?.address || "Not provided"],
              [
                "Date of birth",
                student?.dob
                  ? new Date(student.dob).toLocaleDateString()
                  : "Not provided",
              ],
              [
                "Member since",
                student?.createdAt
                  ? new Date(student.createdAt).toLocaleDateString()
                  : "—",
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt
                  style={{
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--slate)",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </dt>

                <dd
                  style={{
                    marginTop: 4,
                    fontSize: "14.5px",
                    fontWeight: 600,
                  }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="profile-actions">
            <Link to="/profile/edit" className="btn btn-primary">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}