import { Truck, ArrowCounterClockwise, SealCheck } from "@phosphor-icons/react/dist/ssr";

const BADGES = [
  { icon: Truck, label: "Free shipping", sub: "On orders over €50" },
  { icon: ArrowCounterClockwise, label: "30-day returns", sub: "No-questions policy" },
  { icon: SealCheck, label: "Premium quality", sub: "Field-tested gear" },
];

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 divide-y divide-seam border border-seam sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${className}`}
    >
      {BADGES.map((b) => (
        <div key={b.label} className="flex items-center gap-3.5 px-5 py-4">
          <b.icon size={22} weight="light" className="shrink-0 text-sand" />
          <div>
            <p className="font-display text-[11px] uppercase tracking-wider text-bone">
              {b.label}
            </p>
            <p className="text-[11px] text-ash">{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
