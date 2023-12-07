import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../core/contextApi/authContext';

const PublicRoutes = ({ element }) => {
  const { user } = useAuth();

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (user || userData?.token) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/dashboard" />;
  }

  // Render the protected route if user is authenticated
  return element;
};

export default PublicRoutes;
