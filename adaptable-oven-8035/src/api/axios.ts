import axios from 'axios';

// Nest API (precious-charms-api). Default port 8080 to avoid clashing with CRA on 3000.
export const API_BASE_URL =
  (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Stale/invalid token — clear so restoreSession does not loop on bad auth
      const url = String(error?.config?.url || '');
      if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
        const token = localStorage.getItem('accessToken');
        if (token && url.includes('/auth/me')) {
          localStorage.removeItem('accessToken');
        }
      }
    }
    return Promise.reject(error);
  },
);

export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const getAccessToken = () => localStorage.getItem('accessToken');
