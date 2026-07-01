import Link from "next/link";

const shopLinks = [
  { label: "All Boards", href: "/shop" },
  { label: "Fins & Accessories", href: "/shop" },
  { label: "Apparel", href: "/shop" },
  { label: "Wax & Essentials", href: "/shop" },
];

const rentalLinks = [
  { label: "eFoil Rentals", href: "/efoil" },
  { label: "Book a Session", href: "/efoil#booking" },
  { label: "How It Works", href: "/efoil#how-it-works" },
  { label: "FAQs", href: "/efoil#faq" },
  { label: "Pricing", href: "/efoil#pricing" },
];

const infoLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ocean border-t border-cyan/10">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-2xl text-sand">
                SURF<span className="text-cyan">SHOP</span>
              </span>
            </Link>
            <p className="font-body text-sand/50 text-sm leading-relaxed max-w-xs">
              Gear up for every condition. From your first lesson to your best session, we make the ocean more accessible.
            </p>
            <p className="font-body text-cyan text-sm mt-4 italic">
              &ldquo;The ocean just got an upgrade.&rdquo;
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-bold text-sand text-sm tracking-[0.15em] uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sand/50 text-sm hover:text-cyan transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rentals */}
          <div>
            <h4 className="font-heading font-bold text-sand text-sm tracking-[0.15em] uppercase mb-4">
              eFoil Rentals
            </h4>
            <ul className="space-y-2.5">
              {rentalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sand/50 text-sm hover:text-cyan transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-bold text-sand text-sm tracking-[0.15em] uppercase mb-4">
              Info
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sand/50 text-sm hover:text-cyan transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cyan/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-cyan/60 text-xs">
            © {new Date().getFullYear()} Surfshop. All rights reserved.
          </p>
          <p className="font-body text-cyan/40 text-xs">
            Made for wave riders. ⚡
          </p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="font-body text-sand/30 text-xs hover:text-cyan transition-colors">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="font-body text-sand/30 text-xs hover:text-cyan transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
