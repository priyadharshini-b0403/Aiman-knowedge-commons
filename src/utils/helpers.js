import { AI_USAGE_SUGGESTIONS, STATUSES } from './constants';

export const normalizeStatus = (status) => {
  if (!status) return 'submitted';
  const map = {
    Submitted: 'submitted',
    'Needs Review': 'needs-review',
    Verified: 'verified',
    Rejected: 'rejected',
    'Needs More Evidence': 'needs-more-evidence',
  };
  return map[status] || status.toLowerCase().replace(/\s+/g, '-');
};

export const getStatusLabel = (status) => {
  const normalized = normalizeStatus(status);
  const found = STATUSES.find((s) => s.value === normalized);
  return found?.label || status;
};

export const calculateKnowledgeScore = (claim) => {
  let score = 10;

  const descLen = (claim.description || '').length;
  if (descLen >= 300) score += 40;
  else if (descLen >= 150) score += 30;
  else if (descLen >= 80) score += 20;
  else if (descLen >= 40) score += 12;
  else if (descLen >= 20) score += 5;

  if (claim.evidenceLink?.trim()) score += 15;
  if (claim.contributorName?.trim()) score += 10;
  if (claim.consent) score += 15;
  if (claim.file) score += 5;

  return Math.min(Math.round(score), 100);
};

export const suggestAIUsage = (category, score) => {
  if (score < 35) return ['Not Suitable'];

  const byCategory = {
    'Field Observation': ['Useful for AI Training', 'Useful for AI Evaluation'],
    'Local Knowledge': ['Useful for Knowledge Base', 'Useful for AI Training'],
    'AI Correction': ['Useful as Correction Feedback', 'Useful for AI Evaluation'],
    'Expert Knowledge': ['Useful for Knowledge Base', 'Useful for AI Training'],
    'Creative Idea': ['Useful for Knowledge Base', 'Useful for AI Evaluation'],
    'Infrastructure Issue': ['Useful as Correction Feedback', 'Useful for Knowledge Base'],
    'Environment/Climate Observation': ['Useful for AI Training', 'Useful for AI Evaluation'],
    Other: ['Useful for Knowledge Base'],
  };

  const suggestions = byCategory[category] || ['Useful for Knowledge Base'];

  if (score >= 75) return suggestions;
  if (score >= 50) return [suggestions[0]];
  return ['Not Suitable'];
};

export const generateAISuggestions = (category, score) => suggestAIUsage(category, score);

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
};

export const getStatusColor = (status) => {
  const normalized = normalizeStatus(status);
  const colors = {
    submitted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'needs-review': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'needs-more-evidence': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    verified: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return colors[normalized] || colors.submitted;
};

export const getCategoryColor = (category) => {
  const colors = {
    'Field Observation': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    'Local Knowledge': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'AI Correction': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    'Expert Knowledge': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'Creative Idea': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'Infrastructure Issue': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Environment/Climate Observation': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Environment Observation': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Other: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  };
  return colors[category] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
};
