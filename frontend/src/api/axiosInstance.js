import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // API URL for development or production

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding the authentication token if it's available in localStorage
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    addAuthToken(config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token from localStorage
      localStorage.removeItem('token');

      // Redirect to login page
      window.location.href = '/login'; // Use React Router's navigate if using in a React component
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
