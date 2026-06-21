"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";

/**
 * Lazily loads Stripe.js on the client using the publishable key.
 * NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is inlined into the client bundle at build
 * time (NEXT_PUBLIC_ prefix), so this is how the key is "loaded in the client".
 */
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = PUBLISHABLE_KEY
      ? loadStripe(PUBLISHABLE_KEY)
      : Promise.resolve(null);
  }
  return stripePromise;
}

export const stripeConfigured = Boolean(PUBLISHABLE_KEY);
