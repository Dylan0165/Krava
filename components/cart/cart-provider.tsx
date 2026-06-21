"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Guards against hydration mismatch: the zustand cart persists to localStorage,
 * so counts/subtotals must only render after the client has mounted. Children
 * read `useHydrated()` to know when persisted state is trustworthy.
 */
const HydrationContext = createContext(false);

export function useHydrated() {
  return useContext(HydrationContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <HydrationContext.Provider value={hydrated}>
      {children}
    </HydrationContext.Provider>
  );
}
