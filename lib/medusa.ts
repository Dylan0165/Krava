import type { Product } from "./types";
import {
  getAllProducts as localAll,
  getProductBySlug as localBySlug,
  getHeroProduct as localHero,
} from "./products";

/**
 * Medusa-ready data layer.
 *
 * The storefront reads products through these functions. When a Medusa
 * backend is configured (NEXT_PUBLIC_MEDUSA_BACKEND_URL) and reachable, this
 * is where you map Medusa's product shape onto the local `Product` type. Until
 * then — and whenever the backend is down — it falls back to the local
 * catalogue so the site always renders.
 *
 * To go live with Medusa:
 *   1. Set NEXT_PUBLIC_MEDUSA_BACKEND_URL and NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY.
 *   2. Install @medusajs/js-sdk (already in package.json).
 *   3. Implement `fetchMedusaProducts()` below and map fields in `toProduct()`.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const MEDUSA_ENABLED =
  process.env.NEXT_PUBLIC_USE_MEDUSA === "true" && Boolean(BACKEND_URL);

// Placeholder mapper — flesh this out against your real Medusa product/region
// payload once the backend is seeded. Kept here so the integration point is
// obvious and typed.
//
// function toProduct(m: HttpTypes.StoreProduct, regionId: string): Product { ... }

async function fetchMedusaProducts(): Promise<Product[] | null> {
  if (!MEDUSA_ENABLED) return null;
  try {
    // const { Medusa } = await import("@medusajs/js-sdk");
    // const sdk = new Medusa({
    //   baseUrl: BACKEND_URL!,
    //   publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    // });
    // const { products } = await sdk.store.product.list({ limit: 100 });
    // return products.map((p) => toProduct(p));
    return null; // not implemented yet → caller uses local fallback
  } catch {
    return null;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const remote = await fetchMedusaProducts();
  return remote && remote.length > 0 ? remote : localAll();
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const remote = await fetchMedusaProducts();
  if (remote && remote.length > 0) {
    return remote.find((p) => p.slug === slug);
  }
  return localBySlug(slug);
}

export async function getHeroProduct(): Promise<Product> {
  const remote = await fetchMedusaProducts();
  if (remote && remote.length > 0) {
    return remote.find((p) => p.hero) ?? remote[0];
  }
  return localHero();
}
