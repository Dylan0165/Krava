"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ArrowRight, Path } from "@phosphor-icons/react";
import { useCart, selectSubtotal, selectCount } from "./cart-store";
import { useHydrated } from "./cart-provider";
import { formatPrice } from "@/lib/format";
import { getStripe } from "@/lib/stripe-client";

export function CartDrawer() {
  const hydrated = useHydrated();
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart(selectSubtotal);
  const count = useCart(selectCount);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  async function checkout() {
    setError(null);
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            title: l.variant ? `${l.title} — ${l.variant}` : l.title,
            price: l.price,
            currency: l.currency,
            qty: l.qty,
            image: l.image,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || (!data.url && !data.id)) {
        setError(data.error ?? "Checkout is not configured yet.");
        return;
      }

      // Prefer Stripe.js redirect (uses the publishable key loaded client-side);
      // fall back to the hosted Checkout URL if Stripe.js is unavailable.
      const stripe = await getStripe();
      if (stripe && data.id) {
        const { error: redirectError } = await stripe.redirectToCheckout({
          sessionId: data.id,
        });
        if (redirectError) {
          if (data.url) window.location.href = data.url;
          else setError(redirectError.message ?? "Could not open checkout.");
        }
      } else if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not open checkout.");
      }
    } catch {
      setError("Could not reach checkout. Add your Stripe keys to .env.local.");
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-label="Cart"
            className="fixed right-0 top-0 z-[71] flex h-[100dvh] w-full max-w-[440px] flex-col border-l border-seam bg-coal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
          >
            <header className="flex items-center justify-between border-b border-seam px-6 py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[13px] uppercase tracking-brand">
                  Your Kit
                </span>
                <span className="font-display text-[11px] text-ash">
                  {hydrated ? count : 0}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="text-ash transition-colors hover:text-bone"
              >
                <X size={20} weight="light" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6">
              {!hydrated ? null : lines.length === 0 ? (
                <EmptyCart onClose={close} />
              ) : (
                <ul className="divide-y divide-seam">
                  {lines.map((l) => (
                    <li key={l.id} className="flex gap-4 py-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-carbon">
                        <Image
                          src={l.image}
                          alt={l.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="font-display text-[13px] uppercase tracking-wider">
                              {l.title}
                            </p>
                            {l.variant && (
                              <p className="mt-0.5 text-[12px] text-ash">
                                {l.variant}
                              </p>
                            )}
                          </div>
                          <p className="font-display text-[13px] text-sand">
                            {formatPrice(l.price * l.qty, l.currency)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-seam">
                            <button
                              onClick={() => setQty(l.id, l.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center text-ash transition-colors hover:text-bone"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-8 text-center font-display text-[12px]">
                              {l.qty}
                            </span>
                            <button
                              onClick={() => setQty(l.id, l.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center text-ash transition-colors hover:text-bone"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(l.id)}
                            className="text-[11px] uppercase tracking-wider text-ash transition-colors hover:text-bone"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {hydrated && lines.length > 0 && (
              <footer className="border-t border-seam px-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-wider text-ash">
                    Subtotal
                  </span>
                  <span className="font-display text-lg text-bone">
                    {formatPrice(subtotal, lines[0]?.currency ?? "EUR")}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ash">
                  Shipping and taxes calculated at checkout.
                </p>
                {error && (
                  <p className="mt-3 border border-seam bg-carbon px-3 py-2 text-[11px] text-sand-soft">
                    {error}
                  </p>
                )}
                <button
                  onClick={checkout}
                  disabled={checkingOut}
                  className="btn-solid mt-4 w-full disabled:opacity-60"
                >
                  {checkingOut ? "Opening checkout…" : "Checkout"}
                  {!checkingOut && <ArrowRight size={15} weight="bold" />}
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-20 text-center">
      <div className="grid h-16 w-16 place-items-center border border-seam text-sand">
        <Path size={26} weight="light" />
      </div>
      <p className="mt-6 font-display text-[13px] uppercase tracking-brand">
        Your kit is empty
      </p>
      <p className="mt-2 max-w-[24ch] text-[13px] leading-relaxed text-ash">
        Nothing packed yet. Find the gear that goes the distance.
      </p>
      <Link href="/products" onClick={onClose} className="btn-outline mt-7">
        Browse Gear
      </Link>
    </div>
  );
}
