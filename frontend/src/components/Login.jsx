import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12c0-4.418 3.582-8 8-8 2.485 0 4.735 1.086 6.293 2.707M21 12c0 4.418-3.582 8-8 8-2.485 0-4.735-1.086-6.293-2.707M3 3l18 18M3 21L21 3"
    />
  </svg>
);

const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12c0 4.418 3.582 8 8 8 2.485 0 4.735-1.086 6.293-2.707M21 12c0-4.418-3.582-8-8-8-2.485 0-4.735 1.086-6.293 2.707M1 1l22 22M1 23L23 1"
    />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
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
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? EyeClosed : EyeOpen}
            </button>
          </div>
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
