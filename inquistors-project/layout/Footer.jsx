// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import './Layout.css';

export const Footer = () => {
  const { setActiveTab } = useApp();

  const footerLinks = [
    { id: 'lms', label: 'Learning Management System' },
    { id: 'internships', label: 'Internship Management' },
    { id: 'events', label: 'Event & Workshop Tickets' },
    { id: 'career', label: 'Career Hub & Job Board' },
    { id: 'community', label: 'Community & Q&A Forum' },
    { id: 'ai_suite', label: 'AI Advisor & Resume Analyzer' }
  ];

  const teamMembers = [
    'Ubaidullah Shahid (Intern No.27)',
    'Usman (Intern No.284)',
    'Ilsa Javed (Intern No.45)',
    'Tayyeba Qamar (Intern No.27)',
    'Muhammad Tayyab (Intern No.27)',
    'Muhammad Umar (Intern No.27)'
  ];

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* ===== BRAND COLUMN ===== */}
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <div className="footer-logo-icon">
              <img src="/IQ LOGO.png" alt="Inquisitors Logo" />
            </div>
            <h3>INQUISITORS SOCIETY</h3>
          </div>
          <p className="footer-brand-desc">
            3D Intelligent Learning & Career Development Platform. Empowering students at 
            University of Engineering & Technology (UET) Lahore with futuristic digital transformation.
          </p>
          <div className="footer-badge">
            <Sparkles className="w-4 h-4" />
            <span>Built per SRS Specification v1.0</span>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-social-link"><Github className="w-4 h-4" /></a>
            <a href="#" className="footer-social-link"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="footer-social-link"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="footer-social-link"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* ===== MODULES COLUMN ===== */}
        <div className="footer-modules">
          <h4>Platform Modules</h4>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.id}>
                <button onClick={() => setActiveTab(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== TEAM COLUMN ===== */}
        <div className="footer-team">
          <h4>SRS Project Team</h4>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>• {member}</li>
            ))}
            <li className="footer-team-submitted">• Submitted to: <span>Sir Burhan</span></li>
          </ul>
        </div>

        {/* ===== INSTITUTION COLUMN ===== */}
        <div className="footer-institution">
          <h4>Institution</h4>
          <p>
            University of Engineering and Technology (UET) Lahore, 
            GT Road, Lahore, Punjab, Pakistan.
          </p>
          <div className="footer-compliance">
            <span className="footer-compliance-label">Compliance:</span>
            <span>HEC Standards, OWASP Top 10, WCAG 2.1 AA</span>
          </div>
          <div className="footer-version">
            <span>Version 2.0</span>
            <span>|</span>
            <span>12 August 2026</span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom">
        <p>© 2026 Inquisitors Society UET Lahore. All rights reserved.</p>
        <p>
          Designed with <Heart className="footer-heart" /> for technical excellence.
        </p>
      </div>
    </footer>
  );
};