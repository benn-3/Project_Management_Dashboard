import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:3000/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const totalProjects = projects.length;
  const totalProgress = projects.reduce((sum, p) => sum + p.progress, 0);
  const avgProgress = totalProjects > 0 ? (totalProgress / totalProjects).toFixed(1) : 0;

  return (
    <div className="dashboard-container">
      <h1>Welcome 👋</h1>
      <p className="dashboard-subtitle">Manage your projects, teams, and progress in one place.</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{totalProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Average Progress</h3>
          <p>{avgProgress}%</p>
        </div>
      </div>
      <div className="dashboard-actions">
        <button onClick={() => navigate('/project-overview')}>+ Create Project</button>
        <button onClick={() => navigate('/existing-projects')}>View Projects</button>
      </div>
      <div className="dashboard-info">
        <div className="dashboard-card">
          <h3>🚀 Quick Tips</h3>
          <ul>
            <li>Click "Create Project" to start a new project.</li>
            <li>View, edit, or delete projects from "Projects".</li>
            <li>Assign team members and track progress visually.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
