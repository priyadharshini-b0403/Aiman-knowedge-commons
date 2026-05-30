import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/dashboard';
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim() || !form.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!form.password || form.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (!isLogin && !form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      login({
        email: form.email,
        name: isLogin ? form.email.split('@')[0] : form.name,
        role: form.role,
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 1500);
    }, 800);
  };

  if (!authLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent">
        <div className="text-center space-y-6 animate-slideUp">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/30 to-violet-500/30 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="text-xl text-slate-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">AIMan</span>
          </h1>
          <p className="text-slate-400">Knowledge Commons Platform</p>
        </div>

        {/* Form Container */}
        <div className="glass-light rounded-2xl p-8 border border-slate-700/50 space-y-6">
          {/* Tab Selector */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setForm(prev => ({ ...prev, name: '', role: 'user' }));
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${isLogin
                ? 'gradient-accent text-white'
                : 'glass border border-slate-700/50 text-slate-400 hover:border-slate-600/50'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${!isLogin
                ? 'gradient-accent text-white'
                : 'glass border border-slate-700/50 text-slate-400 hover:border-slate-600/50'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Name (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Role (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                >
                  <option value="user">Knowledge Contributor</option>
                  <option value="reviewer">Reviewer/Admin</option>
                </select>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 gradient-accent rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-violet-500/50 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Login' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Notice */}
          <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg text-center">
            <p className="text-xs text-violet-300">
              💡 Demo: Use any email and password (min 4 chars) to {isLogin ? 'login' : 'register'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
