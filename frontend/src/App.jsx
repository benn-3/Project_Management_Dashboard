import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectOverview from './components/ProjectOverview';
import ExistingProjects from './components/ExistingProjects';
import Layout from './components/Layout'; // Import the new Layout

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes (no layout) */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes (with layout) */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/project-overview"
          element={
            <Layout>
              <ProjectOverview />
            </Layout>
          }
        />
        <Route
          path="/existing-projects"
          element={
            <Layout>
              <ExistingProjects />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
