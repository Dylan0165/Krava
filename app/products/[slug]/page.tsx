import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getAllProducts, getProductBySlug } from "@/lib/medusa";
import { pickRelated } from "@/lib/products";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductCard } from "@/components/product-card";
import { FaqList } from "@/components/faq";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.title,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = pickRelated(await getAllProducts(), product.slug, 2);

  return (
    <article className="pb-28 pt-28 md:pb-32 md:pt-32">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ash">
          <Link href="/products" className="transition-colors hover:text-bone">
            Gear
          </Link>
          <CaretRight size={11} />
          <span className="text-bone/60">{product.title}</span>
        </nav>
      </div>

      {/* Buy section */}
      <section className="mx-auto mt-6 max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">KRAVA — {product.sku}</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ash">
              {product.tagline}
            </p>
            <ProductBuyBox product={product} />
          </div>
        </div>
      </section>

      {/* Problem -> Solution -> Proof */}
      <section className="mx-auto mt-28 max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-seam bg-seam md:grid-cols-3">
          <Panel kicker="The problem" body={product.problem} />
          <Panel kicker="The fix" body={product.solution} accent />
          <Panel kicker="The proof" body={product.proof} />
        </div>
      </section>

      {/* Material / use */}
      <section className="mx-auto mt-20 max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-t border-seam pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Material &amp; use</p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-[60ch] text-lg leading-relaxed text-bone/90">
              {product.material}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 border-t border-seam pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
              Good to know
            </h2>
          </div>
          <div className="md:col-span-8">
            <FaqList faqs={product.faqs} />
          </div>
        </div>
      </section>

      {/* Shipping & returns */}
      <section className="mx-auto mt-20 max-w-shell px-5 md:px-10">
        <div className="grid grid-cols-1 gap-8 border-t border-seam pt-14 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Shipping</p>
            <p className="max-w-[48ch] text-[14px] leading-relaxed text-ash">
              Orders ship within 24 hours. Free shipping on orders over €50;
              standard delivery lands in 3–6 working days across Europe. You
              get a tracking link the moment it leaves the warehouse.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Returns</p>
            <p className="max-w-[48ch] text-[14px] leading-relaxed text-ash">
              14-day legal right of withdrawal, plus 30 days of free returns —
              no reason needed. Every piece is covered by a 2-year guarantee
              against defects.
            </p>
            <Link
              href="/returns"
              className="mt-4 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-brand text-sand transition-colors hover:text-bone"
            >
              Start a return <CaretRight size={12} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* You might also like */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-shell px-5 md:px-10">
          <div className="border-t border-seam pt-14">
            <p className="eyebrow">You might also like</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
              Complete the kit
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function Panel({
  kicker,
  body,
  accent = false,
}: {
  kicker: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div className={`p-8 md:p-10 ${accent ? "bg-carbon" : "bg-ink"}`}>
      <p className={`eyebrow ${accent ? "text-sand" : "text-ash"}`}>{kicker}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-bone/90">{body}</p>
    </div>
  );
}
