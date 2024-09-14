import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Add some custom styles

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <div className="card" onClick={() => navigate('/admin/train-schedules')}>
          <h3>Train Schedules</h3>
        </div>
        <div className="card" onClick={() => navigate('/admin/train-details')}>
          <h3>Train Details</h3>
        </div>
        <div className="card" onClick={() => navigate('/admin/train-live-location')}>
          <h3>Train Live Location</h3>
        </div>
        <div className="card" onClick={() => navigate('/admin/engine-status')}>
          <h3>Engine Status</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
