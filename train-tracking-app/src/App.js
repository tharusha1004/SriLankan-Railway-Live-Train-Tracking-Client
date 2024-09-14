import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSelection from './components/Auth/UserSelection';
import AdminLogin from './components/Auth/AdminLogin';
import UserLogin from './components/Auth/UserLogin';
import UserRegister from './components/Auth/UserRegister';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import TrainDetailsPage from './components/Admin/TrainDetailsPage';
import ScheduleDetailsPage from './components/Admin/ScheduleDetailsPage';
import TrainLocationPage from './components/Admin/TrainLocationPage';
import EngineStatusPage from './components/Admin/EngineStatusPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin/train-details" element={<TrainDetailsPage />} />
        <Route path="/admin/train-schedules" element={<ScheduleDetailsPage />} />
        <Route path="/admin/train-live-location" element={<TrainLocationPage/>} />
        <Route path="/admin/engine-status" element={<EngineStatusPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
