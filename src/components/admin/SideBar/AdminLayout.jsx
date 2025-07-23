import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => navigate('/admin/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/admin/productmanager')}>Product Manager</li>
          <li onClick={() => navigate('/admin/users')}>Manage Users</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}