// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Lock, User, Building, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register, loading, error } = useApp();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');

  if (!isAuthModalOpen) return null;

  const roles = ['student', 'teacher', 'mentor', 'company', 'admin'];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (role === 'company' && (!companyName || !regNo)) {
      setLocalError('Please fill in company name and registration number');
      return;
    }

    const userData = {
      name: role === 'company' ? companyName : name || 'User',
      email,
      password,
      role,
      companyName,
      regNo
    };

    const success = await register(userData);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-slate-700 space-y-4 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <img src="/IQ LOGO.png" alt="Inquisitors Logo" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-xs text-slate-400">
            {authMode === 'login' ? 'Sign in to continue' : 'Join the Inquisitors Society'}
          </p>
        </div>

        {(localError || error) && (
          <div className="auth-error text-sm p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {localError || error}
          </div>
        )}

        <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-3 text-xs">
          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Role</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-1.5 rounded-lg capitalize transition-colors ${
                        role === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-900/50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {role !== 'company' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmed Khan"
                    className="w-full p-3 rounded-xl glass-input"
                  />
                </div>
              )}

              {role === 'company' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. TechCorp Solutions"
                      className="w-full p-3 rounded-xl glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Registration Number</label>
                    <input
                      type="text"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      placeholder="e.g. REG-PK-98214"
                      className="w-full p-3 rounded-xl glass-input"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@uet.edu.pk"
              className="w-full p-3 rounded-xl glass-input"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 rounded-xl glass-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-3 rounded-xl glass-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="w-full gradient-button py-3 rounded-xl font-bold" disabled={loading}>
            {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-[11px] text-slate-400">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-cyan-400 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};