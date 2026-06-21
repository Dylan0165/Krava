"use client";

import { useEffect, useRef } from "react";

type Clip = { src: string; label: string };

const CLIPS: Clip[] = [
  { src: "/ads/cooling-towel-ugc.mp4", label: "Cooling Towel" },
  { src: "/ads/bluetooth-speaker-ugc.mp4", label: "Bluetooth Speaker" },
  { src: "/ads/water-bottle-ugc.mp4", label: "Folding Water Bottle" },
];

export function UgcReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Play each clip only while it's on screen; pause otherwise. Keeps three
  // 9:16 videos from all decoding at once and hammering the GPU on mobile.
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
      className="grid grid-cols-1 gap-5 sm:grid-cols-3"
    >
      {CLIPS.map((clip) => (
        <figure key={clip.src} className="group relative overflow-hidden bg-carbon">
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
    </div>
  );
}
