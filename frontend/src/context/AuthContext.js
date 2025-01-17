import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await apiClient.get('/users/validate_token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
          localStorage.setItem('token', token);
        } catch (error) {
          setUser(null);
          localStorage.removeItem('token');
        }
        setLoading(false);
      }
      else {
        setUser(null);
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const login = async ({ email, password, confirm }, callback) => {
    try {
      const response = await apiClient.post('/users/sign_in', { email, password, confirm });
      
      // If IP mismatch, response will include 'action: "confirm_ip_change"'
      if (response.data.action === 'confirm_ip_change') {
        callback(false); // Show confirmation dialog
      } else {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        callback(true); // Proceed with login
      }
    } catch (err) {
      throw err;  // Error handling
    }
  };

  const logout = async () => {
    try {
      await apiClient.delete('/users/sign_out', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading  }}>
      {children}
    </AuthContext.Provider>
  );
};
