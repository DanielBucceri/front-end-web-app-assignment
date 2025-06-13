import axios from 'axios';
import { getToken } from './auth';

//
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

// Add a request interceptor to include the JWT token in the Auth header
api.interceptors.request.use((config) => {
  const token = getToken();
  const updatedConfig = { ...config };

  updatedConfig.headers = { ...config.headers };

  if (token) {
    updatedConfig.headers.Authorization = `Bearer ${token}`;
  }

  return updatedConfig;
});
export default api;
