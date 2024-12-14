import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/users/sign_in', { email, password });
    // Store the token in localStorage upon successful login
    localStorage.setItem('authToken', response.data.token);
    return response.data; // Returning the user data or token
  } catch (error) {
    throw error; // Propagate error if login fails
  }
};

// Logout user (clear token)
export const logoutUser = () => {
  localStorage.removeItem('authToken');
};

// export const logoutUser = async () => {
//   // try {
//   //   await axiosInstance.delete('/users/sign_out');
//   //   localStorage.removeItem('authToken'); // Remove the JWT token from localStorage
//   // } catch (error) {
//   //   throw error;
//   // }
// };

// Get the current logged-in user from the token
export const getCurrentUser = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const user = jwtDecode(token); // You can use jwt-decode here to decode the JWT token
    return user;
  }
  return null;
};
