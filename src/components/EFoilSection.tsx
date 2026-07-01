"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setCount(target); return; }
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, prefersReduced]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const steps = [
  { num: "01", label: "Book Online", desc: "Pick your time slot — sessions available 7 days a week at the beach." },
  { num: "02", label: "Show Up", desc: "Arrive 10 minutes early. We handle the gear, wetsuit, and safety briefing." },
  { num: "03", label: "Lift Off", desc: "Your instructor guides you from floating to flying — usually in the first session." },
];

export default function EFoilSection() {
  const prefersReduced = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="bg-ocean py-20 lg:py-32" id="about">
      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-cyan/20 rounded-2xl overflow-hidden mb-20"
        >
          {[
            { value: 60, suffix: " MIN", label: "SESSION LENGTH" },
            { value: 3, suffix: "", label: "SKILL LEVELS" },
            { value: 100, suffix: "%", label: "INSTRUCTOR INCLUDED" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`relative flex flex-col items-center justify-center py-10 px-6 text-center ${
                i < 2 ? "border-b sm:border-b-0 sm:border-r border-cyan/20" : ""
              }`}
            >
              {/* Coral asterisk separator on desktop */}
              {i < 2 && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-coral text-2xl z-10 font-heading"
                >
                  ✱
                </motion.span>
              )}
              <span className="font-heading font-bold text-cyan text-[clamp(48px,6vw,80px)] leading-none">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-heading font-semibold text-sand/60 text-xs tracking-[0.2em] mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column: image + how it works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] lg:h-[560px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/lifestyle.png"
              alt="First-time eFoil rider airborne above the water, smiling"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-coral text-white font-heading text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
                All Levels Welcome
              </span>
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="font-heading text-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              eFoil Rentals
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-sand text-[clamp(32px,4vw,56px)] leading-tight mb-4">
              YOUR FIRST SESSION.<br />YOUR LAST EXCUSE.
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-sand/70 text-lg leading-relaxed mb-10">
              Electric-powered. Silent motor. Up to 35 km/h. Zero waves required. Our instructors have helped hundreds of first-timers achieve liftoff — you&apos;re next.
            </motion.p>

            {/* Steps */}
            <div className="flex flex-col gap-6">
              {steps.map((step) => (
                <motion.div key={step.num} variants={fadeUp} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan flex items-center justify-center">
                    <span className="font-heading font-bold text-ocean text-sm">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sand text-lg mb-1">{step.label}</h3>
                    <p className="font-body text-sand/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <a
                href="#booking"
                className="inline-block bg-cyan text-ocean font-heading font-bold text-base px-8 py-4 rounded-full hover:bg-seafoam transition-colors duration-300"
              >
                BOOK YOUR SESSION
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
