import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { UgcReel } from "@/components/ugc-reel";
import { TrustBadges } from "@/components/trust-badges";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getAllProducts, getHeroProduct } from "@/lib/medusa";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const [products, hero] = await Promise.all([
    getAllProducts(),
    getHeroProduct(),
  ]);
  const rest = products.filter((p) => p.id !== hero.id).slice(0, 4);

  return (
    <>
      <Hero />

      {/* THE ESSENTIAL — hero product spotlight */}
      <section
        id="essential"
        className="mx-auto max-w-shell scroll-mt-20 px-5 py-24 md:px-10 md:py-32"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The Essential</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl">
              One towel, the whole summer.
            </h2>
          </div>
          <Link
            href={`/products/${hero.slug}`}
            className="hidden shrink-0 items-center gap-2 font-display text-[11px] uppercase tracking-brand text-sand transition-colors hover:text-bone md:flex"
          >
            Full details <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-carbon lg:col-span-7">
            <Image
              src={hero.gallery[0]}
              alt={hero.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            {hero.bestseller && (
              <span className="absolute left-0 top-5 bg-sand px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-brand text-ink">
                Bestseller
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col lg:col-span-5">
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
              {hero.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ash">
              {hero.tagline}
            </p>
            <p className="mt-6 font-display text-2xl text-sand">
              {formatPrice(hero.price, hero.currency)}
            </p>

            <ul className="mt-8 space-y-4 border-t border-seam pt-8">
              {hero.benefits.map((b) => (
                <li key={b.title} className="flex gap-3.5">
                  <Check
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-sand"
                  />
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

            <div className="mt-9 flex flex-wrap gap-4">
              <AddToCartButton product={hero} />
              <Link href={`/products/${hero.slug}`} className="btn-outline">
                Details
              </Link>
            </div>

            <TrustBadges className="mt-9" />
          </div>
        </div>
      </section>

      {/* Products teaser */}
      <section className="mx-auto max-w-shell px-5 pb-28 md:px-10 md:pb-36">
        <div className="flex items-end justify-between gap-6 border-t border-seam pt-14">
          <div>
            <p className="eyebrow">The Range</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              Pack for the season.
            </h2>
          </div>
          <Link href="/products" className="btn-outline hidden sm:inline-flex">
            All Gear
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {rest.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-12 sm:hidden">
          <Link href="/products" className="btn-outline w-full">
            All Gear
          </Link>
        </div>
      </section>

      {/* UGC / in the field */}
      <section className="mx-auto max-w-shell px-5 pb-28 md:px-10 md:pb-36">
        <div className="border-t border-seam pt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">In the field</p>
              <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                Real days, real gear.
              </h2>
            </div>
          </div>
          <div className="mt-10">
            <UgcReel />
          </div>
        </div>
      </section>
    </>
  );
}
