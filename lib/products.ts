import type { Product } from "./types";

// Locally-hosted Higgsfield lifestyle imagery (see /public/products).
const img = (slug: string) => `/products/${slug}.jpg`;

// Local catalogue. This is the canonical fallback used whenever the Medusa
// backend is unreachable, so the storefront always renders.
export const PRODUCTS: Product[] = [
  {
    id: "krv-ct-001",
    slug: "cooling-towel",
    title: "Cooling Towel",
    sku: "KRV-CT-001",
    price: 1995,
    currency: "EUR",
    tagline: "Drop your skin temperature in seconds.",
    blurb: "Instant evaporative cooling for the hottest days.",
    bestseller: true,
    hero: true,
    image: img("cooling-towel"),
    gallery: [img("cooling-towel")],
    benefits: [
      {
        title: "Cools on contact",
        detail: "Snap, wet, wear. Stays up to 12°C below body temp for hours.",
      },
      {
        title: "Packs to nothing",
        detail: "Folds into its mesh sleeve — clips to any pack or belt loop.",
      },
      {
        title: "Reusable for years",
        detail: "Hyper-evaporative weave that re-charges with a splash of water.",
      },
    ],
    problem: "Heat drains you long before the trail does.",
    solution:
      "The KRAVA Cooling Towel uses a hyper-evaporative weave that pulls heat off your neck and shoulders the moment it makes contact with skin.",
    proof:
      "Lab-measured at 11–12°C below ambient skin temperature, sustained across a two-hour ride in 34°C heat.",
    material:
      "Hyperfine PVA microfibre, 88 × 33 cm. Machine washable. Comes with a sand-coloured mesh carry sleeve.",
    faqs: [
      {
        q: "How does it cool without ice or power?",
        a: "Soak it, wring it, snap it. Evaporation does the rest — re-activate with water whenever it dries out.",
      },
      {
        q: "How long does the cooling last?",
        a: "Two to three hours of active cooling per soak, depending on heat and humidity.",
      },
      {
        q: "Is it bulky to carry?",
        a: "No. It folds flat into the included sleeve, roughly the size of a phone.",
      },
    ],
  },
  {
    id: "krv-sv-001",
    slug: "sun-visor-cap",
    title: "Sun Visor Cap",
    sku: "KRV-SV-001",
    price: 2295,
    currency: "EUR",
    tagline: "Shade for your eyes, air for your head.",
    blurb: "Lightweight UPF 50+ visor that shades without the sweat.",
    image: img("sun-visor-cap"),
    gallery: [img("sun-visor-cap")],
    benefits: [
      {
        title: "Cuts the glare",
        detail: "A wide structured brim shades your eyes and face all day.",
      },
      {
        title: "Never traps heat",
        detail: "Open-top design lets warmth escape — no soggy, sweaty crown.",
      },
      {
        title: "Packs flat, springs back",
        detail: "Roll it into a bag; the brim holds its shape every time.",
      },
    ],
    problem: "Caps cook your head; sunglasses alone don't cover your face.",
    solution:
      "An open-crown visor shades your eyes and face with a rigid UPF 50+ brim, while the vented top lets heat out so your head stays cool.",
    proof:
      "UPF 50+ brim blocks over 98% of UV, at 62g — light enough to forget you're wearing it.",
    material:
      "Recycled poly-twill brim, quick-dry towelling sweatband, adjustable hook-and-loop strap. One size.",
    faqs: [
      {
        q: "Will it stay on in wind?",
        a: "The adjustable rear strap cinches to your head, so it holds firm on the bike or the boardwalk.",
      },
      {
        q: "Is the brim really sun-safe?",
        a: "Yes — the brim is rated UPF 50+, blocking more than 98% of UVA and UVB.",
      },
      {
        q: "Can I pack it without crushing it?",
        a: "Roll it up; the sprung brim returns to shape with no permanent creases.",
      },
    ],
  },
  {
    id: "krv-sp-001",
    slug: "bluetooth-speaker",
    title: "Bluetooth Speaker",
    sku: "KRV-SP-001",
    price: 3495,
    currency: "EUR",
    tagline: "Big sound that lives in your palm.",
    blurb: "Pocket speaker built for sand, spray and long playlists.",
    image: img("bluetooth-speaker"),
    gallery: [img("bluetooth-speaker")],
    benefits: [
      {
        title: "Room-filling output",
        detail: "A passive bass radiator pushes warmth far beyond its size.",
      },
      {
        title: "Shrugs off the elements",
        detail: "IPX7 waterproof and dust-sealed for the beach and the trail.",
      },
      {
        title: "All-day battery",
        detail: "16 hours per charge, with USB-C top-ups in minutes.",
      },
    ],
    problem: "Most pocket speakers sound thin and die by sunset.",
    solution:
      "A tuned passive radiator and a sealed acoustic chamber deliver real low-end, while a sealed shell keeps water and sand out.",
    proof:
      "16-hour runtime at conversational volume, IPX7 waterproof to one metre for 30 minutes.",
    material:
      "Anodised aluminium grille, silicone bumper, USB-C. Pairs two units for true stereo.",
    faqs: [
      {
        q: "Can it get wet?",
        a: "Yes — IPX7 means it survives a full dunk. Rinse off the salt and it keeps going.",
      },
      {
        q: "How long does the battery last?",
        a: "Around 16 hours at normal volume; a 15-minute charge gets you a few more.",
      },
      {
        q: "Can I pair two?",
        a: "Pair two units to split left and right for proper stereo separation.",
      },
    ],
  },
  {
    id: "krv-uv-001",
    slug: "uv-arm-sleeves",
    title: "UV Protective Arm Sleeves",
    sku: "KRV-UV-001",
    price: 1795,
    currency: "EUR",
    tagline: "Shade you can wear.",
    blurb: "UPF 50+ sleeves that cool while they shield.",
    image: img("uv-arm-sleeves"),
    gallery: [img("uv-arm-sleeves")],
    benefits: [
      {
        title: "Blocks 98% of UV",
        detail: "UPF 50+ knit shields skin without sunscreen reapplication.",
      },
      {
        title: "Cools as you move",
        detail: "Moisture-wicking yarn pulls sweat and drops surface temperature.",
      },
      {
        title: "Stays put all day",
        detail: "Silicone grip band holds the sleeve without pinching.",
      },
    ],
    variants: [
      { id: "uv-sm", title: "S / M" },
      { id: "uv-lg", title: "L / XL" },
    ],
    problem: "Sunscreen sweats off; long sleeves cook you.",
    solution:
      "A UPF 50+ technical knit blocks the sun while wicking yarn keeps your arms cooler than bare skin in direct sun.",
    proof:
      "Independently rated UPF 50+, blocking over 98% of UVA and UVB radiation.",
    material:
      "Nylon-spandex performance knit with flatlock seams and a silicone grip cuff. Sold as a pair.",
    faqs: [
      {
        q: "Do they actually keep you cool?",
        a: "Yes — the wicking knit moves sweat to the surface, so evaporation cools your arms below bare-skin temperature.",
      },
      {
        q: "Will they slide down?",
        a: "A silicone grip band at the bicep keeps them anchored through full range of motion.",
      },
      {
        q: "How do I size them?",
        a: "S/M fits most; choose L/XL for larger arms or a looser feel.",
      },
    ],
  },
  {
    id: "krv-wb-001",
    slug: "folding-water-bottle",
    title: "Folding Water Bottle",
    sku: "KRV-WB-001",
    price: 1895,
    currency: "EUR",
    tagline: "A litre of water that folds to a coaster.",
    blurb: "Collapsible silicone bottle that disappears when it's empty.",
    image: img("folding-water-bottle"),
    gallery: [img("folding-water-bottle")],
    benefits: [
      {
        title: "Folds down flat",
        detail: "Empty, it rolls to the size of a coaster and slips in a pocket.",
      },
      {
        title: "Tastes like nothing",
        detail: "Food-grade silicone — no plastic aftertaste, ever.",
      },
      {
        title: "Leak-proof lock cap",
        detail: "A sealed screw cap and carry loop clip straight to your pack.",
      },
    ],
    variants: [
      { id: "wb-550", title: "550 ml" },
      { id: "wb-750", title: "750 ml" },
    ],
    problem: "A rigid bottle is dead weight the moment it's empty.",
    solution:
      "KRAVA's bottle is food-grade silicone that collapses flat when empty, so it takes up almost no space on the way back down.",
    proof:
      "Holds up to 750ml, folds to roughly 3cm thick, and weighs 95g — lighter than the water it replaces is heavy.",
    material:
      "BPA-free food-grade silicone body, leak-proof screw cap, carabiner carry loop. Dishwasher safe.",
    faqs: [
      {
        q: "Does it leak when folded in a bag?",
        a: "No — the screw cap seals tight, and you fold it only when empty, so there's nothing to spill.",
      },
      {
        q: "Can I put hot or cold drinks in it?",
        a: "It handles ice water through to warm drinks; avoid boiling liquids to protect the seal.",
      },
      {
        q: "How small does it really get?",
        a: "Rolled up it's about the thickness of three coins — it disappears into a jacket pocket.",
      },
    ],
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getHeroProduct(): Product {
  return PRODUCTS.find((p) => p.hero) ?? PRODUCTS[0];
}

/**
 * Pick `count` other products to recommend. Uses a slug-seeded shuffle so the
 * selection looks random but is stable between server and client (no hydration
 * mismatch) and stable per product.
 */
export function pickRelated(
  all: Product[],
  slug: string,
  count = 2,
): Product[] {
  const others = all.filter((p) => p.slug !== slug);
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed = (seed * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const arr = [...others];
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}
