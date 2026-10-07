import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Settings,
} from 'lucide-react';
import './App.css';
import logo from './assets/rasma-removebg-preview.png';
import loginBrandBg from './assets/loginucu.png';
import loginFormBg from './assets/login.png';
import Dashboard from './Dashboard.jsx';
import Buildings from './Buildings.jsx';
import Facilities from './Facilities.jsx';
import Logs from './Logs.jsx';
import Pathways from './Pathways.jsx';
import SystemInfo from './System_information.jsx';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  if (isAuthenticated) {
    if (currentPage === 'buildings') {
      return <Buildings onNavigate={setCurrentPage} activePage="buildings" />;
    }

    if (currentPage === 'facilities') {
      return <Facilities onNavigate={setCurrentPage} activePage="facilities" />;
    }

    if (currentPage === 'pathways') {
      return <Pathways onNavigate={setCurrentPage} activePage="pathways" />;
    }

    if (currentPage === 'logs') {
      return <Logs onNavigate={setCurrentPage} activePage="logs" />;
    }

    if (currentPage === 'system') {
      return <SystemInfo onNavigate={setCurrentPage} activePage="system" />;
    }

    return <Dashboard username={username.trim() || 'admin'} onNavigate={setCurrentPage} activePage="dashboard" />;
  }

  return (
    <div className="ucunav-login-page">
      <div className="login-shell">
        <aside
          className="brand-panel"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(22,34,79,0.82), rgba(38,63,136,0.74)), url(${loginBrandBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="brand-header">
            <img
              className="brand-badge"
              src={logo}
              alt="UCUNav logo"
            />
            <span className="brand-wordmark">
              UCU<span>NAV</span>
            </span>
          </div>

          <div className="brand-copy">
            <p className="eyebrow">Welcome to</p>
            <h1>
              UCU<span>Nav</span>
            </h1>
            <h2>Campus Navigation System</h2>
            <p className="summary">
              Manage campus facilities, maps, and system settings from your
              admin dashboard.
            </p>
          </div>

          <div className="feature-strip">
            <div className="feature-item">
              <MapPin size={20} />
              <span>Manage Location</span>
            </div>

            <div className="feature-item feature-divider">
              <Building2 size={20} />
              <span>Update Facilities</span>
            </div>

            <div className="feature-item">
              <Settings size={20} />
              <span>System Settings</span>
            </div>
          </div>
        </aside>

        <section
          className="form-panel"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(248,250,252,0.88), rgba(232,238,246,0.9)), url(${loginFormBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="login-card">
            <div className="panel-brand">
              <img
                className="panel-badge"
                src={logo}
                alt="UCU Nav logo"
              />
              <span className="panel-wordmark">
                UCU<span>NAV</span>
              </span>
            </div>

            <h2>Admin Login</h2>
            <p className="subtitle">Sign in to access the main dashboard</p>

            <form onSubmit={handleSubmit} className="login-form">
              <label className="input-group">
                <span className="icon-wrap">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Enter User Admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label className="input-group">
                <span className="icon-wrap">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              <button type="submit" className="login-button">
                Log in
              </button>
            </form>
          </div>

          <div className="footer-badge">
            <div className="footer-icon">
              <Building2 size={18} />
            </div>
            <span>UCU Campus Navigation System</span>
          </div>
        </section>
      </div>
    </div>
  );
}
