import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import CartPage from "./CartPage";

const BASE = "https://75c239a4.run.linkworld.ai";

export const metadata: Metadata = {
  title: "Your Cart — Surfshop",
  description:
    "Review your eFoil sessions and surf gear before checkout. Add, remove or adjust quantities, then proceed to confirm your order.",
  alternates: { canonical: `${BASE}/cart` },
};

export default function Cart() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-sand">
        <div className="bg-ocean pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Your Order
            </p>
            <h1 className="font-heading font-bold text-sand text-[clamp(36px,5vw,64px)] leading-none">
              CART
            </h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          <CartPage />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
