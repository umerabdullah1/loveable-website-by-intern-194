// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, User, Building, UserCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    companyName: '',
    regNo: '',
    department: '',
    year: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [localError, setLocalError] = useState('');

  const roles = [
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'teacher', label: 'Teacher', icon: '👨‍🏫' },
    { id: 'mentor', label: 'Mentor', icon: '🤝' },
    { id: 'company', label: 'Company', icon: '🏢' },
    { id: 'admin', label: 'Admin', icon: '🛡️' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    // Company validation
    if (formData.role === 'company') {
      if (!formData.companyName || !formData.regNo) {
        setLocalError('Please fill in company name and registration number');
        return;
      }
    }

    const userData = {
      name: formData.role === 'company' ? formData.companyName : formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      department: formData.department,
      year: formData.year,
      companyName: formData.companyName,
      regNo: formData.regNo
    };

    const success = await register(userData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-glow auth-glow-1"></div>
        <div className="auth-glow auth-glow-2"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card auth-card-wide">
          <button onClick={() => navigate('/')} className="auth-back-btn">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="auth-header">
            <div className="auth-logo">
              <img src="/IQ LOGO.png" alt="Inquisitors Society" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the Inquisitors Society</p>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="auth-role-select">
              <p className="auth-role-label">Select your role to get started</p>
              <div className="auth-role-grid">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className="auth-role-card"
                  >
                    <span className="auth-role-icon">{r.icon}</span>
                    <span className="auth-role-name">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Registration Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="auth-form">
              {(localError || error) && (
                <div className="auth-error">{localError || error}</div>
              )}

              <div className="auth-field">
                <label className="auth-label">Selected Role: <strong>{formData.role.toUpperCase()}</strong></label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="auth-change-role"
                >
                  Change Role
                </button>
              </div>

              {formData.role !== 'company' && (
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrapper">
                    <User className="auth-input-icon" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ahmed Khan"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>
              )}

              {formData.role === 'company' && (
                <>
                  <div className="auth-field">
                    <label className="auth-label">Company Name</label>
                    <div className="auth-input-wrapper">
                      <Building className="auth-input-icon" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. TechCorp Solutions"
                        className="auth-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Company Registration Number</label>
                    <div className="auth-input-wrapper">
                      <Building className="auth-input-icon" />
                      <input
                        type="text"
                        name="regNo"
                        value={formData.regNo}
                        onChange={handleChange}
                        placeholder="e.g. REG-PK-98214"
                        className="auth-input"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail className="auth-input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@uet.edu.pk"
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="auth-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="auth-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="auth-toggle-password"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="auth-social">
            <button className="auth-social-btn auth-social-google">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#4A90E2" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="auth-social-btn auth-social-github">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/auth/login" className="auth-footer-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;