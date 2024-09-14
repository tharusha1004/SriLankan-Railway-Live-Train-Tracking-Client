import React from 'react';
import './UserSelection.css';
import { useNavigate } from 'react-router-dom';

import AppLogo from '../../images/logo.png';
import AdminImg from '../../images/admin.png';
import UserImg from '../../images/user.png';
import TrainImg from '../../images/train.png'
import Logo1 from '../../images/logo1.png';
import Logo2 from '../../images/logo2.png';

const UserSelection = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  const handleUserClick = () => {
    navigate('/user-login');
  };

  return (
    <div className="user-selection-container">
      <header className="user-selection-header">
        <img src={AppLogo} alt="TrackMyTrain LK Logo" className="logo" />
      </header>
      
      <div className="content">
        <h2 className="title">What role do you have?</h2>
        <p className="description">
          To start your journey at TrackMyTrain LK.
          Please select your role
        </p>

        <div className="role-selection">
          <div className="role-card" onClick={handleAdminClick}>
            <img src={AdminImg} alt="Admin User" />
            <p>Admin User</p>
          </div>

          <div className="role-card" onClick={handleUserClick}>
            <img src={UserImg} alt="Normal User" />
            <p>Normal User</p>
          </div>
        </div>
      </div>

      <footer className="user-selection-footer">
        <div className="train-image">
          <img src={TrainImg} alt="Train" />
        </div>
        <p>Project by Sri Lankan Railways</p>
        <p>&copy; 2024 Sri Lankan Railways | All Rights Reserved</p>
        <div className="logos">
          <img src={Logo1} alt="Logo 1" />
          <img src={Logo2} alt="Logo 2" />
        </div>
      </footer>
    </div>
  );
};

export default UserSelection;
