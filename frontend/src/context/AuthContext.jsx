import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchMe } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("srp_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("srp_token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem("srp_user", JSON.stringify(user));
      })
      .catch(() => {
        localStorage.removeItem("srp_token");
        localStorage.removeItem("srp_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem("srp_token", token);
    localStorage.setItem("srp_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("srp_token");
    localStorage.removeItem("srp_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
