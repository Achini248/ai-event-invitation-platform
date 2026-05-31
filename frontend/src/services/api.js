import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 90_000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — normalise errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const detail =
      err?.response?.data?.detail ||
      (Array.isArray(err?.response?.data?.detail)
        ? err.response.data.detail.map((d) => d.msg).join(', ')
        : null) ||
      err?.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(detail));
  }
);

export default api;
