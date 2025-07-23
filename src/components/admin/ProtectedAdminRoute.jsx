import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  const adminData = localStorage.getItem('admin');

  if (!isAdminLoggedIn || !adminData) {
    window.location.href = "/login"; 
    return null;
  }

  try {
    const admin = JSON.parse(adminData);

   
    if (admin.role !== 'admin' || admin.isBlocked || admin.isDeleted) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAdminRoute;
