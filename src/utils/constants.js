export const CATEGORIES = [
  'Field Observation',
  'Local Knowledge',
  'AI Correction',
  'Expert Knowledge',
  'Creative Idea',
  'Infrastructure Issue',
  'Environment/Climate Observation',
  'Other',
];

export const STATUSES = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'needs-review', label: 'Needs Review' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'needs-more-evidence', label: 'Needs More Evidence' },
];

export const AI_USAGE_SUGGESTIONS = [
  'Useful for AI Training',
  'Useful for AI Evaluation',
  'Useful for Knowledge Base',
  'Useful as Correction Feedback',
  'Not Suitable',
];

export const MOCK_STATS = {
  totalClaims: 1247,
  verifiedClaims: 892,
  pendingReview: 245,
  avgScore: 78,
  activeReviewers: 23,
  verificationRate: 71,
};

// Legacy export for reviewer dashboard
export const AI_USEFULNESS_OPTIONS = AI_USAGE_SUGGESTIONS;
