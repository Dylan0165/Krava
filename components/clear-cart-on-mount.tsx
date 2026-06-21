"use client";

import { useEffect } from "react";
import { useCart } from "./cart/cart-store";

/** Empties the cart once the success page mounts after a completed checkout. */
export function ClearCartOnMount() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
