export type Benefit = {
  title: string;
  detail: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type ProductVariant = {
  id: string;
  title: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  sku: string;
  /** price in cents (EUR) */
  price: number;
  currency: string;
  tagline: string;
  /** short selling line used on cards */
  blurb: string;
  bestseller?: boolean;
  hero?: boolean;
  image: string;
  gallery: string[];
  benefits: Benefit[];
  variants?: ProductVariant[];
  problem: string;
  solution: string;
  proof: string;
  material: string;
  faqs: Faq[];
};
