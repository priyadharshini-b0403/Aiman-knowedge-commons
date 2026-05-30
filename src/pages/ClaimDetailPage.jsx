import { useParams, useNavigate } from 'react-router-dom';
import { useClaimsContext } from '../context/ClaimsContext';
import {
  formatDate,
  getStatusColor,
  getCategoryColor,
  getStatusLabel,
} from '../utils/helpers';
import {
  ArrowLeft,
  Link as LinkIcon,
  MessageSquare,
  TrendingUp,
  Zap,
} from 'lucide-react';
import KnowledgeScoreDisplay, { ScorePanel } from '../components/KnowledgeScoreDisplay';
import StatusTimeline from '../components/StatusTimeline';

const ClaimDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { claims } = useClaimsContext();

  const claim = claims.find((c) => c.id === String(id));

  if (!claim) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Claim not found</h1>
          <p className="text-slate-400 mb-6">This claim may have been removed or the link is invalid.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 gradient-accent rounded-lg font-semibold text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const aiUsage = claim.suggestedAiUsage || claim.aiUsage || [];
  const latestReview = claim.reviews?.[claim.reviews.length - 1];
  const reviewerComment = claim.reviewerComment || latestReview?.comment;
  const reviewerScore = claim.reviewerScore ?? claim.reviewScore ?? latestReview?.score;

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-midnight-100/30 to-transparent p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 glass-light rounded-lg border border-slate-700/50 hover:border-violet-500/50 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="glass-light rounded-2xl p-8 border border-slate-700/50">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{claim.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(claim.category)}`}>
                  {claim.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(claim.status)}`}>
                  {getStatusLabel(claim.status)}
                </span>
              </div>
            </div>

            <div className="glass-light rounded-2xl p-8 border border-slate-700/50 space-y-6">
              <h2 className="text-xl font-bold">Claim information</h2>
              <Field label="Description" value={claim.description} />
              {claim.whyUseful && <Field label="Why this knowledge is useful" value={claim.whyUseful} />}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Location" value={claim.location || '—'} />
                <Field label="Date" value={claim.observationDate ? formatDate(claim.observationDate) : '—'} />
                <Field label="Contributor" value={claim.contributorName} />
                <Field label="Consent" value={claim.consent ? 'Yes — agreed to participate' : 'No'} />
              </div>
            </div>

            <div className="glass-light rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-4">Evidence</h2>
              <div className="space-y-3">
                {claim.evidenceLink ? (
                  <a
                    href={claim.evidenceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg hover:bg-violet-500/20 transition break-all"
                  >
                    <LinkIcon size={18} className="text-violet-400 flex-shrink-0" />
                    <span className="text-violet-300">{claim.evidenceLink}</span>
                  </a>
                ) : null}
                {claim.file ? (
                  <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300">
                    Uploaded file (mock): {claim.file}
                  </div>
                ) : null}
                {!claim.evidenceLink && !claim.file && (
                  <p className="text-slate-400">No evidence attached</p>
                )}
              </div>
            </div>

            {(reviewerComment || reviewerScore != null) && (
              <div className="glass-light rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={22} />
                  Reviewer feedback
                </h2>
                {reviewerScore != null && (
                  <p className="text-slate-300 mb-3">
                    <span className="text-slate-400">Reviewer score:</span>{' '}
                    <span className="font-bold text-emerald-400">{reviewerScore}/100</span>
                  </p>
                )}
                {reviewerComment ? (
                  <p className="text-slate-300 leading-relaxed">{reviewerComment}</p>
                ) : (
                  <p className="text-slate-500 text-sm">No written feedback yet.</p>
                )}
              </div>
            )}

            {claim.reviews && claim.reviews.length > 0 && (
              <div className="glass-light rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-xl font-bold mb-4">Review history</h2>
                <div className="space-y-4">
                  {claim.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <p className="text-xs text-slate-400 mb-2">{formatDate(review.createdAt)}</p>
                      {review.comment && <p className="text-slate-300">{review.comment}</p>}
                      {review.score != null && (
                        <p className="text-sm text-slate-400 mt-2">Score: {review.score}/100</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1 space-y-6">
            <ScorePanel className="!p-6">
              <KnowledgeScoreDisplay score={claim.score ?? 0} size="lg" />

              <p className="score-label">Suggested AI usage</p>
              <div className="space-y-2 mb-6">
                {aiUsage.length > 0 ? (
                  aiUsage.map((usage, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 score-tip rounded-lg">
                      <Zap size={14} className="text-violet-500 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{usage}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm score-suffix">Not yet assessed</p>
                )}
              </div>

              <p className="score-label mb-2">Current status</p>
              <p className={`inline-block px-3 py-1 rounded-full text-sm border mb-6 ${getStatusColor(claim.status)}`}>
                {getStatusLabel(claim.status)}
              </p>

              <div className="pt-4 border-t border-[var(--score-panel-border)]">
                <p className="score-label mb-4 flex items-center gap-1">
                  <TrendingUp size={14} />
                  Status timeline
                </p>
                <StatusTimeline claim={claim} />
              </div>
            </ScorePanel>

            <div className="glass-light rounded-2xl p-6 border border-slate-700/50 text-sm">
              <p className="text-slate-400 mb-1">Submitted</p>
              <p className="font-medium mb-4">{formatDate(claim.createdAt)}</p>
              <p className="text-slate-400 mb-1">Claim ID</p>
              <p className="font-mono text-xs text-slate-500 break-all">{claim.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-400 uppercase mb-1">{label}</p>
    <p className="text-slate-200 whitespace-pre-wrap">{value}</p>
  </div>
);

export default ClaimDetailPage;
