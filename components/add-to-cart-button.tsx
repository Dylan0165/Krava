"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { useCart } from "./cart/cart-store";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  variant,
  className = "",
  label = "Add to Cart",
}: {
  product: Product;
  variant?: string;
  className?: string;
  label?: string;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variant,
        price: product.price,
        currency: product.currency,
        image: product.image,
      },
      1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-solid ${className}`}
      aria-live="polite"
    >
      {added ? (
        <>
          Added <Check size={15} weight="bold" />
        </>
      ) : (
        <>
          {label} <ArrowRight size={15} weight="bold" />
        </>
      )}
    </button>
  );
}
