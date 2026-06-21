import Link from "next/link";
import { InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { NewsletterForm } from "./newsletter-form";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All Gear" },
      { href: "/products/cooling-towel", label: "Cooling Towel" },
      { href: "/products/folding-water-bottle", label: "Folding Water Bottle" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/returns", label: "Returns & Withdrawal" },
      { href: "/about#privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-seam bg-ink">
      <div className="mx-auto max-w-shell px-5 py-16 md:px-10 md:py-20">
        {/* Newsletter band */}
        <div className="mb-16 grid grid-cols-1 gap-8 border-b border-seam pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <h2 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight md:text-3xl">
              Join the adventure
            </h2>
            <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-ash">
              Be first to new drops and the stories behind the gear.
            </p>
          </div>
          <div className="md:col-span-6">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-extrabold uppercase tracking-[0.3em] text-bone">
              KRAVA
            </p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ash">
              Built for the elements. Premium outdoor gear for sun, water and
              the long way round.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramLogo size={18} weight="light" />
              </SocialLink>
              <SocialLink href="https://tiktok.com" label="TikTok">
                <TiktokLogo size={18} weight="light" />
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4 text-ash">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-bone/70 transition-colors hover:text-sand"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-seam pt-7 sm:flex-row sm:items-center">
          <p className="text-[12px] text-ash">
            &copy; 2026 KRAVA. All rights reserved.
          </p>
          <p className="text-[12px] tracking-wider text-ash">
            Built for the elements.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center border border-seam text-bone/70 transition-all duration-300 ease-brand hover:border-sand hover:text-sand"
    >
      {children}
    </a>
  );
}
