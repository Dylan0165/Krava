import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrustBadges } from "@/components/trust-badges";

export const metadata: Metadata = {
  title: "About",
  description:
    "KRAVA builds premium outdoor gear for sun, water and the long way round.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Field-tested, not focus-grouped",
    body: "Every piece earns its place outdoors before it earns a place in the range. If it doesn't hold up on the trail, it doesn't ship.",
  },
  {
    n: "02",
    title: "Five things, done right",
    body: "We'd rather make a short range you trust than a catalogue you scroll past. No filler, no seasonal noise — only gear that goes the distance.",
  },
  {
    n: "03",
    title: "Built for the elements",
    body: "Sun, water, sand, sweat. Our materials are chosen to shrug off the conditions that wreck ordinary kit.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-28 pt-24 md:pt-28">
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/krava-about-ridge/1920/1200"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
          <div className="scan-grid" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-shell px-5 py-24 md:px-10 md:py-32">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-6 max-w-[18ch] font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            We make gear for people who go outside.
          </h1>
          <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-bone/75 md:text-lg">
            KRAVA started with a simple frustration: outdoor gear is either
            beautiful and useless, or rugged and ugly. We build the rare middle
            — premium pieces that look right in the city and hold up where the
            pavement ends.
          </p>
        </div>
      </section>

      {/* Principles — zig-zag-free, divided list (no generic 3-card row) */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-10 md:py-28">
        <div className="divide-y divide-seam border-y border-seam">
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-baseline"
            >
              <span className="font-display text-sm text-sand md:col-span-2">
                {p.n}
              </span>
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight md:col-span-4">
                {p.title}
              </h2>
              <p className="max-w-[52ch] leading-relaxed text-ash md:col-span-6">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Promise / badges */}
      <section className="mx-auto max-w-shell px-5 md:px-10">
        <TrustBadges />
      </section>

      {/* Anchored info blocks referenced from the footer */}
      <section className="mx-auto max-w-shell px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          <InfoBlock id="contact" title="Contact">
            Questions about an order or a product? Reach us at{" "}
            <a
              href="mailto:hello@krava.co"
              className="text-sand underline-offset-4 hover:underline"
            >
              hello@krava.co
            </a>
            . We answer within one working day.
          </InfoBlock>
          <InfoBlock id="returns" title="Returns">
            14-day right of withdrawal plus 30 days of free returns — no reason
            needed.{" "}
            <Link
              href="/returns"
              className="text-sand underline-offset-4 hover:underline"
            >
              Start a return
            </Link>
            .
          </InfoBlock>
          <InfoBlock id="privacy" title="Privacy">
            We collect only what we need to fulfil your order and never sell your
            data. Payments are processed securely through Stripe.
          </InfoBlock>
        </div>

        <div className="mt-16 border-t border-seam pt-12">
          <Link href="/products" className="btn-outline">
            Shop the Range
          </Link>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <p className="eyebrow mb-4">{title}</p>
      <p className="max-w-[40ch] text-[14px] leading-relaxed text-ash">
        {children}
      </p>
    </div>
  );
}
