import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
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
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3l18 18"
    />
  </svg>
);

const Signup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/signup`, { username, firstname, lastname, email, password, role });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Failed to signup');
    }
  };

  return (
    <div className="signup-bg">
      <div
        className="signup-card"
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
          padding: "32px",
          maxWidth: "400px",
          margin: "40px auto",
          color: "#222"
        }}
      >
        {/* Branding */}
        <div className="brand">
          <img src="https://cdn-icons-png.flaticon.com/512/9068/9068679.png" alt="Logo" className="brand-logo" />
          <h1 className="brand-title">Project Management Dashboard</h1>
          <p className="brand-desc">Organize your projects, tasks, and teams efficiently.</p>
        </div>
        <h2>Create Account</h2>
        <form onSubmit={step === 6 ? handleSignup : handleNext} className="signup-form">
          {step === 1 && (
            <>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={!username}>Next</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                required
                autoFocus
              />
              <div className="button-group">
                <button className="prev-btn" onClick={handlePrev}>Previous</button>
                <button className="next-btn" type="submit" disabled={!firstname}>Next</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                required
                autoFocus
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handlePrev}>Previous</button>
                <button type="submit" disabled={!lastname}>Next</button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handlePrev}>Previous</button>
                <button type="submit" disabled={!email}>Next</button>
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <label htmlFor="password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                  style={{ paddingRight: "44px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    height: "24px",
                    width: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
              <div className="button-group">
                <button className="prev-btn" onClick={handlePrev}>Previous</button>
                <button className="next-btn" type="submit" disabled={!password}>Next</button>
              </div>
            </>
          )}
          {step === 6 && (
            <>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <div className="button-group">
                <button className="prev-btn" onClick={handlePrev}>Previous</button>
                <button className="submit-btn" type="submit" disabled={!role}>Sign Up</button>
              </div>
            </>
          )}
        </form>
        <div className="switch-link">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

/* If the page is not loading, check your router setup:
Example (in App.jsx or wherever your routes are defined):

import Signup from './components/Signup';
...
<Route path="/signup" element={<Signup />} />

Also, ensure there are no typos in the import path and that Signup.jsx is in the correct folder.
*/
