import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProjectOverview.css';

const ProjectOverview = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [roles, setRoles] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    if (!projectName || !projectDescription) {
      alert('Please fill in all fields!');
      return;
    }

    const newProject = {
      name: projectName,
      description: projectDescription,
      teamMembers,
      roles,
      progress,
    };

    try {
      const response = await axios.post('http://localhost:3001/createProject', newProject);
      console.log('Response:', response.data);
      alert('Project Created Successfully!');
      navigate('/existing-projects'); 
    } catch (error) {
      console.error('Error creating project:', error.response ? error.response.data : error.message);
      alert('Failed to create project');
    }
  };

  return (
    <div className="project-overview-container">
      <h1>Create New Project</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />

        <label>Project Description:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
        />

        <label>Assign Team Members:</label>
        <input
          type="text"
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
        />

        <label>Assign Roles:</label>
        <input
          type="text"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
        />

        <label>Progress:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />
        <span>{progress}%</span>

        <button onClick={handleCreateProject}>Create Project</button>
      </form>
    </div>
  );
};

export default ProjectOverview;
