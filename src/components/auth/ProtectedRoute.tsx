import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Placeholder for loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-leafy-500"></div>
  </div>
);

const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) {
    // Show loading indicator while checking auth state
    return <LoadingSpinner />;
  }

  if (!session) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the child route if authenticated
  return <Outlet />;
};

export default ProtectedRoute; 