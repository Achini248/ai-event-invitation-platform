import axios from 'axios';

const BASE_URL = 'https://ai-event-invitation-platform.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const detail =
      err?.response?.data?.detail ||
      err?.message ||
      'Network Error';

    return Promise.reject(new Error(detail));
  }
);

export default api;