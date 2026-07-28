import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, updateMyProfile, changeMyPassword } from "../services/studentService";
import Loader from "../components/Loader.jsx";
import Banner from "../components/Banner.jsx";

export default function EditProfile() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    getMyProfile()
      .then(({ student }) =>
        setForm({
          name: student.name,
          phone: student.phone || "",
          course: student.course || "",
          department: student.department || "",
          yearOfStudy: student.yearOfStudy || 1,
          address: student.address || "",
          dob: student.dob ? student.dob.slice(0, 10) : "",
        })
      )
      .catch((err) => setError(err.response?.data?.message || "Could not load your profile."))
      .finally(() => setLoading(false));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await updateMyProfile(form);
      setSuccess("Profile updated.");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");
    setPwSaving(true);
    try {
      await changeMyPassword(pwForm);
      setPwSuccess("Password updated.");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwError(err.response?.data?.message || "Could not update password.");
    } finally {
      setPwSaving(false);
    }
  };

  if (loading || !form) return <Loader label="Loading your profile" />;

  return (
    <div className="container" style={{ maxWidth: 640, padding: "44px 24px 80px" }}>
      <h1 style={{ fontSize: 28 }}>Edit profile</h1>
      <p style={{ marginTop: 6, color: "var(--slate)", fontSize: 14.5 }}>Roll number and email are managed by the registrar's office.</p>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
        <Banner type="error">{error}</Banner>
        <Banner type="success">{success}</Banner>

        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" required value={form.name} onChange={update("name")} />
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label htmlFor="yearOfStudy">Year of study</label>
            <select id="yearOfStudy" value={form.yearOfStudy} onChange={update("yearOfStudy")}>
              {[1, 2, 3, 4].map((y) => (
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
        </div>

        <div className="field">
          <label htmlFor="dob">Date of birth</label>
          <input id="dob" type="date" value={form.dob} onChange={update("dob")} />
        </div>

        <div className="field">
          <label htmlFor="address">Address</label>
          <textarea id="address" rows={3} value={form.address} onChange={update("address")} />
        </div>

        <button className="btn btn-primary" type="submit" disabled={saving} style={{ width: "100%" }}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="card" style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 16 }}>Change password</h3>
        <div style={{ marginTop: 16 }}>
          <Banner type="error">{pwError}</Banner>
          <Banner type="success">{pwSuccess}</Banner>
        </div>
        <div className="field">
          <label htmlFor="currentPassword">Current password</label>
          <input
            id="currentPassword"
            type="password"
            required
            value={pwForm.currentPassword}
            onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor="newPassword">New password</label>
          <input
            id="newPassword"
            type="password"
            required
            minLength={6}
            value={pwForm.newPassword}
            onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
          />
        </div>
        <button className="btn btn-ghost" type="submit" disabled={pwSaving}>
          {pwSaving ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}