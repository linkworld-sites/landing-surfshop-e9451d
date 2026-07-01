import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import CheckoutContent from "./CheckoutContent";

const BASE = "https://75c239a4.run.linkworld.ai";

export const metadata: Metadata = {
  title: "Checkout — Surfshop | Book Your Session",
  description:
    "Complete your booking. Share your contact details and order notes for your eFoil session or surf gear purchase. We confirm every booking personally within 24 hours.",
  alternates: { canonical: `${BASE}/checkout` },
};

export default function CheckoutPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-ocean">
        <div className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Final Step
            </p>
            <h1 className="font-heading font-bold text-sand text-[clamp(36px,5vw,64px)] leading-none mb-2">
              BOOK YOUR
              <br />
              <span style={{ WebkitTextStroke: "1.5px #FF6B2B", color: "transparent" }}>
                SESSION
              </span>
            </h1>
            <p className="font-body text-sand/60 text-base mt-4 max-w-md leading-relaxed">
              Drop us your details and any order notes. We confirm every booking personally within 24
              hours.
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-6 pb-24">
          <CheckoutContent />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
