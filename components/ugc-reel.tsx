"use client";

import { useEffect, useRef } from "react";

type Clip = { src: string; label: string };

const CLIPS: Clip[] = [
  { src: "/ads/cooling-towel-ugc.mp4", label: "Cooling Towel" },
];

export function UgcReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Play the clip only while it's on screen; pause otherwise — avoids decoding
  // a 9:16 video off-screen and hammering the GPU on mobile.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll("video"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.4 },
    );

    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 lg:gap-16"
    >
      {CLIPS.map((clip) => (
        <figure
          key={clip.src}
          className="group relative w-full max-w-[340px] overflow-hidden bg-carbon"
        >
          <div className="relative aspect-[9/16]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={clip.src}
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <figcaption className="absolute bottom-4 left-4 font-display text-[11px] uppercase tracking-brand text-bone">
            {clip.label}
          </figcaption>
        </figure>
      ))}

      {/* Supporting copy balances the single vertical clip */}
      <div className="max-w-[42ch]">
        <p className="text-lg leading-relaxed text-bone/90">
          Shot on a phone, not in a studio. Every piece earns its place outdoors
          before it earns one in the range.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ash">
          Real heat, real sweat, real days out — the only test that matters.
        </p>
      </div>
    </div>
  );
}
