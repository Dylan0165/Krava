import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type IncomingItem = {
  title: string;
  price: number; // cents
  currency: string;
  qty: number;
  image?: string;
};

/**
 * Stripe requires absolute, publicly-reachable image URLs and rejects relative
 * paths (e.g. "/products/x.jpg") with a validation error. It also can't fetch
 * localhost, so we omit images for local dev — the session still succeeds, just
 * without a thumbnail. In production (real origin) the absolute URL is used.
 */
function resolveImage(
  image: string | undefined,
  origin: string,
): string | undefined {
  if (!image) return undefined;
  const abs = image.startsWith("http") ? image : `${origin}${image}`;
  if (!/^https?:\/\//i.test(abs)) return undefined;
  if (/^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(abs)) {
    return undefined;
  }
  return abs;
}

/**
 * Creates a Stripe Checkout Session (test mode) from the cart payload.
 *
 * Returns `{ url }` on success — the drawer redirects there. If no Stripe key
 * is configured, returns a friendly `{ error }` so the UI degrades gracefully
 * instead of throwing. In production you'd route this through Medusa's payment
 * provider; this direct Stripe Checkout is the fastest path to a working,
 * testable flow.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe isn't configured. Add STRIPE_SECRET_KEY to .env.local to enable checkout.",
      },
      { status: 503 },
    );
  }

  let body: { items?: IncomingItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((i) => {
        const img = resolveImage(i.image, origin);
        return {
          quantity: i.qty,
          price_data: {
            currency: (i.currency ?? "EUR").toLowerCase(),
            unit_amount: i.price,
            product_data: {
              name: i.title,
              ...(img ? { images: [img] } : {}),
            },
          },
        };
      }),
      shipping_address_collection: { allowed_countries: ["NL", "BE", "DE", "FR"] },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
