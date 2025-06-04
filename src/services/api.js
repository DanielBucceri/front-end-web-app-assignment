import axios from 'axios';
import { getToken } from './auth';

// 
const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:4000', 
});



// // Add a request interceptor to include the JWT token in the Auth header
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   });


export default api;