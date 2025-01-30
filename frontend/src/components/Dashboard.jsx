import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  
  const goToProjectOverview = () => {
    navigate('/project-overview');
  };

  
  const goToExistingProjects = () => {
    navigate('/existing-projects');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>What would you like to do?</p>
      <div className="dashboard-actions">
        <button onClick={goToProjectOverview}>Project Overview</button>
        <button onClick={goToExistingProjects}>Existing Projects</button>
      </div>
    </div>
  );
};

export default Dashboard;
