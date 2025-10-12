import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../css/ExistingProjects.css';

const ExistingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(response.data);
      } catch (error) {
        alert('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProjects();
  }, [token]);

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(project => project._id !== id));
      alert('Project Deleted');
    } catch (error) {
      alert('Error deleting project');
    }
  };

  const handleEdit = (project) => {
    setEditing(project._id);
    setEditForm({ ...project });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/projects/${editing}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.map(p => p._id === editing ? { ...p, ...editForm } : p));
      setEditing(null);
      alert('Project Updated');
    } catch (error) {
      alert('Error updating project');
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditForm({});
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
            {editing === project._id ? (
              <div>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editForm.progress}
                  onChange={(e) => setEditForm({ ...editForm, progress: e.target.value })}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p><strong>Team Members:</strong> {project.teamMembers?.map(m => m.username || m).join(', ') || 'None'}</p>
                <p><strong>Roles:</strong> {project.roles?.join(', ') || 'None'}</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar" style={{ width: `${project.progress}%` }} />
                </div>
                <p><strong>Progress:</strong> {project.progress}%</p>
                <div className="project-actions">
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExistingProjects;
