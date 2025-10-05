import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await axios.post('https://project-management-dashboard-p4tx.onrender.com/signup', { username, firstname, lastname, email, password });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Failed to signup');
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-card">
        {/* Branding */}
        <div className="brand">
          <img src="https://cdn-icons-png.flaticon.com/512/9068/9068679.png" alt="Logo" className="brand-logo" />
          <h1 className="brand-title">Project Management Dashboard</h1>
          <p className="brand-desc">Organize your projects, tasks, and teams efficiently.</p>
        </div>
        <h2>Create Account</h2>
        <form onSubmit={step === 5 ? handleSignup : handleNext} className="signup-form">
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
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
              <div className="button-group">
                <button className="prev-btn" onClick={handlePrev}>Previous</button>
                <button className="submit-btn" type="submit" disabled={!password}>Sign Up</button>
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
