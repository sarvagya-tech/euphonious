import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuthStore();
  const isAuthenticated = Boolean(user && token);
  const location = useLocation();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasNotified.current) {
      hasNotified.current = true;
      toast.error('Please log in to access this feature');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
