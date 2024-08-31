import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select User Type</h1>
      <button onClick={() => navigate('/login?role=admin')}>Admin Login</button>
      <button onClick={() => navigate('/login?role=user')}>User Login</button>
      <button onClick={() => navigate('/register')}>User Registration</button>
    </div>
  );
};

export default UserSelectionPage;
