"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";

type Status = "idle" | "error" | "done";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    // No backend yet — wire to your ESP / Medusa later.
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 border border-seam bg-carbon px-4 py-3.5">
        <Check size={18} weight="bold" className="shrink-0 text-sand" />
        <p className="text-[13px] text-bone">
          You&apos;re in. Watch your inbox for the first drop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <label
        htmlFor="newsletter-email"
        className="eyebrow text-ash"
      >
        Join the list
      </label>
      <div className="flex">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="h-12 w-full min-w-0 border border-seam bg-carbon px-4 text-[13px] text-bone placeholder:text-ash/60 focus:border-sand focus:outline-none"
        />
        <button
          type="submit"
          className="flex h-12 shrink-0 items-center gap-2 whitespace-nowrap border border-l-0 border-sand bg-sand px-5 font-display text-[11px] uppercase tracking-brand text-ink transition-all duration-300 ease-brand hover:bg-sand-soft active:translate-y-[1px]"
        >
          Join the adventure
          <ArrowRight size={14} weight="bold" />
        </button>
      </div>
      {status === "error" ? (
        <p className="text-[11px] text-sand-soft">
          Please enter a valid email address.
        </p>
      ) : (
        <p className="text-[11px] text-ash">
          Field notes, drops and the occasional discount. No noise.
        </p>
      )}
    </form>
  );
}
