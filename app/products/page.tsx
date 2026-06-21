import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Products",
  description: "The full KRAVA range. Built for the elements.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-shell px-5 pb-28 pt-28 md:px-10 md:pb-36 md:pt-36">
      <header className="border-b border-seam pb-10">
        <p className="eyebrow">All Gear</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
          The Range
        </h1>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ash">
          Five pieces, each earned a place. No filler — only the gear that goes
          the distance when the weather turns.
        </p>
      </header>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-20 flex flex-col items-center py-20 text-center">
      <p className="font-display text-sm uppercase tracking-brand text-bone">
        The shelves are bare
      </p>
      <p className="mt-2 max-w-[34ch] text-sm text-ash">
        No products are available right now. Check that the Medusa backend is
        running, or that the local catalogue is loaded.
      </p>
    </div>
  );
}
