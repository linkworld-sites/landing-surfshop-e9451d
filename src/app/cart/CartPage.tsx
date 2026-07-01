"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { fetchProducts, formatPrice, type Product } from "@/lib/checkout";

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    fetchProducts().then(setCatalog);
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    catalog.forEach((p) => m.set(p.id, p));
    return m;
  }, [catalog]);

  const total = useMemo(
    () =>
      items.reduce((s, i) => {
        const p = byId.get(i.product_id);
        return s + (p ? p.price_cents * i.quantity : 0);
      }, 0),
    [items, byId]
  );

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00C2FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2 className="font-heading font-bold text-ocean text-2xl mb-3">Your cart is empty</h2>
        <p className="font-body text-ocean/60 text-base mb-8 max-w-sm mx-auto">
          Add some eFoil sessions or gear and come back here to checkout.
        </p>
        <Link href="/products">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-coral text-white font-heading font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wide cursor-pointer"
          >
            Browse Products →
          </motion.span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      {/* Line items */}
      <div>
        <ul className="divide-y divide-ocean/10">
          {items.map((item, i) => {
            const product = byId.get(item.product_id);
            const name = product?.name ?? "Loading…";
            const price = product
              ? formatPrice(product.price_cents * item.quantity, product.currency)
              : "—";

            return (
              <motion.li
                key={item.product_id}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00C2FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M17.5 19H9a7 7 0 010-14h7.5" />
                      <path d="m17 5 5 5-5 5" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-ocean text-base truncate">{name}</p>
                    <p className="font-body text-ocean/50 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-heading font-bold text-ocean tabular-nums">{price}</span>
                  <motion.button
                    type="button"
                    onClick={() => remove(item.product_id)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Remove ${name}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-ocean/40 hover:text-coral hover:bg-coral/10 transition-colors"
                  >
                    ×
                  </motion.button>
                </div>
              </motion.li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={clear}
          className="mt-4 font-body text-ocean/40 text-xs uppercase tracking-wide hover:text-coral transition-colors"
        >
          Clear cart
        </button>
      </div>

      {/* Summary */}
      <div className="bg-ocean rounded-2xl p-6 h-fit lg:sticky lg:top-24">
        <h2 className="font-heading font-bold text-sand text-xl mb-6">Order Summary</h2>
        <ul className="space-y-3 mb-4">
          {items.map((item) => {
            const product = byId.get(item.product_id);
            if (!product) return null;
            return (
              <li key={item.product_id} className="flex justify-between text-sm">
                <span className="font-body text-sand/60 truncate mr-2">
                  {product.name} ×{item.quantity}
                </span>
                <span className="font-heading font-bold text-sand tabular-nums">
                  {formatPrice(product.price_cents * item.quantity, product.currency)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-cyan/20 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-sand">Total</span>
            <span className="font-heading font-bold text-cyan text-xl tabular-nums">
              {formatPrice(total)}
            </span>
          </div>
        </div>
        <Link href="/checkout">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full text-center bg-coral text-white font-heading font-bold text-sm uppercase tracking-wide py-4 rounded-xl cursor-pointer"
          >
            Proceed to Checkout →
          </motion.div>
        </Link>
        <Link
          href="/products"
          className="block text-center mt-3 font-body text-sand/40 text-xs uppercase tracking-wide hover:text-sand transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
