import { fetchProducts } from "@/lib/checkout";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SplitSection from "@/components/SplitSection";
import EFoilSection from "@/components/EFoilSection";
import ProductTeaser from "@/components/ProductTeaser";
import TickerStrip from "@/components/TickerStrip";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Surfshop — Ride Above It All | eFoil Rentals & Surf Gear",
  description:
    "Electric hydrofoil rentals, surf boards, fins, and everything you need in the water. Beginner-friendly eFoil sessions with instructors included. No waves required.",
  alternates: { canonical: "https://75c239a4.run.linkworld.ai" },
};

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <SplitSection />
        <EFoilSection />
        <TickerStrip />
        <ProductTeaser products={products} />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <SiteFooter />
    </>
  );
}
