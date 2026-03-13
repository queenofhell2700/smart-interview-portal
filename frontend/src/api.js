import axios from 'axios';

// Base URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Optional: Add token automatically if logged in
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default api;