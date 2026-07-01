import type { Metadata } from "next";
import { fetchProducts } from "@/lib/checkout";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import ProductsGrid from "./ProductsGrid";

const BASE = "https://75c239a4.run.linkworld.ai";

export const metadata: Metadata = {
  title: "Shop eFoil Sessions & Surf Gear | Surfshop",
  description:
    "Browse eFoil intro sessions, full-day rentals, advanced coaching packages and surf gear curated for every level. Add to cart and ride above it all.",
  alternates: { canonical: `${BASE}/products` },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "eFoil Intro Session — 60 Minutes",
  description:
    "Your first flight above the ocean. 60-minute electric hydrofoil session with certified instructor included. All safety gear provided. No experience required — beginners get airborne in under 30 minutes.",
  brand: { "@type": "Brand", name: "Surfshop" },
  url: `${BASE}/products`,
  offers: {
    "@type": "Offer",
    price: "89",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${BASE}/products`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <NavBar />
      <main className="min-h-screen bg-ocean">
        {/* Hero */}
        <div className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Lineup
            </p>
            <h1 className="font-heading font-bold text-sand text-[clamp(40px,7vw,96px)] leading-none">
              RIDE ABOVE
              <br />
              <span style={{ WebkitTextStroke: "2px #FF6B2B", color: "transparent" }}>
                IT ALL.
              </span>
            </h1>
            <p className="font-body text-sand/60 text-lg mt-6 max-w-xl leading-relaxed">
              Electric hydrofoil sessions and curated gear for every skill level. No waves, no
              experience — just stoke.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <ProductsGrid products={products} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
