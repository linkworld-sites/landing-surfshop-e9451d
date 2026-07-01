import type { Metadata } from "next";
import { fetchProducts } from "@/lib/checkout";
import ShopClient from "@/components/ShopClient";
import ShopTracker from "@/components/ShopTracker";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

const BASE = "https://75c239a4.run.linkworld.ai";

export const metadata: Metadata = {
  title: "Shop — Surfshop | Boards, Fins & Water Sports Gear",
  description:
    "Curated surf boards, fins, wax, apparel and accessories. Chosen by riders, for riders. Free returns on all orders.",
  alternates: { canonical: `${BASE}/shop` },
};

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <>
      <ShopTracker />
      <NavBar />
      <main className="min-h-screen bg-sand">
        {/* Hero header */}
        <div className="bg-ocean pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Shop
            </p>
            <h1 className="font-heading font-bold text-sand text-[clamp(40px,6vw,80px)] leading-tight">
              EVERYTHING YOU NEED.<br />
              <span style={{ WebkitTextStroke: "2px #00C2FF", color: "transparent" }}>
                NOTHING YOU DON&apos;T.
              </span>
            </h1>
            <p className="font-body text-sand/60 text-lg mt-4 max-w-lg">
              Curated gear chosen by riders who actually use it. From beginner setups to advanced performance boards.
            </p>
          </div>
        </div>

        {/* Shop grid */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <ShopClient products={products} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
