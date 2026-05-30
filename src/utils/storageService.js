// localStorage service for persistent state management
const STORAGE_KEYS = {
  CLAIMS: 'aiman_claims',
  USER: 'aiman_user',
  REVIEWS: 'aiman_reviews',
};

export const storageService = {
  getClaims: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLAIMS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setClaims: (claims) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    } catch (err) {
      console.error('Failed to save claims:', err);
    }
  },

  addClaim: (claim) => {
    const claims = storageService.getClaims();
    const newClaim = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...claim,
    };
    claims.push(newClaim);
    storageService.setClaims(claims);
    return newClaim;
  },

  updateClaim: (id, updates) => {
    const claims = storageService.getClaims();
    const index = claims.findIndex((c) => c.id === id);
    if (index !== -1) {
      claims[index] = { ...claims[index], ...updates, updatedAt: new Date().toISOString() };
      storageService.setClaims(claims);
      return claims[index];
    }
    return null;
  },

  deleteClaim: (id) => {
    const claims = storageService.getClaims();
    const filtered = claims.filter((c) => c.id !== id);
    storageService.setClaims(filtered);
  },

  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  },

  getReviews: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setReviews: (reviews) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (err) {
      console.error('Failed to save reviews:', err);
    }
  },

  addReview: (review) => {
    const reviews = storageService.getReviews();
    const newReview = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...review,
    };
    reviews.push(newReview);
    storageService.setReviews(reviews);
    return newReview;
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CLAIMS);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    } catch (err) {
      console.error('Failed to clear storage:', err);
    }
  },
};
