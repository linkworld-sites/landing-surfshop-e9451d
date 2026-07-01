"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ConversionForm from "@/components/ConversionForm";

export default function BookingSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24" id="booking">
      {/* Background: environment/location shot */}
      <Image
        src="/images/environment.png"
        alt="Aerial view of surf break and rental location"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ocean/60" />

      {/* Glassmorphism card */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Find Us
            </p>
            <h2 className="font-heading font-bold text-sand text-[clamp(32px,4.5vw,64px)] leading-tight mb-6">
              FIND US WHERE<br />THE OCEAN<br />STARTS.
            </h2>
            <div className="space-y-4 font-body text-sand/80">
              <div className="flex items-start gap-3">
                <span className="text-cyan mt-1">📍</span>
                <div>
                  <p className="font-semibold text-sand">Beach Location</p>
                  <p className="text-sm text-sand/60">At the main beach access — look for the cyan awning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan mt-1">🕐</span>
                <div>
                  <p className="font-semibold text-sand">Open Daily</p>
                  <p className="text-sm text-sand/60">Mon–Sun, 7:00 AM – 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan mt-1">⚡</span>
                <div>
                  <p className="font-semibold text-sand">eFoil Sessions</p>
                  <p className="text-sm text-sand/60">60 min · All levels · Instructor included</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: booking form */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="font-heading font-bold text-sand text-2xl mb-2">Book Your Session</h3>
            <p className="font-body text-sand/60 text-sm mb-6">
              Your first session. Your last excuse. We&apos;ll confirm within 2 hours.
            </p>
            <ConversionForm
              startStep="intent"
              submitStep="convert"
              cta="Book My eFoil Session"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
