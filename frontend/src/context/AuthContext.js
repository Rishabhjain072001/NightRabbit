import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async ({ email, password }) => {
    const response = await apiClient.post('/users/sign_in', { email, password });
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = async () => {
    try {
      await apiClient.delete('/users/sign_out', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
