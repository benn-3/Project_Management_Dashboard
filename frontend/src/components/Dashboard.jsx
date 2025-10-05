import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome 👋</h1>
      <p className="dashboard-subtitle">Manage your projects, teams, and progress in one place.</p>
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
