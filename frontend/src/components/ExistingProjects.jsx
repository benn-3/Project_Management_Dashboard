import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ExistingProjects.css';

const ExistingProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.response ? error.response.data : error.message);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (id) => {
   
    alert('Edit Project ID: ' + id);
  };

  const handleDeleteProject = (id) => {
    
    const updatedProjects = projects.filter(project => project._id !== id);
    setProjects(updatedProjects);
    
    alert('Project Deleted');
  };

  return (
    <div className="existing-projects-container">
      <h1>Existing Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Please create a project.</p>
      ) : (
        projects.map((project) => (
          <div className="project" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p><strong>Team Members:</strong> {project.teamMembers}</p>
            <p><strong>Roles:</strong> {project.roles}</p>
            <p><strong>Progress:</strong> {project.progress}%</p>
            <button onClick={() => handleEditProject(project._id)}>Edit Project</button>
            <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ExistingProjects;
