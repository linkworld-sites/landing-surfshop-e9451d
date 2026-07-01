"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/checkout";
import { formatPrice } from "@/lib/checkout";

const CARD_COLORS = [
  { bg: "bg-ocean", text: "text-sand", accent: "text-cyan" },
  { bg: "bg-coral", text: "text-white", accent: "text-white/70" },
  { bg: "bg-seafoam", text: "text-ocean", accent: "text-ocean/70" },
  { bg: "bg-cyan", text: "text-ocean", accent: "text-ocean/70" },
];

const CATEGORIES = ["Boards", "Fins", "Apparel", "Accessories", "Rental", "Lessons"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const colors = CARD_COLORS[index % CARD_COLORS.length];
  const prefersReduced = useReducedMotion();
  const category = CATEGORIES[index % CATEGORIES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      whileHover={prefersReduced ? {} : { scale: 1.03 }}
      className={`product-card relative overflow-hidden rounded-xl ${colors.bg} aspect-[3/4] group cursor-pointer`}
    >
      {/* Product image if available, else styled placeholder */}
      {product.image_url ? (
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-current opacity-20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏄</span>
            </div>
            <p className={`font-heading font-bold text-[clamp(20px,3vw,32px)] leading-tight ${colors.text} opacity-30`}>
              {product.name}
            </p>
          </div>
        </div>
      )}

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Category tag top-left */}
        <div>
          <span
            className={`font-heading font-bold text-xs tracking-[0.15em] uppercase ${colors.accent} bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm`}
          >
            {category}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <h3
            className={`font-heading font-bold text-[clamp(16px,2.2vw,22px)] leading-tight ${colors.text} mb-1`}
          >
            {product.name}
          </h3>
          <p className={`font-heading font-semibold text-xl ${colors.text} opacity-80`}>
            {formatPrice(product.price_cents, product.currency)}
          </p>
        </div>
      </div>

      {/* Coral CTA strip — slides up on hover */}
      <div className="card-cta-strip absolute bottom-0 left-0 right-0 bg-coral py-3 flex items-center justify-center">
        <span className="font-heading font-bold text-white text-sm tracking-wider">
          ADD TO CART →
        </span>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-3 text-center py-16">
      <div className="w-20 h-20 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">🌊</span>
      </div>
      <p className="font-heading font-bold text-ocean text-xl mb-2">New Gear Dropping Soon</p>
      <p className="font-body text-ocean/60 text-sm max-w-xs mx-auto">
        We&apos;re curating the best water sports gear. Check back soon or ask us in the shop.
      </p>
    </div>
  );
}

export default function ProductTeaser({ products }: { products: Product[] }) {
  const prefersReduced = useReducedMotion();
  const featured = products.slice(0, 6);

  return (
    <section className="bg-sand py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="font-heading text-coral text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              The Shop
            </p>
            <h2 className="font-heading font-bold text-ocean text-[clamp(32px,5vw,64px)] leading-tight">
              EVERYTHING YOU NEED.<br />
              <span className="text-outline-cyan">NOTHING YOU DON&apos;T.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex-shrink-0 border-2 border-ocean text-ocean font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-ocean hover:text-sand transition-all duration-300"
          >
            VIEW ALL →
          </Link>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {featured.length === 0 ? (
            <EmptyState />
          ) : (
            featured.map((product, i) => (
              <Link key={product.id} href="/shop">
                <ProductCard product={product} index={i} />
              </Link>
            ))
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-block bg-ocean text-sand font-heading font-bold text-base px-10 py-4 rounded-full hover:bg-ocean/80 transition-colors duration-300"
          >
            SHOP ALL GEAR
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
