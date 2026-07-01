import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import EFoilLandingPage from "./EFoilLandingPage";

export const metadata: Metadata = {
  title: "eFoil Rentals & Lessons Near You | Surfshop — Electric Surfboard Sessions 2026",
  description:
    "Book eFoil rentals and electric surfboard lessons near you from $89. 60-min sessions, certified instructor included, all skill levels welcome. No experience needed. Experience the future of surfing in 2026.",
  keywords:
    "eFoil rentals near me, electric surfboard lessons near me, eFoil experience 2026, electric hydrofoil rental, eFoil lessons beginner, learn to eFoil, eFoil rental price, electric foil board",
  alternates: { canonical: "https://75c239a4.run.linkworld.ai/efoil" },
  openGraph: {
    title: "eFoil Rentals & Electric Surfboard Lessons Near You | Surfshop",
    description:
      "Electric surfboard sessions from $89. Certified instructor included, all levels. No experience needed. Book your eFoil session today.",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://75c239a4.run.linkworld.ai/#business",
  name: "Surfshop",
  description:
    "Electric hydrofoil rentals and surf gear. eFoil sessions for all levels with certified instructor included. No waves required.",
  url: "https://75c239a4.run.linkworld.ai",
  priceRange: "$$",
  openingHours: "Mo-Su 07:00-19:00",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "eFoil Rentals", value: true },
    { "@type": "LocationFeatureSpecification", name: "Certified Instructors", value: true },
    { "@type": "LocationFeatureSpecification", name: "Equipment Provided", value: true },
    { "@type": "LocationFeatureSpecification", name: "Beginner Lessons", value: true },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "eFoil Rental Session",
  description:
    "60-minute electric hydrofoil rental session with certified instructor. Wetsuit, helmet, and all safety gear provided. All skill levels welcome — beginners get airborne in under 30 minutes.",
  brand: {
    "@type": "Brand",
    name: "Surfshop",
  },
  offers: [
    {
      "@type": "Offer",
      name: "eFoil Rental",
      price: "89",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "60-minute eFoil rental with certified instructor",
    },
    {
      "@type": "Offer",
      name: "eFoil Lesson Package",
      price: "149",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "2-hour dedicated eFoil coaching and instruction session",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Marcus T." },
      reviewBody:
        "Within 20 minutes I was gliding silently above the water. Absolutely surreal. Best experience I've had on the ocean.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Jamie O." },
      reviewBody:
        "Booked for my birthday, brought 4 friends. Every single one of us got airborne on the first session. The instructor was incredible.",
    },
  ],
};

export default function EFoilPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <NavBar />
      <main>
        <EFoilLandingPage />
      </main>
      <SiteFooter />
    </>
  );
}
