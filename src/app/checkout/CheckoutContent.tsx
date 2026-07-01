"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { fetchProducts, formatPrice, type Product } from "@/lib/checkout";
import ConversionForm from "@/components/ConversionForm";

const CHECKOUT_FIELDS = [
  { name: "name", label: "Full Name", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "message", label: "Order Notes / Questions", type: "textarea" },
];

export default function CheckoutContent() {
  const { items } = useCart();
  const reducedMotion = useReducedMotion();
  const [catalog, setCatalog] = useState<Product[]>([]);

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

  const hasItems = items.length > 0;

  return (
    <div className="space-y-8">
      {/* Cart summary */}
      {hasItems && (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/[0.05] border border-cyan/20 rounded-2xl p-6"
        >
          <h2 className="font-heading font-bold text-cyan text-sm uppercase tracking-[0.15em] mb-4">
            Your Order
          </h2>
          <ul className="space-y-2 mb-4">
            {items.map((item) => {
              const product = byId.get(item.product_id);
              const name = product?.name ?? "Loading…";
              const price = product
                ? formatPrice(product.price_cents * item.quantity, product.currency)
                : "";
              return (
                <li key={item.product_id} className="flex justify-between text-sm">
                  <span className="font-body text-sand/70">
                    {name} ×{item.quantity}
                  </span>
                  {price && (
                    <span className="font-heading font-bold text-sand">{price}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {total > 0 && (
            <div className="border-t border-cyan/20 pt-3 flex justify-between">
              <span className="font-heading font-bold text-sand text-sm">Total</span>
              <span className="font-heading font-bold text-cyan">{formatPrice(total)}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Contact form */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: hasItems ? 0.1 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-sand bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8"
      >
        <ConversionForm
          startStep="intent"
          submitStep="convert"
          cta="Confirm Booking"
          fields={CHECKOUT_FIELDS}
        />
      </motion.div>

      <p className="font-body text-sand/30 text-xs text-center">
        We&apos;ll reply within 24 hours to confirm your booking and next steps.{" "}
        <Link href="/cart" className="text-cyan/50 hover:text-cyan transition-colors">
          ← Back to cart
        </Link>
      </p>
    </div>
  );
}
