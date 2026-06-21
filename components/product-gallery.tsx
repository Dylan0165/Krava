"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery.length ? product.gallery : [product.image];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
        <Image
          key={active}
          src={images[active]}
          alt={product.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="animate-fade-up object-cover"
        />
        {product.bestseller && (
          <span className="absolute left-0 top-5 bg-sand px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-brand text-ink">
            Bestseller
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square overflow-hidden bg-carbon transition-all duration-300 ease-brand ${
                i === active
                  ? "ring-1 ring-sand"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
