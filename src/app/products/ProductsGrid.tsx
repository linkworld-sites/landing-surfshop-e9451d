"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice, type Product } from "@/lib/checkout";

const FALLBACK: Product[] = [
  {
    id: "efoil-intro",
    name: "eFoil Intro Session",
    description:
      "Your first flight above the ocean. 60 min with a certified instructor, all gear included. No experience needed — beginners get airborne in under 30 min.",
    price_cents: 8900,
    currency: "USD",
    image_url: null,
    stock: null,
  },
  {
    id: "efoil-advanced",
    name: "eFoil Advanced Coaching",
    description:
      "Level up your carving technique with 2 hours of 1:1 coaching. Edging, spray turns, high-speed runs — bring it all together.",
    price_cents: 14900,
    currency: "USD",
    image_url: null,
    stock: null,
  },
  {
    id: "efoil-fullday",
    name: "eFoil Full Day Rental",
    description:
      "Own the water from sunrise to sunset. Unlimited eFoil rental with all equipment, safety gear, and a standby instructor.",
    price_cents: 24900,
    currency: "USD",
    image_url: null,
    stock: null,
  },
  {
    id: "surf-combo",
    name: "Surf + eFoil Combo",
    description:
      "Two sports, one epic day. 90 min of surf fundamentals then a 60 min eFoil session. Perfect for adventurous first-timers.",
    price_cents: 19900,
    currency: "USD",
    image_url: null,
    stock: null,
  },
];

const ACCENTS = ["#00C2FF", "#FF6B2B", "#1AE8C4", "#FF6B2B"] as const;
const BADGE_LABELS = ["Most Popular", "Best Value", "Full Day", "Bundle Deal"];

function WaveIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-36 h-36" style={{ color }} aria-hidden="true">
      <path
        d="M30 130 Q80 80 150 90 Q190 95 170 120 Q150 145 100 140 Q60 136 30 130Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M100 140 L115 90 L130 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="115" cy="85" r="8" fill="currentColor" opacity="0.5" />
      <path
        d="M20 150 Q90 130 160 145 Q180 148 190 155"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}

function CoachIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-36 h-36" style={{ color }} aria-hidden="true">
      <path
        d="M40 160 Q100 60 160 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="7 5"
      />
      <polygon points="100,55 112,88 88,88" fill="currentColor" />
      <circle cx="40" cy="160" r="9" fill="currentColor" opacity="0.7" />
      <circle cx="160" cy="160" r="9" fill="currentColor" opacity="0.7" />
      <path
        d="M65 128 Q100 95 135 128"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
    </svg>
  );
}

function SunIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-36 h-36" style={{ color }} aria-hidden="true">
      <circle cx="100" cy="78" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="100" y1="28" x2="100" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="138" x2="100" y2="128" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="78" x2="40" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="150" y1="78" x2="160" y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="64" y1="42" x2="57" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="136" y1="42" x2="143" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M20 155 Q60 142 100 150 Q140 158 180 145"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.65"
      />
      <path
        d="M15 168 Q60 156 100 163 Q145 170 185 158"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
    </svg>
  );
}

function BoardIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-36 h-36" style={{ color }} aria-hidden="true">
      <path
        d="M20 90 Q50 50 80 80 Q110 110 140 70 Q165 45 185 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect
        x="88"
        y="56"
        width="44"
        height="11"
        rx="5.5"
        fill="currentColor"
        opacity="0.8"
        transform="rotate(-22 110 62)"
      />
      <path
        d="M50 130 Q90 110 130 125 Q160 137 185 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.45"
      />
      <path
        d="M15 162 Q70 150 130 160 Q160 165 185 158"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
    </svg>
  );
}

const ICONS = [WaveIcon, CoachIcon, SunIcon, BoardIcon];

function isRealProduct(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

function ProductCard({
  product,
  index,
  onAdd,
  added,
}: {
  product: Product;
  index: number;
  onAdd: (p: Product) => void;
  added: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const accent = ACCENTS[index % ACCENTS.length];
  const sellable = isRealProduct(product.id);
  const Icon = ICONS[index % ICONS.length];

  return (
    <motion.article
      initial={reducedMotion ? {} : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-300"
    >
      {/* Visual */}
      <div
        className="relative h-52 flex items-center justify-center"
        style={{ background: `${accent}10` }}
      >
        <motion.div
          whileHover={reducedMotion ? {} : { scale: 1.1, rotate: -4 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Icon color={accent} />
        </motion.div>
        <div className="absolute bottom-4 right-4">
          <span
            className="font-heading font-bold text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            {BADGE_LABELS[index % BADGE_LABELS.length]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="font-heading font-bold text-sand text-xl leading-tight">
            {product.name}
          </h2>
          <span
            className="font-heading font-bold text-xl tabular-nums shrink-0"
            style={{ color: accent }}
          >
            {formatPrice(product.price_cents, product.currency)}
          </span>
        </div>
        {product.description && (
          <p className="font-body text-sand/55 text-sm leading-relaxed flex-1 mb-5">
            {product.description}
          </p>
        )}
        <motion.button
          type="button"
          onClick={() => onAdd(product)}
          disabled={!sellable || added}
          whileHover={sellable && !added ? { scale: 1.03 } : {}}
          whileTap={sellable && !added ? { scale: 0.97 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-full py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wide text-ocean transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: added ? "#1AE8C4" : accent }}
        >
          {!sellable ? "Loading…" : added ? "Added to Cart ✓" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const { add, count } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const catalog = products.length > 0 ? products : FALLBACK;

  function handleAdd(product: Product) {
    add(product);
    setAddedIds((prev) => new Set([...prev, product.id]));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2200);
  }

  return (
    <>
      {/* Cart badge */}
      <div className="flex justify-end mb-8">
        <Link href="/cart">
          <motion.span
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-coral text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full cursor-pointer"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 ? `Cart (${count}) →` : "View Cart →"}
          </motion.span>
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {catalog.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            onAdd={handleAdd}
            added={addedIds.has(p.id)}
          />
        ))}
      </div>
    </>
  );
}
