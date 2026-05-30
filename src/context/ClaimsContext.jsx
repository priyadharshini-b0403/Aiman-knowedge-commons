import React, { createContext, useContext, useEffect, useState } from 'react';
import { storageService } from '../utils/storageService';
import { calculateKnowledgeScore, suggestAIUsage, normalizeStatus } from '../utils/helpers';

const ClaimsContext = createContext();

const normalizeClaim = (claim) => ({
  ...claim,
  id: String(claim.id),
  status: normalizeStatus(claim.status),
  score: claim.score ?? calculateKnowledgeScore(claim),
  suggestedAiUsage: claim.suggestedAiUsage || claim.aiUsage || suggestAIUsage(claim.category, claim.score ?? 0),
});

export const ClaimsProvider = ({ children }) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedClaims = storageService.getClaims().map(normalizeClaim);
    setClaims(storedClaims);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      storageService.setClaims(claims);
    }
  }, [claims, loading]);

  const addClaim = (claimData) => {
    const score = calculateKnowledgeScore(claimData);
    const now = new Date().toISOString();
    const claim = normalizeClaim({
      ...claimData,
      id: Date.now().toString(),
      status: 'submitted',
      score,
      suggestedAiUsage: suggestAIUsage(claimData.category, score),
      createdAt: now,
      reviews: [],
      reviewerComment: '',
      reviewerScore: null,
      statusHistory: [
        { status: 'submitted', label: 'Submitted', at: now },
        { status: 'needs-review', label: 'Needs Review', at: now },
      ],
    });
    setClaims((prev) => [claim, ...prev]);
    return claim;
  };

  const updateClaim = (id, updates) => {
    const claimId = String(id);
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== claimId) return c;
        const next = { ...c, ...updates };
        if (updates.status) {
          const normalized = normalizeStatus(updates.status);
          const historyEntry = {
            status: normalized,
            label: updates.statusLabel || normalized,
            at: new Date().toISOString(),
          };
          next.status = normalized;
          next.statusHistory = [...(c.statusHistory || []), historyEntry];
        }
        return normalizeClaim(next);
      })
    );
  };

  const deleteClaim = (id) => {
    setClaims((prev) => prev.filter((c) => c.id !== String(id)));
  };

  const getClaimById = (id) => claims.find((c) => c.id === String(id));

  const getClaimsByStatus = (status) => claims.filter((c) => c.status === normalizeStatus(status));

  const getClaimsByCategory = (category) => claims.filter((c) => c.category === category);

  const getClaimsByUser = (userName) => claims.filter((c) => c.contributorName === userName);

  const addReview = (claimId, review) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id !== String(claimId)) return c;
        const reviews = [
          ...(c.reviews || []),
          { ...review, id: Date.now().toString(), createdAt: new Date().toISOString() },
        ];
        return {
          ...c,
          reviews,
          reviewerComment: review.comment || c.reviewerComment,
          reviewerScore: review.score ?? c.reviewerScore,
        };
      })
    );
  };

  return (
    <ClaimsContext.Provider
      value={{
        claims,
        loading,
        addClaim,
        updateClaim,
        deleteClaim,
        getClaimById,
        getClaimsByStatus,
        getClaimsByCategory,
        getClaimsByUser,
        addReview,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
};

export const useClaimsContext = () => {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error('useClaimsContext must be used within ClaimsProvider');
  }
  return context;
};
