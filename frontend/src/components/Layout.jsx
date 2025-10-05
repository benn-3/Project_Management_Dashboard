import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header className="header">
      <h1>Project Management</h1>
    </header>
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/existing-projects">Projects</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </aside>
    <main className="main-content">{children}</main>
  </div>
);

export default Layout;