"use client";

import Link from "next/link";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-ink">
      {/* Cinematic hero video — generated brand footage */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Tonal grade: dark left for text legibility, fading down into #0A0A0A */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        {/* Signature camera artifacts + subtle film grain */}
        <div className="scan-grid" aria-hidden="true" />
        <div className="scanline-overlay" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
      </div>

      {/* Content — left aligned, asymmetric */}
      <div className="relative mx-auto flex min-h-[100dvh] max-w-shell flex-col justify-center px-5 pb-28 pt-28 md:px-10">
        <div className="max-w-2xl">
          <p
            className="eyebrow animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            KRAVA — Outdoor Supply Co.
          </p>
          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-bone"
            style={{ animationDelay: "220ms" }}
          >
            Built for
            <br />
            the elements.
          </h1>
          <p
            className="mt-7 max-w-[46ch] animate-fade-up text-base leading-relaxed text-bone/70 md:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            Premium outdoor gear for every adventure. Engineered for sun, water
            and the long way round.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "440ms" }}
          >
            <Link href="/products" className="btn-outline">
              Shop Now
            </Link>
            <Link
              href="#essential"
              className="font-display text-[12px] uppercase tracking-brand text-bone/60 transition-colors hover:text-bone"
            >
              The Essential
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-display text-[10px] uppercase tracking-wide2 text-bone/40">
          Scroll
        </span>
        <ArrowDown
          size={16}
          weight="light"
          className="animate-indicator-pulse text-sand"
        />
      </div>
    </section>
  );
}
