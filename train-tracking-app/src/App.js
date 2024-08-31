import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SelectionPage from './Pages/UserSelectionPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
