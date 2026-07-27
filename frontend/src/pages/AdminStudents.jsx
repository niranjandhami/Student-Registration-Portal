import React, { useEffect, useState, useCallback } from "react";
import { getAllStudents, searchStudents, deleteStudent } from "../services/studentService";
import StudentTable from "../components/StudentTable.jsx";
import Loader from "../components/Loader.jsx";
import Banner from "../components/Banner.jsx";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async (currentPage, q) => {
    setLoading(true);
    setError("");
    try {
      if (q.trim()) {
        const { students } = await searchStudents(q.trim());
        setStudents(students);
        setPagination(null);
      } else {
        const { students, pagination } = await getAllStudents(currentPage, 10);
        setStudents(students);
        setPagination(pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    load(1, query);
  };

  const handleDelete = async (student) => {
    if (!window.confirm(`Remove ${student.name} (${student.rollNumber}) from the roster? This cannot be undone.`)) return;
    try {
      await deleteStudent(student._id);
      setNotice(`${student.name} was removed.`);
      load(page, query);
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete student.");
    }
  };

  return (
    <div className="container" style={{ padding: "44px 24px 80px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Roster
          </p>
          <h1 style={{ fontSize: 28, marginTop: 8 }}>All students</h1>
        </div>

        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 10 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, roll number, course…"
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              width: 280,
              background: "var(--white)",
            }}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            Search
          </button>
          {query && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setQuery("");
                setPage(1);
                load(1, "");
              }}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div style={{ marginTop: 24 }}>
        <Banner type="error">{error}</Banner>
        <Banner type="success">{notice}</Banner>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentTable students={students} onDelete={handleDelete} />

          {pagination && pagination.totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
              <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                ← Previous
              </button>
              <span style={{ alignSelf: "center", fontSize: 13.5, color: "var(--slate)", fontWeight: 600 }}>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-ghost btn-sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
