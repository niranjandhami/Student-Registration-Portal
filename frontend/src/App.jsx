import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminStudents from "./pages/AdminStudents.jsx";
import AdminStudentDetail from "./pages/AdminStudentDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute role="student">
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminStudentDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
