import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getStudentById, updateStudent, deleteStudent } from "../services/studentService";
import StudentIdCard from "../components/StudentIdCard.jsx";
import Loader from "../components/Loader.jsx";
import Banner from "../components/Banner.jsx";

export default function AdminStudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getStudentById(id)
      .then(({ student }) => {
        setStudent(student);
        setForm({
          name: student.name,
          email: student.email,
          rollNumber: student.rollNumber,
          course: student.course || "",
          department: student.department || "",
          yearOfStudy: student.yearOfStudy || 1,
          phone: student.phone || "",
          address: student.address || "",
          status: student.status,
        });
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load student."))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const { student } = await updateStudent(id, form);
      setStudent(student);
      setSuccess("Record updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Permanently remove ${student.name} from the roster?`)) return;
    try {
      await deleteStudent(id);
      navigate("/admin/students");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete student.");
    }
  };

  if (loading) return <Loader label="Loading record" />;
  if (!student) return <Banner type="error">{error || "Student not found."}</Banner>;

  return (
    <div className="container" style={{ padding: "44px 24px 80px" }}>
      <Link to="/admin/students" style={{ fontSize: 13.5, fontWeight: 600, color: "var(--slate)" }}>
        ← Back to roster
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 28, marginTop: 20, alignItems: "start" }}>
        <StudentIdCard student={student} />

        <form onSubmit={handleSubmit} className="card">
          <h3 style={{ fontSize: 17 }}>Manage record</h3>
          <div style={{ marginTop: 16 }}>
            <Banner type="error">{error}</Banner>
            <Banner type="success">{success}</Banner>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label htmlFor="rollNumber">Roll number</label>
              <input id="rollNumber" required value={form.rollNumber} onChange={update("rollNumber")} />
            </div>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" required value={form.name} onChange={update("name")} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={form.email} onChange={update("email")} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label htmlFor="course">Course</label>
              <input id="course" value={form.course} onChange={update("course")} />
            </div>
            <div className="field">
              <label htmlFor="department">Department</label>
              <input id="department" value={form.department} onChange={update("department")} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div className="field">
              <label htmlFor="yearOfStudy">Year</label>
              <select id="yearOfStudy" value={form.yearOfStudy} onChange={update("yearOfStudy")}>
                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={update("phone")} />
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={update("status")}>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea id="address" rows={3} value={form.address} onChange={update("address")} />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button className="btn btn-danger" type="button" onClick={handleDelete}>
              Delete student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
