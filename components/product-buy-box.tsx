"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Lock,
  Package,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { useCart } from "./cart/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

// Client-only social-proof counter. Renders nothing on the server so there's
// no hydration mismatch from the random value; fills in after mount.
function LiveViewers() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    setN(4 + Math.floor(Math.random() * 9)); // 4–12
  }, []);
  if (n === null) return null;
  return (
    <p className="mt-6 flex items-center gap-2 text-[12px] text-ash">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sand opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-sand" />
      </span>
      <span>
        <span className="text-bone">{n} people</span> viewing this right now
      </span>
    </p>
  );
}

export function ProductBuyBox({ product }: { product: Product }) {
  const hasVariants = Boolean(product.variants?.length);
  const [variant, setVariant] = useState<string | undefined>(
    product.variants?.[0]?.title,
  );
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  function handleAdd() {
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      variant,
      price: product.price,
      currency: product.currency,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      {/* Price */}
      <p className="mt-5 font-display text-3xl text-sand">
        {formatPrice(product.price, product.currency)}
      </p>

      {/* Benefits */}
      <ul className="mt-8 space-y-4 border-t border-seam pt-8">
        {product.benefits.map((b) => (
          <li key={b.title} className="flex gap-3.5">
            <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-sand" />
            <div>
              <p className="font-display text-[13px] uppercase tracking-wider text-bone">
                {b.title}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ash">
                {b.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Variant selector */}
      {hasVariants && (
        <div className="mt-8">
          <p className="eyebrow mb-3 text-ash">Select size</p>
          <div className="flex flex-wrap gap-2.5">
            {product.variants!.map((v) => {
              const active = v.title === variant;
              return (
                <button
                  key={v.id}
                  onClick={() => setVariant(v.title)}
                  className={`min-w-[64px] border px-4 py-2.5 font-display text-[12px] uppercase tracking-wider transition-all duration-300 ease-brand ${
                    active
                      ? "border-sand bg-sand text-ink"
                      : "border-seam text-bone hover:border-sand"
                  }`}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Urgency / social proof */}
      <LiveViewers />

      {/* Desktop / inline add to cart */}
      <button onClick={handleAdd} className="btn-solid mt-4 w-full">
        {added ? (
          <>
            Added to kit <Check size={15} weight="bold" />
          </>
        ) : (
          <>
            Add to Cart <ArrowRight size={15} weight="bold" />
          </>
        )}
      </button>

      {/* Trust bar */}
      <div className="mt-7 grid grid-cols-3 divide-x divide-seam border-y border-seam">
        <TrustCell icon={<Lock size={18} weight="light" />} label="Secure checkout" />
        <TrustCell icon={<Package size={18} weight="light" />} label="4–7 day delivery" />
        <TrustCell
          icon={<ArrowCounterClockwise size={18} weight="light" />}
          label="30-day returns"
        />
      </div>

      {/* Sticky mobile bar (pinned bottom on small screens) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-seam bg-coal/95 px-5 py-3.5 backdrop-blur-md md:hidden">
        <div>
          <p className="font-display text-[11px] uppercase tracking-wider text-bone">
            {product.title}
          </p>
          <p className="font-display text-[15px] text-sand">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-solid flex-1 max-w-[60%] px-5 py-3"
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}

function TrustCell({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
      <span className="text-sand">{icon}</span>
      <span className="text-[10px] uppercase tracking-wider text-ash">
        {label}
      </span>
    </div>
  );
}
