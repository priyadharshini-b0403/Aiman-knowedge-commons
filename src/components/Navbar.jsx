import React, { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen, user }) => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-light border-b border-slate-700/50 h-16 flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg gradient-text hidden sm:inline">AIMan</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800/50 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 glass-light rounded-lg border border-slate-700/50 py-2 min-w-48 shadow-xl">
                  <div className="px-4 py-2 border-b border-slate-700/50">
                    <p className="text-sm text-slate-400">Logged in as</p>
                    <p className="font-semibold">{user.email}</p>
                    <p className="text-xs text-violet-300 mt-1 capitalize">Role: {user.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800/50 transition text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;