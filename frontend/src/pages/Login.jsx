import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      if (isAdminView) {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          setError('Access Denied: You do not have administrator privileges.');
        }
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-6 text-gray-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            {isAdminView ? 'Admin Nexus' : 'Career Pro'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isAdminView ? 'Secure Administrative Authority' : 'Empowering your professional journey.'}
          </p>
        </div>

        {/* Dual Option Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setIsAdminView(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              !isAdminView ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            User Login
          </button>
          <button 
            onClick={() => setIsAdminView(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              isAdminView ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-2 border italic ${
            isAdminView ? 'bg-red-50 text-red-600 border-red-100' : 'bg-red-50 text-red-600 border-red-100'
          }`}>
            <span className="material-symbols-outlined text-sm">
              {isAdminView ? 'shield_person' : 'error'}
            </span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              {isAdminView ? 'Terminal Identifier' : 'Email Address'}
            </label>
            <input
              type="email"
              placeholder={isAdminView ? 'admin@nexus.com' : 'user@example.com'}
              className={`w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none transition-all text-sm font-medium focus:border-primary ${
                isAdminView ? 'focus:border-red-500' : 'focus:border-primary'
              }`}
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              {isAdminView ? 'Access Code' : 'Password'}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none transition-all text-sm font-medium focus:border-primary ${
                isAdminView ? 'focus:border-red-500' : 'focus:border-primary'
              }`}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 text-white ${
              isAdminView 
                ? 'bg-gray-900 shadow-gray-900/10 hover:bg-black' 
                : 'bg-primary shadow-primary/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isAdminView ? 'Verify & Enter' : 'Sign In'}
                <span className="material-symbols-outlined text-lg">
                  {isAdminView ? 'verified_user' : 'login'}
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            {isAdminView ? (
              <button 
                onClick={() => setIsAdminView(false)}
                className="text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
              >
                Cancel Authentication
              </button>
            ) : (
              <>
                Account needed?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">Register Here</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
