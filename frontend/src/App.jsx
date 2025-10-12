import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectOverview from './components/ProjectOverview';
import ExistingProjects from './components/ExistingProjects';
import Layout from './components/Layout';
import About from './components/About';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes (no layout) */}
          <Route path="/" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes (with layout) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/project-overview"
            element={
              <PrivateRoute>
                <Layout>
                  <ProjectOverview />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/existing-projects"
            element={
              <PrivateRoute>
                <Layout>
                  <ExistingProjects />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
