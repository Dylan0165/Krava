"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MagnifyingGlass, Handbag, List, X } from "@phosphor-icons/react";
import { useCart, selectCount } from "./cart/cart-store";
import { useHydrated } from "./cart/cart-provider";
import { AnnouncementBar } from "./announcement-bar";

const LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);

  // Transparent over the hero, solid once the user scrolls past it.
  // rAF-throttled scroll read (the skill bans naive scroll listeners for
  // heavy work; this only flips a boolean).
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />
      <div
        className={`transition-colors duration-500 ease-brand ${
          scrolled || mobileOpen
            ? "border-b border-seam bg-ink/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-shell items-center justify-between px-5 md:px-10">
        {/* Logo */}
        <Link href="/" aria-label="KRAVA — home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="KRAVA"
            width={868}
            height={238}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* Center links — desktop */}
        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="group relative font-display text-[11px] uppercase tracking-brand text-bone/80 transition-colors hover:text-bone"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-sand transition-all duration-300 ease-brand group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="hidden text-bone/80 transition-colors hover:text-sand md:block"
          >
            <MagnifyingGlass size={19} weight="light" />
          </button>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative text-bone/80 transition-colors hover:text-sand"
          >
            <Handbag size={20} weight="light" />
            {hydrated && count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center bg-sand px-1 font-display text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-bone md:hidden"
          >
            {mobileOpen ? (
              <X size={22} weight="light" />
            ) : (
              <List size={22} weight="light" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-seam bg-ink/95 px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-display text-sm uppercase tracking-brand text-bone"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
