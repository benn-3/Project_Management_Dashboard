import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password, role });
      localStorage.setItem('role', res.data.role); // Store role
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert('Incorrect email, password, or role');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Branding */}
        <div className="brand">
          <img src="https://cdn-icons-png.flaticon.com/512/9068/9068679.png" alt="Logo" className="brand-logo" />
          <h1 className="brand-title">Project Management Dashboard</h1>
          <p className="brand-desc">Sign in to manage your projects and tasks.</p>
        </div>
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={e => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
        <div className="switch-link">
          Don't have an account?
          <Link to="/">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
