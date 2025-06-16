import axios from 'axios';
import { getToken, removeToken } from './auth';

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
// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response, // Directly return a successful response
  (error) => {
    // Check if the error is due to an invalid token (401 Unauthorized or 403 Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      removeToken(); // Remove the token from storage
      // send back to login page 
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error); // Send it back to the code that claled this 
  }
);

export default api;
