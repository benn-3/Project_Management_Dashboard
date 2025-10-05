import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ExistingProjects.css';

const ExistingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://project-management-dashboard-p4tx.onrender.com/projects');
        setProjects(response.data);
      } catch (error) {
        alert('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    // TODO: Call backend to delete project
    setProjects(projects.filter(project => project._id !== id));
    alert('Project Deleted');
  };

  return (
    <div className="existing-projects-container">
      <h1>Existing Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found. Please create a project.</p>
      ) : (
        projects.map((project) => (
          <div className="project" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p><strong>Team Members:</strong> {project.teamMembers}</p>
            <p><strong>Roles:</strong> {project.roles}</p>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: `${project.progress}%` }} />
            </div>
            <p><strong>Progress:</strong> {project.progress}%</p>
            <div className="project-actions">
              <button onClick={() => alert('Edit feature coming soon!')}>Edit</button>
              <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExistingProjects;
