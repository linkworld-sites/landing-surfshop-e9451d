"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { track } from "@/lib/funnel";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [1, 1.1]
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.8]);

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.3 },
    },
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imgScale }}
      >
        <Image
          src="/images/hero.png"
          alt="eFoil rider lifting above the ocean at golden hour"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-ocean"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="font-heading text-cyan text-sm lg:text-base font-semibold tracking-[0.25em] uppercase mb-4"
          >
            Electric Hydrofoil Rentals &amp; Surf Shop
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-bold leading-none tracking-tight"
          >
            <span className="block text-sand text-[clamp(64px,11vw,160px)]">
              RIDE ABOVE
            </span>
            <span
              className="block text-[clamp(64px,11vw,160px)]"
              style={{
                WebkitTextStroke: "2px #00C2FF",
                color: "transparent",
              }}
            >
              IT ALL
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-sand/80 text-lg lg:text-xl max-w-xl mt-6 mb-10 leading-relaxed"
          >
            No waves. No limits. Just lift. Experience the future of water sports at our sun-soaked beach location.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.06, backgroundColor: "#e55a20" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => track("intent")}
              className="bg-coral text-white font-heading font-bold text-base lg:text-lg px-8 py-4 rounded-full inline-block text-center cursor-pointer transition-colors"
            >
              RENT AN eFOIL TODAY
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <a
                href="/shop"
                className="border-2 border-sand/60 text-sand font-heading font-bold text-base lg:text-lg px-8 py-4 rounded-full inline-block text-center hover:border-cyan hover:text-cyan transition-colors"
              >
                EXPLORE THE SHOP
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sand/50 font-body text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-sand/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
