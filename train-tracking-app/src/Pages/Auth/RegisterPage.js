import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate ();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3006/api/users', { username, password });
      if (response.data.success) {
        history.push('/login?role=user');
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
