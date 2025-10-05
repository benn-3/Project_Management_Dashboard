import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header className="header">
      <span className="header-logo">📊</span>
      <h1>Project Management Dashboard</h1>
    </header>
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/project-overview">Create Project</Link></li>
          <li><Link to="/existing-projects">Projects</Link></li>
        </ul>
      </nav>
    </aside>
    <main className="main-content">{children}</main>
  </div>
);

export default Layout;