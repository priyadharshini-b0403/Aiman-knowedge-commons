import { createContext, useEffect, useState } from "react";

export const ClaimContext = createContext();

export const ClaimProvider = ({ children }) => {
  const [claims, setClaims] = useState(() => {
    const stored = localStorage.getItem("claims");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("claims", JSON.stringify(claims));
  }, [claims]);

  const addClaim = (claim) => {
    setClaims((prev) => [...prev, claim]);
  };

  const updateClaim = (updatedClaim) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === updatedClaim.id ? updatedClaim : c))
    );
  };

  return (
    <ClaimContext.Provider value={{ claims, addClaim, updateClaim }}>
      {children}
    </ClaimContext.Provider>
  );
};