import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ClearCartOnMount } from "@/components/clear-cart-on-mount";

export const metadata = { title: "Order confirmed" };

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[75dvh] max-w-shell flex-col items-center justify-center px-5 text-center">
      <ClearCartOnMount />
      <CheckCircle size={48} weight="light" className="text-sand" />
      <p className="eyebrow mt-7">Order confirmed</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
        You&apos;re all set.
      </h1>
      <p className="mt-5 max-w-[46ch] leading-relaxed text-ash">
        Thanks for gearing up with KRAVA. A confirmation is on its way to your
        inbox, and your kit ships within 24 hours.
      </p>
      <Link href="/products" className="btn-outline mt-9">
        Keep Exploring
      </Link>
    </div>
  );
}
