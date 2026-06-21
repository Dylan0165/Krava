import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-shell flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
        Off the map
      </h1>
      <p className="mt-5 max-w-[40ch] leading-relaxed text-ash">
        This trail doesn&apos;t lead anywhere. Let&apos;s get you back to solid
        ground.
      </p>
      <Link href="/" className="btn-outline mt-9">
        Back to base
      </Link>
    </div>
  );
}
