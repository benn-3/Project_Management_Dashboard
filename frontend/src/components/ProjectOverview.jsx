import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../css/ProjectOverview.css';

const ProjectOverview = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [roles, setRoles] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName || !projectDescription) {
      alert('Please fill in all fields!');
      return;
    }
    setLoading(true);
    const newProject = {
      name: projectName,
      description: projectDescription,
      teamMembers: teamMembers ? teamMembers.split(',').map(m => m.trim()) : [],
      roles: roles ? roles.split(',').map(r => r.trim()) : [],
      progress: parseInt(progress),
    };
    try {
      await axios.post('http://localhost:3000/createProject', newProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Project Created Successfully!');
      navigate('/existing-projects');
    } catch (error) {
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-overview-container">
      <h1>Create New Project</h1>
      <form onSubmit={handleCreateProject}>
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          required
        />
        <label>Project Description</label>
        <textarea
          value={projectDescription}
          onChange={e => setProjectDescription(e.target.value)}
          required
        />
        <label>Team Members (comma separated, optional)</label>
        <input
          type="text"
          value={teamMembers}
          onChange={e => setTeamMembers(e.target.value)}
          placeholder="e.g. Alice, Bob, Charlie"
        />
        <label>Roles (comma separated, optional)</label>
        <input
          type="text"
          value={roles}
          onChange={e => setRoles(e.target.value)}
          placeholder="e.g. Developer, Designer"
        />
        <label>Progress</label>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={e => setProgress(e.target.value)}
        />
        <span>{progress}%</span>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectOverview;
