import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeSettings from './ThemeSettings';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/submit', label: 'Submit Claim' },
  { to: '/reviewer', label: 'Review Claims' },
];

const AppHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-light border-b h-16">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-400 via-fuchsia-500 to-amber-400 rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-fuchsia transition-shadow">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-semibold gradient-text hidden sm:inline">AIMan Knowledge Commons</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <nav className="flex items-center gap-1 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2 md:px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  pathname === link.to
                    ? 'nav-active'
                    : 'text-slate-400 hover:text-violet-200 hover:bg-violet-500/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-6 w-px bg-violet-500/30 hidden sm:block shrink-0" />

          <ThemeSettings />

          {!loading && (
            <div className="flex items-center gap-2 shrink-0">
              {isAuthenticated ? (
                <>
                  <span className="hidden md:flex items-center gap-1.5 px-2 py-1 text-xs text-violet-200/90 max-w-[140px] truncate">
                    <User size={14} className="text-violet-400 shrink-0" />
                    {user?.name || user?.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  state={{ from: pathname === '/login' ? '/dashboard' : pathname }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium gradient-accent text-white hover:shadow-glow transition"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
