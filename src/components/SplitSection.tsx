"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (prefersReduced: boolean | null) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
});

export default function SplitSection() {
  const prefersReduced = useReducedMotion();
  const variant = fadeUp(prefersReduced);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
      {/* Left: The Shop */}
      <div className="relative bg-ocean overflow-hidden group min-h-[400px]">
        <Image
          src="/images/environment.png"
          alt="Surf shop equipment and boards"
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span
              variants={variant}
              className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
            >
              The Shop
            </motion.span>
            <motion.h2
              variants={variant}
              className="font-heading font-bold text-sand text-[clamp(28px,4vw,52px)] leading-tight mb-4"
            >
              EVERYTHING YOU NEED<br />IN THE WATER.
            </motion.h2>
            <motion.p
              variants={variant}
              className="text-sand/70 font-body text-base mb-6 max-w-sm"
            >
              Boards, fins, wax, leashes — curated by riders who live on the water.
            </motion.p>
            <motion.div variants={variant}>
              <Link
                href="/shop"
                className="inline-block border-2 border-cyan text-cyan font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-cyan hover:text-ocean transition-all duration-300"
              >
                SHOP NOW →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right: eFoil Rentals */}
      <div className="relative bg-cyan/20 overflow-hidden group min-h-[400px]" id="efoil">
        <Image
          src="/images/lifestyle.png"
          alt="eFoil rider flying above the water"
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Cyan glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-cyan/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          >
            <motion.span
              variants={variant}
              className="font-heading text-seafoam text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
            >
              eFoil Rentals
            </motion.span>
            <motion.h2
              variants={variant}
              className="font-heading font-bold text-sand text-[clamp(28px,4vw,52px)] leading-tight mb-4"
            >
              FLY ON WATER.<br />NO EXPERIENCE<br />NEEDED.
            </motion.h2>
            <motion.p
              variants={variant}
              className="text-sand/70 font-body text-base mb-6 max-w-sm"
            >
              The ocean just got an upgrade. Lift off in minutes with an instructor by your side.
            </motion.p>
            <motion.div variants={variant}>
              <a
                href="#booking"
                className="inline-block bg-coral text-white font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-coral/90 transition-all duration-300"
              >
                BOOK A SESSION →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
