import api from "./api";

// Student self-service
export const getMyProfile = () => api.get("/students/me").then((r) => r.data);
export const updateMyProfile = (data) => api.put("/students/me", data).then((r) => r.data);
export const changeMyPassword = (data) => api.put("/students/me/password", data).then((r) => r.data);

// Admin management
export const getAllStudents = (page = 1, limit = 10) =>
  api.get("/students", { params: { page, limit } }).then((r) => r.data);

export const searchStudents = (q) => api.get("/students/search", { params: { q } }).then((r) => r.data);

export const getStudentById = (id) => api.get(`/students/${id}`).then((r) => r.data);

export const updateStudent = (id, data) => api.put(`/students/${id}`, data).then((r) => r.data);

export const deleteStudent = (id) => api.delete(`/students/${id}`).then((r) => r.data);

export const getSummary = () => api.get("/students/stats/summary").then((r) => r.data);
