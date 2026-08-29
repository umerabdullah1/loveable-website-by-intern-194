// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import './Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-glow auth-glow-1"></div>
        <div className="auth-glow auth-glow-2"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <button onClick={() => navigate('/auth/login')} className="auth-back-btn">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="auth-header">
            <div className="auth-logo">
              <img src="/IQ LOGO.png" alt="Inquisitors Society" />
            </div>
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail className="auth-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@uet.edu.pk"
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="auth-success">
              <p>✅ Password reset link sent to <strong>{email}</strong></p>
              <p className="text-xs text-slate-400 mt-2">Please check your inbox and spam folder.</p>
            </div>
          )}

          <p className="auth-footer-text">
            Remember your password?{' '}
            <Link to="/auth/login" className="auth-footer-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;