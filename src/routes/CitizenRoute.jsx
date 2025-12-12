import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const CitizenRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'citizen') {
    // Redirect based on role
    if (role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (role === 'staff') {
      return <Navigate to="/staff-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CitizenRoute;

