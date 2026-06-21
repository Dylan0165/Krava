import type { Metadata } from "next";
import { ReturnForm } from "@/components/return-form";
import {
  CalendarBlank,
  Package,
  ArrowsClockwise,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Returns & Right of Withdrawal",
  description:
    "Start a return in minutes. Your 14-day legal right of withdrawal, our 30-day free returns, and the model withdrawal form.",
};

const STEPS = [
  {
    icon: ArrowsClockwise,
    title: "Request your return",
    body: "Fill in the form above with your order number. You don't need to give a reason.",
  },
  {
    icon: Package,
    title: "Pack it up",
    body: "Put the item back in its packaging in its original condition and attach the prepaid label we email you.",
  },
  {
    icon: CalendarBlank,
    title: "Drop it off",
    body: "Hand it to the carrier within 14 days of telling us you're withdrawing.",
  },
  {
    icon: CreditCard,
    title: "Get refunded",
    body: "We refund the full amount within 14 days of receiving the item, to your original payment method.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-shell px-5 pb-28 pt-28 md:px-10 md:pb-36 md:pt-32">
      {/* Header */}
      <header className="border-b border-seam pb-10">
        <p className="eyebrow">Returns &amp; Right of Withdrawal</p>
        <h1 className="mt-4 max-w-[20ch] font-display text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
          Changed your mind? No problem.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-ash">
          By law you have a <span className="text-bone">14-day right of
          withdrawal</span> on every order — no reason required. On top of that,
          KRAVA gives you <span className="text-bone">30 days of free
          returns</span>. Start yours below.
        </p>
      </header>

      {/* The return action — the clear, primary CTA */}
      <section className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Start a return</p>
          <ReturnForm />
        </div>

        {/* How it works */}
        <aside className="lg:col-span-5">
          <p className="eyebrow mb-5">How it works</p>
          <ol className="divide-y divide-seam border-y border-seam">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 py-5">
                <span className="font-display text-[13px] text-sand">
                  0{i + 1}
                </span>
                <div className="flex items-start gap-3">
                  <s.icon
                    size={18}
                    weight="light"
                    className="mt-0.5 shrink-0 text-sand"
                  />
                  <div>
                    <p className="font-display text-[13px] uppercase tracking-wider text-bone">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ash">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* Legal detail */}
      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-seam pt-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Your right of withdrawal</p>
        </div>
        <div className="space-y-5 md:col-span-8">
          <p className="max-w-[62ch] text-[15px] leading-relaxed text-bone/90">
            Under the EU Consumer Rights Directive and Dutch law (Wet koop op
            afstand), you may withdraw from your purchase within 14 days of
            receiving your order, without giving any reason.
          </p>
          <ul className="max-w-[62ch] space-y-3 text-[14px] leading-relaxed text-ash">
            <li>
              <span className="text-bone">Notify us within 14 days</span> using
              the form above, the model withdrawal form below, or an email to
              returns@krava.co.
            </li>
            <li>
              <span className="text-bone">Return within 14 days</span> of that
              notification. Items should be unused and in their original
              condition where possible.
            </li>
            <li>
              <span className="text-bone">Full refund within 14 days</span> of
              us receiving the goods (or proof you sent them back), to your
              original payment method — including standard outbound shipping.
            </li>
            <li>
              KRAVA covers return shipping with a prepaid label within 30 days
              of delivery.
            </li>
          </ul>
        </div>
      </section>

      {/* Model withdrawal form */}
      <section className="mt-16 border-t border-seam pt-14">
        <p className="eyebrow">Model withdrawal form</p>
        <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-ash">
          You may, but are not required to, use this form. Complete and return
          it only if you wish to withdraw from the contract.
        </p>
        <div className="mt-6 max-w-[62ch] border border-seam bg-carbon p-6 text-[13px] leading-relaxed text-bone/85 md:p-8">
          <p>To KRAVA, Returns Department, returns@krava.co:</p>
          <p className="mt-4">
            I/We (*) hereby give notice that I/We (*) withdraw from my/our (*)
            contract of sale of the following goods (*):
          </p>
          <ul className="mt-4 space-y-1.5 text-ash">
            <li>— Ordered on (*) / received on (*):</li>
            <li>— Name of consumer(s):</li>
            <li>— Address of consumer(s):</li>
            <li>— Order number:</li>
            <li>— Signature of consumer(s) (only if this form is on paper):</li>
            <li>— Date:</li>
          </ul>
          <p className="mt-4 text-[11px] text-ash">(*) Delete as appropriate.</p>
        </div>
      </section>
    </div>
  );
}
