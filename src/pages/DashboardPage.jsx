import { useState } from 'react';
import { useClaimsContext } from '../context/ClaimsContext';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, BarChart3, CheckCircle2, Clock, TrendingUp, Eye } from 'lucide-react';
import { CATEGORIES, STATUSES } from '../utils/constants';
import { formatRelativeTime, getStatusColor, getCategoryColor, getStatusLabel, normalizeStatus } from '../utils/helpers';

const DashboardPage = () => {
  const { claims } = useClaimsContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = claim.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || claim.category === categoryFilter;
    const matchesStatus = !statusFilter || normalizeStatus(claim.status) === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = [
    { label: 'Total Claims', value: claims.length, icon: BarChart3 },
    {
      label: 'Verified',
      value: claims.filter((c) => normalizeStatus(c.status) === 'verified').length,
      icon: CheckCircle2,
    },
    {
      label: 'Pending',
      value: claims.filter((c) =>
        ['submitted', 'needs-review', 'needs-more-evidence'].includes(normalizeStatus(c.status))
      ).length,
      icon: Clock,
    },
    {
      label: 'Avg Score',
      value: claims.length
        ? Math.round(claims.reduce((sum, c) => sum + (c.score || 0), 0) / claims.length)
        : 0,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="gradient-text">My Dashboard</span>
            </h1>
            <p className="text-lg text-slate-400">All knowledge claims saved in your browser</p>
          </div>
          <button
            onClick={() => navigate('/submit')}
            className="px-6 py-3 gradient-accent rounded-xl font-semibold text-white shrink-0"
          >
            Submit Knowledge
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-light rounded-2xl p-5 border border-slate-700/50">
                <Icon size={22} className="text-violet-400 mb-3" />
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-light rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:border-violet-500/50 focus:outline-none"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:border-violet-500/50 focus:outline-none"
            >
              <option value="">All statuses</option>
              {STATUSES.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="glass-light rounded-2xl p-16 border border-slate-700/50 text-center">
              <Zap size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No claims found</h3>
              <p className="text-slate-400 mb-6">Submit your first knowledge claim to get started</p>
              <button
                onClick={() => navigate('/submit')}
                className="px-6 py-2 gradient-accent rounded-lg font-semibold text-white"
              >
                Submit Knowledge
              </button>
            </div>
          ) : (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className="glass-light rounded-xl p-6 border border-slate-700/50 card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold truncate">{claim.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(claim.category)}`}
                      >
                        {claim.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}
                      >
                        {getStatusLabel(claim.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="text-right">
                      <p className="score-label !mb-1 !normal-case">Knowledge Value Score</p>
                      <p className="text-2xl font-bold score-value">{claim.score ?? 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Submitted</p>
                      <p className="text-sm text-slate-300">{formatRelativeTime(claim.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/claim/${claim.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 transition shrink-0"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
