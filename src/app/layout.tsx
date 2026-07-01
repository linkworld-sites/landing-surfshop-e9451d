import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surfshop — Ride Above It All",
  description:
    "Electric hydrofoil rentals and surf gear. eFoil sessions for all levels with instructor included. No waves required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FunnelTracker />
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
