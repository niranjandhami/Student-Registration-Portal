import api from "./api";

export const registerStudent = (data) => api.post("/auth/register", data).then((r) => r.data);

export const loginStudent = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const loginAdmin = (email, password) =>
  api.post("/auth/admin/login", { email, password }).then((r) => r.data);

export const fetchMe = () => api.get("/auth/me").then((r) => r.data);
