// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  MessageSquare,
  Bot,
  Shield,
  Bell,
  UserCheck,
  ChevronDown,
  Sparkles,
  LogOut,
  User,
  Menu,
  X,
  Home
} from 'lucide-react';
import './Layout.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    user,
    switchRole,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationAsRead,
    setIsAuthModalOpen,
    setAuthMode,
    logout,
    isAuthenticated
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles = [
    { id: 'student', label: 'Student', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
    { id: 'teacher', label: 'Faculty / Teacher', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
    { id: 'mentor', label: 'Industry Mentor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { id: 'company', label: 'Company HR', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
    { id: 'admin', label: 'System Admin', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' }
  ];

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home, path: '/' },
    { id: 'lms', label: 'LMS Courses', icon: GraduationCap, path: '/lms' },
    { id: 'internships', label: 'Internships', icon: Briefcase, path: '/internships' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
    { id: 'career', label: 'Career Hub', icon: Building2, path: '/career' },
    { id: 'community', label: 'Community', icon: MessageSquare, path: '/community' },
    { id: 'ai_suite', label: 'AI Suite', icon: Bot, path: '/ai_suite' },
    { id: 'admin', label: 'Admin Panel', icon: Shield, path: '/admin', roleRequired: 'admin' }
  ];

  const currentRoleObj = roles.find(r => r.id === user?.role) || roles[0];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    setIsMobileMenuOpen(false);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const filteredNavItems = navItems.filter(item => {
    if (item.roleRequired === 'admin') {
      return user?.role === 'admin';
    }
    return true;
  });

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* ===== BRAND ===== */}
        <div className="navbar-brand" onClick={() => handleNavClick({ id: 'landing', path: '/' })}>
          <div className="navbar-logo">
            <img src="/IQ LOGO.png" alt="Inquisitors Logo" />
          </div>
          <div className="navbar-brand-text">
            <h1>INQUISITORS <span>Society</span></h1>
            <p>3D Intelligent Educational Ecosystem</p>
          </div>
        </div>

        {/* ===== DESKTOP NAV ===== */}
        <nav className="navbar-desktop-nav">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`navbar-nav-btn ${isActive ? 'navbar-nav-btn-active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ===== RIGHT SECTION ===== */}
        <div className="navbar-right">
          {/* Role Switcher */}
          <div className="navbar-role-wrapper">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`navbar-role-btn ${currentRoleObj.color}`}
            >
              <UserCheck className="w-4 h-4" />
              <span className="navbar-role-label">Role: {currentRoleObj.label}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isRoleDropdownOpen && (
              <div className="navbar-dropdown">
                <p className="navbar-dropdown-label">Switch System Role</p>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`navbar-dropdown-item ${user?.role === r.id ? 'navbar-dropdown-item-active' : ''}`}
                  >
                    {r.label}
                    {user?.role === r.id && <span className="navbar-dropdown-dot" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="navbar-notif-wrapper">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="navbar-notif-btn"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="navbar-notif-badge">{unreadCount}</span>
              )}
            </button>

            {isNotifOpen && (
              <div className="navbar-notif-dropdown">
                <div className="navbar-notif-header">
                  <h4>Notifications</h4>
                  <span>{unreadCount} Unread</span>
                </div>
                <div className="navbar-notif-list">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`navbar-notif-item ${n.read ? 'navbar-notif-item-read' : 'navbar-notif-item-unread'}`}
                    >
                      <div className="navbar-notif-item-header">
                        <span className="navbar-notif-item-title">{n.title}</span>
                        <span className="navbar-notif-item-time">{n.time}</span>
                      </div>
                      <p>{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth / Profile */}
          <div className="navbar-auth">
            {isAuthenticated() ? (
              <>
                <img
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name + '&background=06b6d4&color=fff'}
                  alt={user?.name}
                  className="navbar-avatar"
                  onClick={() => navigate('/my_profile')}
                />
                <button onClick={handleLogout} className="navbar-logout-btn">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="navbar-login-btn">
                  Sign In
                </button>
                <button onClick={handleRegister} className="navbar-register-btn">
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-mobile-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <nav className="navbar-mobile-nav">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`navbar-mobile-nav-btn ${isActive ? 'navbar-mobile-nav-btn-active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="navbar-mobile-auth">
            {isAuthenticated() ? (
              <>
                <div className="navbar-mobile-user">
                  <img
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name + '&background=06b6d4&color=fff'}
                    alt={user?.name}
                  />
                  <div>
                    <p className="navbar-mobile-user-name">{user?.name}</p>
                    <p className="navbar-mobile-user-role">{user?.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="navbar-mobile-logout">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="navbar-mobile-auth-buttons">
                <button onClick={handleLogin} className="navbar-mobile-login">
                  Sign In
                </button>
                <button onClick={handleRegister} className="navbar-mobile-register">
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};