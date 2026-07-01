"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I've tried surfing, paddleboarding, wakeboarding — nothing prepared me for how quickly I was up on the eFoil. Within 20 minutes I was gliding silently above the water. Absolutely surreal.",
    author: "Marcus T.",
    role: "First-time rider, March 2026",
    initial: "M",
    color: "bg-coral",
  },
  {
    quote:
      "The shop has the best curated selection I've found anywhere on the coast. The team knows exactly what gear you need for your level — no upselling, just honest advice. Left with a board that changed my surfing.",
    author: "Priya K.",
    role: "Regular customer",
    initial: "P",
    color: "bg-cyan",
  },
  {
    quote:
      "Booked the eFoil rental for my birthday and brought 4 friends who'd never done anything like it. Every single one of them got airborne. The instructor was patient, stoked, and genuinely brilliant. We're all hooked.",
    author: "Jamie O.",
    role: "Group booking, April 2026",
    initial: "J",
    color: "bg-seafoam",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-ocean py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <h2 className="font-heading font-bold text-sand text-[clamp(28px,4vw,48px)] leading-tight">
            RIDERS SPEAK<br />FOR THEMSELVES.
          </h2>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-cyan w-14" : "bg-sand/20"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-body text-sand/90 text-[clamp(18px,2.5vw,28px)] leading-relaxed max-w-4xl italic">
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div
                className={`w-12 h-12 rounded-full ${testimonials[active].color} flex items-center justify-center font-heading font-bold text-ocean text-lg`}
              >
                {testimonials[active].initial}
              </div>
              <div>
                <p className="font-heading font-bold text-sand text-base">
                  {testimonials[active].author}
                </p>
                <p className="font-body text-sand/50 text-sm">
                  {testimonials[active].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail previews */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                i === active
                  ? "border-cyan/40 bg-cyan/5"
                  : "border-sand/10 bg-sand/5 hover:border-sand/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center font-heading font-bold text-ocean text-sm`}
                >
                  {t.initial}
                </div>
                <span className="font-heading font-bold text-sand text-sm">{t.author}</span>
              </div>
              <p className="font-body text-sand/50 text-sm line-clamp-2 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
