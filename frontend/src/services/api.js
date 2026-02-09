import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// USERS API
export const userAPI = {
  // Get users (pagination)
  getUsers: (page = 1, limit = 10) =>
    api.get(`/users?page=${page}&limit=${limit}`),

  // Get single user (✅ REQUIRED)
  getUserById: (id) =>
    api.get(`/users/${id}`),

  // Search users
  searchUsers: (query, page = 1, limit = 10) =>
    api.get(`/users/search?query=${query}&page=${page}&limit=${limit}`),

  // Create user
  createUser: (data) =>
    api.post(`/users`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Update user
  updateUser: (id, data) =>
    api.put(`/users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Delete user
  deleteUser: (id) =>
    api.delete(`/users/${id}`),

  // Export CSV
  exportToCSV: () =>
    api.get(`/users/export/csv`, {
      responseType: "blob",
    }),
};

export default api;
