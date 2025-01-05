import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="full-screen-loading">
        <div className="loading-text">Loading...</div>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
