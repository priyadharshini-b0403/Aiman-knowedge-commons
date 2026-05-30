import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useClaimsContext } from '../context/ClaimsContext';
import { useAuth } from '../context/AuthContext';
import { AI_USEFULNESS_OPTIONS } from '../utils/constants';
import {
  formatRelativeTime,
  getStatusColor,
  getCategoryColor,
  normalizeStatus,
  getStatusLabel,
} from '../utils/helpers';
import {
  Inbox,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Clock,
} from 'lucide-react';

const PENDING_STATUSES = ['submitted', 'needs-review', 'needs-more-evidence'];
const DONE_STATUSES = ['verified', 'rejected'];

const ReviewerDashboard = () => {
  const { claims, updateClaim, addReview, loading } = useClaimsContext();
  const { user } = useAuth();
  const [tab, setTab] = useState('queue');
  const [selectedId, setSelectedId] = useState(null);
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(50);
  const [aiUsefulness, setAiUsefulness] = useState('');

  const queueClaims = useMemo(
    () =>
      claims
        .filter((c) => PENDING_STATUSES.includes(normalizeStatus(c.status)))
        .sort((a, b) => (b.score || 0) - (a.score || 0)),
    [claims]
  );

  const reviewedClaims = useMemo(
    () =>
      claims
        .filter((c) => DONE_STATUSES.includes(normalizeStatus(c.status)))
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        ),
    [claims]
  );

  const selected = queueClaims.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    if (tab !== 'queue') return;
    if (!queueClaims.length) {
      setSelectedId(null);
      return;
    }
    const stillInQueue = queueClaims.some((c) => c.id === selectedId);
    if (!stillInQueue) {
      setSelectedId(queueClaims[0].id);
    }
  }, [queueClaims, tab, selectedId]);

  useEffect(() => {
    if (!selected) return;
    setScore(selected.reviewerScore ?? selected.score ?? 50);
    setComment('');
    setAiUsefulness(selected.suggestedAiUsage || AI_USEFULNESS_OPTIONS[0] || '');
  }, [selected?.id]);

  const submitDecision = (decision) => {
    if (!selected) return;

    const statusMap = {
      approve: 'verified',
      reject: 'rejected',
      evidence: 'needs-more-evidence',
    };
    const newStatus = statusMap[decision];

    addReview(selected.id, {
      approved: decision === 'approve',
      score,
      comment,
      aiUsefulness,
      reviewerName: user?.name || user?.email || 'Reviewer',
      decision,
    });

    updateClaim(selected.id, {
      status: newStatus,
      statusLabel: getStatusLabel(newStatus),
      reviewerScore: score,
      reviewerComment: comment,
      suggestedAiUsage: aiUsefulness,
    });

    const currentIndex = queueClaims.findIndex((c) => c.id === selected.id);
    const next = queueClaims[currentIndex + 1];
    setSelectedId(next?.id ?? null);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">Review Claims</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              High-score claims first · one-click decisions · auto-next in queue
            </p>
          </div>
          <div className="flex gap-3">
            <div className="glass-light rounded-xl px-4 py-2 border border-amber-500/25 text-center min-w-[88px]">
              <p className="text-2xl font-bold text-amber-300">{queueClaims.length}</p>
              <p className="text-xs text-slate-400">To review</p>
            </div>
            <div className="glass-light rounded-xl px-4 py-2 border border-emerald-500/25 text-center min-w-[88px]">
              <p className="text-2xl font-bold text-emerald-300">{reviewedClaims.length}</p>
              <p className="text-xs text-slate-400">Done</p>
            </div>
          </div>
        </header>

        <div className="flex gap-2 mb-6 p-1 glass-light rounded-xl border border-violet-500/20 w-fit">
          <button
            type="button"
            onClick={() => setTab('queue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === 'queue' ? 'nav-active' : 'text-slate-400 hover:text-violet-200'
            }`}
          >
            <Inbox size={16} />
            Queue
            {queueClaims.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-300">
                {queueClaims.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setTab('done')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === 'done' ? 'nav-active' : 'text-slate-400 hover:text-violet-200'
            }`}
          >
            <FileCheck size={16} />
            Completed
            {reviewedClaims.length > 0 && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300">
                {reviewedClaims.length}
              </span>
            )}
          </button>
        </div>

        {tab === 'queue' ? (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
                Waiting ({queueClaims.length})
              </p>
              {queueClaims.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="No queue"
                  message="No claims waiting for review. New submissions will appear here."
                  action={{ to: '/submit', label: 'Submit a test claim' }}
                />
              ) : (
                queueClaims.map((claim, i) => (
                  <button
                    key={claim.id}
                    type="button"
                    onClick={() => setSelectedId(claim.id)}
                    className={`w-full text-left glass-light rounded-xl p-4 border transition ${
                      selectedId === claim.id
                        ? 'border-violet-500/50 ring-1 ring-violet-500/30'
                        : 'border-violet-500/15 hover:border-violet-500/35'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm line-clamp-1">{claim.title}</p>
                      <span className="text-xs text-violet-400 font-bold shrink-0">
                        #{i + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="score-badge">{claim.score}/100</span>
                      <span className="text-xs text-slate-500">
                        {formatRelativeTime(claim.createdAt)}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="lg:col-span-3">
              {selected ? (
                <ReviewPanel
                  claim={selected}
                  score={score}
                  setScore={setScore}
                  comment={comment}
                  setComment={setComment}
                  aiUsefulness={aiUsefulness}
                  setAiUsefulness={setAiUsefulness}
                  onDecision={submitDecision}
                />
              ) : (
                <EmptyState
                  icon={Clock}
                  title={queueClaims.length ? 'Pick a claim' : 'No queue'}
                  message={
                    queueClaims.length
                      ? 'Select a claim from the list to review it here.'
                      : 'Queue is empty. Nothing to review right now.'
                  }
                />
              )}
            </div>
          </div>
        ) : (
          <div>
            {reviewedClaims.length === 0 ? (
              <EmptyState
                icon={FileCheck}
                title="No claims"
                message="Verified or rejected claims will show here after you complete reviews."
              />
            ) : (
              <ul className="space-y-2">
                {reviewedClaims.map((claim) => (
                  <li
                    key={claim.id}
                    className="glass-light rounded-xl p-4 border border-violet-500/15 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{claim.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatRelativeTime(claim.updatedAt || claim.createdAt)}
                        {claim.reviewerScore != null && ` · Score ${claim.reviewerScore}`}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs border shrink-0 ${getStatusColor(claim.status)}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                    <Link
                      to={`/claim/${claim.id}`}
                      className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 shrink-0"
                    >
                      Details <ChevronRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="glass-light rounded-xl p-10 border border-violet-500/20 text-center">
      <Icon size={40} className="mx-auto text-slate-600 mb-4 opacity-60" />
      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm mx-auto">{message}</p>
      {action && (
        <Link
          to={action.to}
          className="inline-block mt-4 text-sm text-violet-400 hover:text-violet-300 font-medium"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

function ReviewPanel({
  claim,
  score,
  setScore,
  comment,
  setComment,
  aiUsefulness,
  setAiUsefulness,
  onDecision,
}) {
  return (
    <div className="glass-light rounded-2xl p-6 border border-violet-500/25 space-y-5 sticky top-20">
      <div>
        <p className="text-xs text-violet-400 font-semibold uppercase mb-1">Now reviewing</p>
        <h2 className="text-xl font-bold">{claim.title}</h2>
        <p className="text-sm text-slate-400 mt-2 line-clamp-4">{claim.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`px-2 py-0.5 rounded text-xs border ${getCategoryColor(claim.category)}`}>
          {claim.category}
        </span>
        <span className="score-badge">Auto score: {claim.score}/100</span>
        <span className="text-xs text-slate-500">{claim.contributorName || 'Anonymous'}</span>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">
          Your score: <span className="score-value">{score}</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">AI usefulness</label>
        <select
          value={aiUsefulness}
          onChange={(e) => setAiUsefulness(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/60 border border-violet-500/20 rounded-lg text-sm text-white focus:border-violet-500/50 focus:outline-none"
        >
          {AI_USEFULNESS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">Comment (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          placeholder="Short note for the contributor..."
          className="w-full px-3 py-2 bg-slate-900/60 border border-violet-500/20 rounded-lg text-sm text-white placeholder-slate-500 resize-none focus:border-violet-500/50 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
        <button
          type="button"
          onClick={() => onDecision('approve')}
          className="py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/30 flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 size={16} /> Approve
        </button>
        <button
          type="button"
          onClick={() => onDecision('evidence')}
          className="py-2.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/30 flex items-center justify-center gap-1.5"
        >
          <AlertCircle size={16} /> More info
        </button>
        <button
          type="button"
          onClick={() => onDecision('reject')}
          className="py-2.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-sm font-semibold hover:bg-red-500/30 flex items-center justify-center gap-1.5"
        >
          <XCircle size={16} /> Reject
        </button>
      </div>

      <Link
        to={`/claim/${claim.id}`}
        className="block text-center text-xs text-slate-500 hover:text-violet-400"
      >
        Open full claim details
      </Link>
    </div>
  );
}

export default ReviewerDashboard;
