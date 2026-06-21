"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string; // unique line id (product + variant)
  productId: string;
  slug: string;
  title: string;
  variant?: string;
  price: number; // cents
  currency: string;
  image: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (line: Omit<CartLine, "id" | "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const lineId = (productId: string, variant?: string) =>
  variant ? `${productId}::${variant}` : productId;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (line, qty = 1) =>
        set((s) => {
          const id = lineId(line.productId, line.variant);
          const existing = s.lines.find((l) => l.id === id);
          if (existing) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                l.id === id ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { isOpen: true, lines: [...s.lines, { ...line, id, qty }] };
        }),
      remove: (id) =>
        set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "krava-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export const selectCount = (s: CartState) =>
  s.lines.reduce((n, l) => n + l.qty, 0);

export const selectSubtotal = (s: CartState) =>
  s.lines.reduce((n, l) => n + l.qty * l.price, 0);
