import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "./Loader.jsx";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();


  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}