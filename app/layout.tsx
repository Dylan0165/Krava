import type { Metadata, Viewport } from "next";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

// Display: heavy neo-grotesque in the Neue Haas lineage — carries the
// uppercase, wide-tracked headlines without falling back to Inter.
const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Body: clean, highly legible grotesque for running copy.
const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krava.example"),
  title: {
    default: "KRAVA — Built for the elements.",
    template: "%s — KRAVA",
  },
  description:
    "Premium outdoor gear for every adventure. Engineered for sun, water and the long way round.",
  openGraph: {
    title: "KRAVA — Built for the elements.",
    description: "Premium outdoor gear for every adventure.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-[100dvh] bg-ink text-bone">
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
