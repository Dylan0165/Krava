"use client";

import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

/**
 * Slim promo bar above the nav. Dismissible (persists via localStorage), so it
 * stays gone once closed. Rendered by default on the server to avoid layout
 * flashes; hidden after mount if previously dismissed.
 */
export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem("krava-announce") === "closed");
  }, []);

  if (mounted && dismissed) return null;

  function dismiss() {
    localStorage.setItem("krava-announce", "closed");
    setDismissed(true);
  }

  return (
    <div className="relative border-b border-seam bg-coal">
      <div className="mx-auto flex max-w-shell items-center justify-center px-10 py-2">
        <p className="font-display text-[10px] uppercase tracking-wide2 text-sand">
          Free shipping over &euro;35
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 grid h-7 w-7 place-items-center text-ash transition-colors hover:text-bone"
        >
          <X size={13} weight="bold" />
        </button>
      </div>
    </div>
  );
}
