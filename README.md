# KRAVA — Storefront

> Built for the elements. Premium outdoor & summer lifestyle webshop.

A Next.js 14 (App Router) + TypeScript + Tailwind storefront with a
Medusa-ready data layer and Stripe (test mode) checkout. The site runs
**standalone today** against a local product catalogue, and switches over to a
Medusa backend when you flip one env flag.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local   # fill in keys (optional for first run)
npm run dev
```

Open http://localhost:3000. With no env configured, the storefront serves the
local catalogue and every page works except live Stripe checkout (which shows a
friendly "configure Stripe" message until you add keys).

---

## Design system

Dark-mode-only, intentional and brand-specific — not generic AI output.

| Token        | Value     | Use                         |
| ------------ | --------- | --------------------------- |
| `bg-ink`     | `#0A0A0A` | Page background (off-black) |
| `text-bone`  | `#F5F0E8` | Primary text (warm white)   |
| `text-sand`  | `#C8A96E` | Accent (sun / sand gold)    |
| `bg-carbon`  | `#1A1A1A` | Cards / sections            |
| `border-seam`| `#2A2A2A` | Hairline borders            |

- **Type**: Archivo (display, heavy + uppercase + wide tracking) / Manrope
  (body). A premium neo-grotesque pairing in the Neue Haas lineage.
- **Corners**: nothing rounder than 4px — angular and sharp.
- **Signature 1**: hero background carries an animated horizontal **scanline**
  + faint CRT scan-grid (outdoor-camera effect). See `app/globals.css`.
- **Signature 2**: product cards ease their image to `scale(1.03)` over **400ms**
  on hover. See `components/product-card.tsx`.
- Fixed film-grain overlay, sand-tinted selection + scrollbars, `prefers-reduced-motion` respected.

---

## Project structure

```
app/
  layout.tsx              Root: fonts, nav, footer, cart provider + drawer
  page.tsx                Home: hero, "THE ESSENTIAL" spotlight, range teaser
  products/page.tsx       Product grid (2-col mobile / 3-col desktop)
  products/[slug]/page.tsx Detail: gallery, benefits, problem→solution→proof, FAQ
  about/page.tsx          Brand story + contact/returns/privacy anchors
  checkout/success/page.tsx Post-checkout confirmation (clears cart)
  api/checkout/route.ts   Stripe Checkout Session (test mode)
components/
  nav.tsx                 Sticky nav, transparent over hero → solid on scroll
  hero.tsx                Full-viewport hero w/ scanline signature
  product-card.tsx        Hover scale-1.03 card + quick-add + bestseller badge
  product-buy-box.tsx     Variant selector, add-to-cart, sticky mobile bar
  product-gallery.tsx     Thumbnail gallery
  faq.tsx                 Animated accordion
  trust-badges.tsx        Free shipping / 30-day returns / premium quality
  footer.tsx              Logo, link columns, social
  cart/                   zustand store, hydration provider, slide-in drawer
lib/
  products.ts             Local catalogue (5 products, full copy)
  medusa.ts               Data layer: Medusa when enabled, local fallback
  types.ts, format.ts     Product types + currency formatting
```

---

## Products

| Product                   | Price   | SKU         |
| ------------------------- | ------- | ----------- |
| Cooling Towel (HERO)      | €19,95  | KRV-CT-001  |
| Waterproof Dry Bag        | €24,95  | KRV-DB-001  |
| Portable Mini Speaker     | €34,95  | KRV-SP-001  |
| UV Protective Arm Sleeves | €17,95  | KRV-UV-001  |
| Hydration Pack            | €39,95  | KRV-HP-001  |

Edit `lib/products.ts` to change copy, pricing or imagery. Replace the
`picsum.photos` placeholders with real product photography (drop files in
`/public` and reference `/your-image.jpg`).

---

## Connecting Medusa (backend)

The storefront is wired to swap from the local catalogue to Medusa with **one
flag** — no component changes.

### 1. Start the backend

```bash
npx create-medusa-app@latest krava-backend
cd krava-backend
npm run dev
```

Backend runs on http://localhost:9000, admin on http://localhost:9000/app
(Medusa v2; older v1 used http://localhost:7001).

### 2. Add products via the admin dashboard

Create the five products above with their SKUs and EUR prices. Give each a
handle that matches the storefront slug (e.g. `cooling-towel`).

### 3. Wire the storefront

```env
# .env.local
NEXT_PUBLIC_USE_MEDUSA=true
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

Then implement `fetchMedusaProducts()` and the `toProduct()` mapper in
`lib/medusa.ts` — the integration point is stubbed and commented there, using
the already-installed `@medusajs/js-sdk`. Until that mapper returns data the
layer transparently falls back to local, so nothing breaks mid-migration.

---

## Stripe (test mode)

`@stripe/stripe-js`, `@stripe/react-stripe-js` and `stripe` are installed.

1. Grab test keys: https://dashboard.stripe.com/test/apikeys
2. Add to `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. Click **Checkout** in the cart drawer → redirects to Stripe Checkout.
4. Test card: `4242 4242 4242 4242`, any future expiry / CVC / postcode.
5. On success you land on `/checkout/success` and the cart clears.

`app/api/checkout/route.ts` creates the Checkout Session. For production, move
fulfillment through Medusa's Stripe payment provider and add a webhook handler
at `app/api/webhooks/stripe/route.ts`.

---

## CJ Dropshipping (fulfillment — later)

Add `CJ_API_EMAIL` / `CJ_API_KEY` to `.env.local`. The intended flow:

1. On a paid Stripe webhook, create a CJ order via their API.
2. Map each SKU (`KRV-*`) to its CJ product/variant id.
3. Poll or webhook CJ for tracking numbers and email them to the customer.

This lives behind the order pipeline and doesn't affect the storefront UI.

---

## Scripts

```bash
npm run dev     # local dev
npm run build   # production build
npm run start   # serve the production build
```
