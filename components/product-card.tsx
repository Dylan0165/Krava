"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Truck } from "@phosphor-icons/react";
import { useCart } from "./cart/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const add = useCart((s) => s.add);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      currency: product.currency,
      image: product.image,
      variant: product.variants?.[0]?.title,
    });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
        {/* Signature: image eases in to scale 1.03 over 400ms on hover */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-[400ms] ease-brand group-hover:scale-[1.03]"
        />

        {/* Gold left accent grows in on hover */}
        <span className="absolute left-0 top-0 z-10 h-full w-[3px] origin-bottom scale-y-0 bg-sand transition-transform duration-[400ms] ease-brand group-hover:scale-y-100" />

        {/* Bestseller badge */}
        {product.bestseller && (
          <span className="absolute left-0 top-4 bg-sand px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-brand text-ink">
            Bestseller
          </span>
        )}

        {/* Quick add — slides up on hover (desktop), always tappable on mobile */}
        <button
          onClick={quickAdd}
          aria-label={`Add ${product.title} to cart`}
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center border border-seam bg-ink/80 text-bone backdrop-blur-sm transition-all duration-300 ease-brand hover:border-sand hover:text-sand md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <Plus size={17} weight="bold" />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[13px] uppercase tracking-wider text-bone">
            {product.title}
          </h3>
          <p className="mt-1 max-w-[28ch] text-[12px] leading-snug text-ash">
            {product.blurb}
          </p>
        </div>
        <p className="shrink-0 font-display text-[13px] text-sand">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      {/* Shipping + returns reassurance */}
      <div className="mt-2.5 space-y-1 border-t border-seam/60 pt-2.5">
        <p className="flex items-center gap-1.5 text-[11px] text-ash">
          <Truck size={13} weight="light" className="text-sand" />
          Delivered in 4–7 days
        </p>
        <p className="text-[11px] text-ash">Free returns within 30 days</p>
      </div>
    </Link>
  );
}
