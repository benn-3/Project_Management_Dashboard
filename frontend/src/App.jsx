import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectOverview from './components/ProjectOverview';
import ExistingProjects from './components/ExistingProjects';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-overview" element={<ProjectOverview />} />
        <Route path="/existing-projects" element={<ExistingProjects />} />
      </Routes>
    </Router>
  );
};

export default App;
