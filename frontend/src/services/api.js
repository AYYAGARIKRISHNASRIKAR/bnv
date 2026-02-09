import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const userAPI = {
  getUsers: (page = 1, limit = 10) =>
    api.get(`/users?page=${page}&limit=${limit}`),

  searchUsers: (query, page = 1, limit = 10) =>
    api.get(`/users/search?query=${query}&page=${page}&limit=${limit}`),

  getUserById: (id) =>
    api.get(`/users/${id}`),

  createUser: (formData) =>
    api.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  updateUser: (id, formData) =>
    api.put(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  deleteUser: (id) =>
    api.delete(`/users/${id}`),

  exportToCSV: () =>
    api.get('/users/export/csv', { responseType: 'blob' }),
};

export default api;