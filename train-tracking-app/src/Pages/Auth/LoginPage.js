import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const role = new URLSearchParams(location.search).get('role');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3006/api/login', { username, password });
      if (response.data.success) {
        console.log('Login successful:', response.data); // Add this for debugging
        navigate(role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      <h1>{role === 'admin' ? 'Admin' : 'User'} Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {role === 'user' && (
        <div>
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
