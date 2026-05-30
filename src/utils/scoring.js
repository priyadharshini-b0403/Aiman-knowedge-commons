export const generateKnowledgeScore = (claim) => {
  let score = 20;

  if (claim.description.length > 150) score += 30;
  if (claim.evidence) score += 20;
  if (claim.contributor) score += 10;
  if (claim.consent) score += 20;

  return Math.min(score, 100);
};

export const generateSuggestedUsage = (score) => {
  if (score > 80) return "Useful for AI Training";
  if (score > 60) return "Useful for Knowledge Base";
  if (score > 40) return "Useful for AI Evaluation";

  return "Needs Improvement";
};