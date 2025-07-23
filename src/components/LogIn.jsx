import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('isUserLoggedIn');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearLocalStorage(); // Ensure clean state before login

    try {
      const res = await axios.get(`http://localhost:5000/users?username=${username}&password=${password}`);

      if (res.data.length > 0) {
        const loggedInUser = res.data[0];

        if (loggedInUser.isBlocked || loggedInUser.isDeleted) {
          toast.error('Access denied! You are blocked or deleted.');
          return;
        }

        if (loggedInUser.role === 'admin') {
          localStorage.setItem('admin', JSON.stringify(loggedInUser));
          localStorage.setItem('isAdminLoggedIn', true);
          toast.success('Admin login successful!', { position: "top-right", autoClose: 1500 });
          setTimeout(() => navigate('/admin/dashboard', { replace: true }), 1500); // 👈 prevent back access
        } else {
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          localStorage.setItem('isUserLoggedIn', true);
          toast.success('Login successful!', { position: "top-right", autoClose: 1500 });
          setTimeout(() => navigate('/', { replace: true }), 1500); // 👈 prevent back access
        }
      } else {
        toast.error('Invalid username or password!', { position: "top-right", autoClose: 3000 });
      }

    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Try again later.', { position: "top-right", autoClose: 3000 });
    }
  };

  const goToRegister = () => {
    navigate('/register', { replace: true });
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h1 className="title">WELCOME</h1>
          <h2 className="subtitle">Login</h2>

          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit" className="login-button">Login</button>

          <p className="register-text">Don't have an account?</p>
          <button type="button" className="signup-button" onClick={goToRegister}>Sign Up</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;