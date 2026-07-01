"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ConversionForm from "@/components/ConversionForm";
import { track } from "@/lib/funnel";

// ─── Abstract electric hydrofoil SVG art ────────────────────────────────
function EFoilArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 540"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="foil-halo" cx="50%" cy="58%" r="35%">
          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wake-halo" cx="50%" cy="72%" r="28%">
          <stop offset="0%" stopColor="#1AE8C4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1AE8C4" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Distant horizon haze */}
      <ellipse cx="480" cy="260" rx="420" ry="80" fill="#001f35" opacity="0.5" />

      {/* Water surface — layered waves */}
      <path
        d="M0,300 Q120,282 240,298 Q360,314 480,296 Q600,278 720,294 Q840,310 960,292 L960,540 L0,540 Z"
        fill="#00253d"
        opacity="0.7"
      />
      <path
        d="M0,308 Q120,290 240,306 Q360,322 480,304 Q600,286 720,302 Q840,318 960,300"
        stroke="#00C2FF"
        strokeWidth="1.8"
        opacity="0.5"
      />
      {/* Secondary surface ripples */}
      <path
        d="M0,315 Q120,298 240,313 Q360,328 480,312 Q600,296 720,310"
        stroke="#1AE8C4"
        strokeWidth="1"
        opacity="0.25"
      />
      <path
        d="M300,321 Q420,308 540,319 Q660,330 780,318"
        stroke="#00C2FF"
        strokeWidth="0.8"
        opacity="0.18"
      />

      {/* V-shaped electric wake trail behind the foil */}
      <path
        d="M480,302 L240,400 M480,302 L720,400"
        stroke="#1AE8C4"
        strokeWidth="2.5"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M480,302 L160,430 M480,302 L800,430"
        stroke="#00C2FF"
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M480,302 L80,460 M480,302 L880,460"
        stroke="#00C2FF"
        strokeWidth="0.8"
        opacity="0.15"
        strokeLinecap="round"
      />

      {/* Ambient glow pool around foil area */}
      <rect x="340" y="270" width="280" height="200" fill="url(#foil-halo)" rx="24" />
      <rect x="360" y="340" width="240" height="140" fill="url(#wake-halo)" rx="16" />

      {/* Foil mast — vertical strut from board into water */}
      <line
        x1="480" y1="287" x2="480" y2="390"
        stroke="#1AE8C4"
        strokeWidth="3.5"
        opacity="0.9"
        filter="url(#softglow)"
      />

      {/* Underwater hydrofoil wing */}
      <path
        d="M380,390 Q480,365 580,390 Q480,415 380,390 Z"
        fill="#1AE8C4"
        opacity="0.8"
        filter="url(#glow)"
      />
      {/* Wing sheen highlight */}
      <path
        d="M410,385 Q480,372 550,385"
        stroke="#ffffff"
        strokeWidth="1.2"
        opacity="0.35"
      />

      {/* eFoil board — elevated above water surface */}
      <rect
        x="400" y="276" width="160" height="14"
        rx="7"
        fill="#00C2FF"
        opacity="0.95"
        filter="url(#softglow)"
      />
      {/* Board top sheen */}
      <rect
        x="415" y="279" width="130" height="4"
        rx="2"
        fill="#ffffff"
        opacity="0.3"
      />

      {/* Rider silhouette — standing on board */}
      {/* Legs bent in stance */}
      <path
        d="M468,278 L458,290 M492,277 L502,289"
        stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" opacity="0.7"
      />
      {/* Body torso */}
      <ellipse cx="480" cy="264" rx="11" ry="14" fill="#F5F0E8" opacity="0.75" />
      {/* Head */}
      <circle cx="480" cy="248" r="9" fill="#F5F0E8" opacity="0.82" />
      {/* Helmet highlight */}
      <path d="M473,244 Q480,241 487,244" stroke="#00C2FF" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      {/* Arms raised in celebration */}
      <path
        d="M470,260 L450,245 M490,259 L510,243"
        stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" opacity="0.75"
      />

      {/* Spray particles where foil enters water */}
      <circle cx="395" cy="300" r="3" fill="#1AE8C4" opacity="0.8" filter="url(#softglow)" />
      <circle cx="565" cy="298" r="2.5" fill="#1AE8C4" opacity="0.75" filter="url(#softglow)" />
      <circle cx="375" cy="308" r="2" fill="#00C2FF" opacity="0.6" />
      <circle cx="587" cy="306" r="2" fill="#00C2FF" opacity="0.55" />
      <circle cx="410" cy="295" r="1.5" fill="#1AE8C4" opacity="0.5" />
      <circle cx="552" cy="294" r="1.5" fill="#1AE8C4" opacity="0.45" />
      <circle cx="432" cy="289" r="1" fill="#ffffff" opacity="0.4" />
      <circle cx="530" cy="288" r="1" fill="#ffffff" opacity="0.4" />

      {/* Distant water reflections */}
      <path d="M80,312 Q200,303 320,310" stroke="#00C2FF" strokeWidth="1" opacity="0.2" />
      <path d="M640,306 Q760,298 880,305" stroke="#00C2FF" strokeWidth="1" opacity="0.18" />
      <path d="M100,322 Q180,315 260,320" stroke="#1AE8C4" strokeWidth="0.8" opacity="0.15" />
      <path d="M700,316 Q780,310 860,315" stroke="#1AE8C4" strokeWidth="0.8" opacity="0.13" />

      {/* Speed streak lines */}
      <path d="M60,279 L340,275" stroke="#00C2FF" strokeWidth="1.2" opacity="0.14" strokeDasharray="24,10" />
      <path d="M620,276 L900,280" stroke="#00C2FF" strokeWidth="1.2" opacity="0.12" strokeDasharray="24,10" />
      <path d="M80,268 L280,265" stroke="#1AE8C4" strokeWidth="0.8" opacity="0.1" strokeDasharray="16,8" />
      <path d="M680,268 L880,265" stroke="#1AE8C4" strokeWidth="0.8" opacity="0.1" strokeDasharray="16,8" />

      {/* Electric motor aura at foil junction */}
      <circle cx="480" cy="340" r="18" fill="#00C2FF" opacity="0.12" />
      <circle cx="480" cy="340" r="10" fill="#1AE8C4" opacity="0.2" />
      <circle cx="480" cy="340" r="4" fill="#ffffff" opacity="0.5" />

      {/* Ambient atmospheric particles */}
      <circle cx="200" cy="200" r="2" fill="#00C2FF" opacity="0.2" />
      <circle cx="760" cy="180" r="1.5" fill="#1AE8C4" opacity="0.18" />
      <circle cx="130" cy="250" r="1" fill="#00C2FF" opacity="0.15" />
      <circle cx="830" cy="230" r="1.5" fill="#00C2FF" opacity="0.17" />
      <circle cx="340" cy="160" r="1" fill="#1AE8C4" opacity="0.12" />
      <circle cx="620" cy="155" r="1" fill="#1AE8C4" opacity="0.1" />
    </svg>
  );
}

// ─── Star rating display ─────────────────────────────────────────────────
function Stars({
  rating,
  count,
  dark = false,
}: {
  rating: number;
  count?: number;
  dark?: boolean;
}) {
  const filled = Math.round(rating);
  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`${rating} out of 5 stars${count ? `, ${count} reviews` : ""}`}
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-base leading-none ${
              i <= filled ? "text-yellow-400" : dark ? "text-ocean/20" : "text-white/20"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className={`font-heading font-bold text-base ${dark ? "text-ocean" : "text-sand"}`}>
        {rating}
      </span>
      {count && (
        <span className={`font-body text-sm ${dark ? "text-ocean/50" : "text-sand/50"}`}>
          ({count} reviews)
        </span>
      )}
    </div>
  );
}

// ─── FAQ accordion item ──────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div className="border-b border-ocean/15">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left py-5 flex items-center justify-between gap-4 group cursor-pointer"
      >
        <span className="font-heading font-bold text-ocean text-base sm:text-lg group-hover:text-coral transition-colors duration-200">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-ocean flex items-center justify-center text-sand font-bold text-xl leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="font-body text-ocean/65 text-base leading-relaxed pb-5 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pricing card ────────────────────────────────────────────────────────
function PricingCard({
  badge,
  title,
  price,
  unit,
  features,
  cta,
  highlight,
  onClick,
}: {
  badge?: string;
  title: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  onClick: () => void;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReduced ? {} : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative rounded-2xl p-8 flex flex-col h-full ${
        highlight
          ? "bg-cyan text-ocean shadow-[0_0_40px_rgba(0,194,255,0.25)]"
          : "bg-white/5 border border-cyan/15 text-sand"
      }`}
    >
      {badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-coral text-white font-heading font-bold text-xs px-5 py-1.5 rounded-full tracking-wider uppercase whitespace-nowrap">
          {badge}
        </span>
      )}
      <p
        className={`font-heading font-semibold text-xs tracking-[0.18em] uppercase mb-4 ${
          highlight ? "text-ocean/55" : "text-cyan"
        }`}
      >
        {title}
      </p>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span
          className={`font-heading font-bold text-[clamp(38px,4.5vw,58px)] leading-none ${
            highlight ? "text-ocean" : "text-sand"
          }`}
        >
          {price}
        </span>
      </div>
      <p
        className={`font-body text-sm mb-7 ${highlight ? "text-ocean/55" : "text-sand/45"}`}
      >
        {unit}
      </p>
      <ul className="flex flex-col gap-3.5 flex-1 mb-8">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-3 font-body text-sm leading-snug ${
              highlight ? "text-ocean" : "text-sand/75"
            }`}
          >
            <span
              className={`text-base font-bold flex-shrink-0 mt-0.5 ${
                highlight ? "text-ocean" : "text-cyan"
              }`}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={prefersReduced ? {} : { scale: 1.04 }}
        whileTap={prefersReduced ? {} : { scale: 0.97 }}
        onClick={onClick}
        className={`w-full py-4 rounded-full font-heading font-bold text-sm cursor-pointer transition-colors duration-200 ${
          highlight
            ? "bg-ocean text-sand hover:bg-ocean/80"
            : "bg-cyan text-ocean hover:bg-seafoam"
        }`}
      >
        {cta}
      </motion.button>
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "Do I need any experience to try eFoiling?",
    answer:
      "Zero experience required — that's the whole point. Our certified instructors have guided hundreds of complete beginners to their first liftoff, usually within the first 15–20 minutes. If you can balance on a skateboard or snowboard, you're going to love this.",
  },
  {
    question: "What should I wear for my eFoil session?",
    answer:
      "Wear your swimwear or board shorts underneath. We provide a full wetsuit, impact vest, and helmet — all included in the session price. Just bring sunscreen, a towel, and yourself.",
  },
  {
    question: "How old do you need to be to ride?",
    answer:
      "Riders must be at least 16 years old. Under-18s need a signed parental consent form. There's no upper age limit — we've had riders in their 70s having the time of their lives.",
  },
  {
    question: "Is eFoiling safe? What happens when I fall?",
    answer:
      "eFoiling is remarkably safe with proper instruction. The board has a kill switch that instantly cuts the motor when you fall. With the provided helmet and impact vest, falling into calm warm water is genuinely no big deal — you just climb back on. Your instructor is with you the entire time.",
  },
  {
    question: "How fast does an eFoil go?",
    answer:
      "Our eFoils top out around 35 km/h (22 mph), but most beginners ride comfortably at 10–15 km/h while learning. The wireless remote lets your instructor dial in exactly the right speed for your level.",
  },
  {
    question: "How long before I can fly solo?",
    answer:
      "Most first-timers get airborne within 20–30 minutes. Riding confidently on your own usually takes 2–3 sessions. By your second session you'll be cruising; by your third you'll be thinking about buying one.",
  },
  {
    question: "Can I book a group session or birthday event?",
    answer:
      "Absolutely — group bookings are our favourite. We can accommodate up to 6 riders per session with rotating instruction. Great for birthdays, team days, or a crew of mates chasing something unforgettable. Contact us for group pricing.",
  },
  {
    question: "What's the cancellation policy?",
    answer:
      "Full refund or free reschedule with 24 hours notice. Cancellations within 24 hours receive a session credit valid for 6 months. We also cancel and reschedule for free if conditions are unsafe — your safety always comes first.",
  },
];

const testimonials = [
  {
    quote:
      "Within 20 minutes I was gliding silently above the water. Absolutely surreal. Best experience I've ever had on the ocean — and I've been surfing for years.",
    author: "Marcus T.",
    role: "First-time rider · March 2026",
    initial: "M",
  },
  {
    quote:
      "Booked it for my birthday and brought 4 friends who'd never tried anything like it. Every single one of us got airborne. The instructor was patient, stoked, and genuinely world-class.",
    author: "Jamie O.",
    role: "Group booking · April 2026",
    initial: "J",
  },
  {
    quote:
      "I've surfed for 20 years and nothing prepared me for how different this is. The silence, the height above the water — it's an entirely new feeling. I'm completely hooked.",
    author: "Sarah W.",
    role: "Experienced surfer · May 2026",
    initial: "S",
  },
];

// ─── Main component ──────────────────────────────────────────────────────
export default function EFoilLandingPage() {
  const prefersReduced = useReducedMotion();

  function fadeUp(delay = 0) {
    return {
      initial: { opacity: 0, y: prefersReduced ? 0 : 36 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.12 as number },
      transition: {
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1] as number[],
        delay,
      },
    };
  }

  function handleBookCTA() {
    track("intent");
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth" });
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen bg-ocean flex flex-col justify-center overflow-hidden pt-20"
        id="efoil"
      >
        {/* Abstract art — floats on the lower half */}
        <motion.div
          animate={
            prefersReduced ? {} : { y: [0, -10, 0] }
          }
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute inset-x-0 bottom-0 h-[70%]"
        >
          <EFoilArt className="w-full h-full opacity-70" />
        </motion.div>

        {/* Gradient vignette so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/95 via-ocean/30 to-ocean/80 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 lg:py-24">
          {/* Social proof badge */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-white/8 border border-cyan/25 rounded-full px-5 py-2.5 mb-8"
          >
            <Stars rating={4.9} count={127} />
          </motion.div>

          {/* H1 headline — SEO primary term */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-heading font-bold text-sand text-[clamp(44px,7.5vw,100px)] leading-[0.9] tracking-tight mb-6 max-w-4xl"
          >
            eFOIL RENTALS<br />
            &amp; LESSONS<br />
            <span className="text-cyan">NEAR YOU.</span>
          </motion.h1>

          {/* Sub-headline with local SEO keywords */}
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="font-body text-sand/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Electric surfboard sessions for all skill levels.{" "}
            <strong className="text-sand/90">Instructor included</strong>, all gear provided.
            No waves. No experience. Just pure liftoff — as seen in the best eFoil experience
            2026 reviews.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              whileHover={prefersReduced ? {} : { scale: 1.07, backgroundColor: "#e55a20" }}
              whileTap={prefersReduced ? {} : { scale: 0.96 }}
              onClick={handleBookCTA}
              className="bg-coral text-white font-heading font-bold text-base px-9 py-4 rounded-full cursor-pointer transition-colors duration-200 shadow-[0_4px_24px_rgba(255,107,43,0.35)]"
            >
              Book Your Session
            </motion.button>
            <motion.a
              href="#pricing"
              whileHover={prefersReduced ? {} : { scale: 1.04 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              className="bg-transparent text-sand border border-sand/30 hover:border-cyan hover:text-cyan font-heading font-bold text-base px-9 py-4 rounded-full transition-colors duration-200 cursor-pointer"
            >
              See Pricing
            </motion.a>
          </motion.div>

          {/* Inline stat strip */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
            className="flex flex-wrap gap-x-10 gap-y-5"
          >
            {[
              { value: "From $89", label: "per session" },
              { value: "60 min", label: "session length" },
              { value: "All levels", label: "welcome" },
              { value: "7 days", label: "open weekly" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-cyan text-xl sm:text-2xl">{s.value}</p>
                <p className="font-body text-sand/45 text-xs tracking-widest uppercase mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COLOR BAND: key benefits ───────────────────────────── */}
      <div className="bg-cyan">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-4 items-center justify-between">
          {[
            "⚡ Silent electric motor",
            "🌊 No waves required",
            "🎓 Instructor always included",
            "🚀 Liftoff in your first session",
            "🔒 Full safety gear provided",
          ].map((item) => (
            <span key={item} className="font-heading font-bold text-ocean text-sm">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHAT IS EFOILING ──────────────────────────────────── */}
      <section className="bg-sand py-20 lg:py-32" id="what-is-efoiling">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            {...fadeUp(0)}
            className="font-heading text-coral text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            The Technology
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-heading font-bold text-ocean text-[clamp(32px,4.5vw,64px)] leading-tight mb-6 max-w-3xl"
          >
            WHAT IS<br />eFOILING?
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="font-body text-ocean/65 text-lg leading-relaxed max-w-2xl mb-16"
          >
            An <strong>eFoil (electric hydrofoil)</strong> is a surfboard with a silent battery-powered
            motor and an underwater wing — the foil — that generates lift as you accelerate. Once
            you hit the right speed, the board rises 1–2 feet above the surface and you glide
            silently over the water. No waves. No noise. Just you, the ocean, and the sensation
            of flight. Electric surfboard lessons near you have never been this accessible.
          </motion.p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-16">
            {[
              {
                icon: "⚡",
                title: "Silent Motor",
                desc: "Zero engine noise. Just wind and water — totally zen.",
              },
              {
                icon: "🌊",
                title: "No Waves Needed",
                desc: "Flat bays, calm coves, any body of water works perfectly.",
              },
              {
                icon: "🚀",
                title: "Up to 35 km/h",
                desc: "Speed is wireless remote-controlled — your instructor sets the pace.",
              },
              {
                icon: "🎓",
                title: "Instructor Included",
                desc: "Certified coach in the water with you from start to liftoff.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(0.08 * i)}
                className="bg-white rounded-2xl p-6 border border-ocean/8 hover:border-coral/25 hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-heading font-bold text-ocean text-base mb-2">{item.title}</h3>
                <p className="font-body text-ocean/55 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* How it works */}
          <motion.p
            {...fadeUp(0)}
            className="font-heading text-coral text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            How It Works
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" id="how-it-works">
            {[
              {
                num: "01",
                title: "Book Online",
                desc: "Pick a time slot — available 7 days a week, 7 AM to 7 PM. Confirmation in under 2 hours.",
              },
              {
                num: "02",
                title: "Show Up Stoked",
                desc: "Arrive 10 minutes early. We handle the gear, wetsuit fitting, and full safety briefing.",
              },
              {
                num: "03",
                title: "Lift Off",
                desc: "Your instructor guides you from prone to flying — most beginners get airborne within 20 minutes.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(0.12 * i)}
                className="flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean flex items-center justify-center">
                  <span className="font-heading font-bold text-cyan text-sm">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-ocean text-lg mb-1.5">
                    {step.title}
                  </h3>
                  <p className="font-body text-ocean/55 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ─────────────────────────────────────── */}
      <section className="bg-ocean py-20 lg:py-32" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            {...fadeUp(0)}
            className="font-heading text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            Pricing — eFoil Rentals &amp; Lessons
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-heading font-bold text-sand text-[clamp(32px,4.5vw,64px)] leading-tight mb-4"
          >
            PICK YOUR RIDE.
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="font-body text-sand/55 text-lg mb-14 max-w-xl"
          >
            From your first electric surfboard lesson to owning your own eFoil — every level covered.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div {...fadeUp(0.1)}>
              <PricingCard
                title="eFoil Rental"
                price="$89"
                unit="per 60-min session"
                features={[
                  "60-minute guided session",
                  "Certified instructor on water",
                  "Full wetsuit & safety gear",
                  "All equipment provided",
                  "All skill levels welcome",
                  "Open 7 days a week",
                ]}
                cta="Book a Rental"
                onClick={handleBookCTA}
              />
            </motion.div>
            <motion.div {...fadeUp(0.2)}>
              <PricingCard
                badge="Most Popular"
                title="Lesson Package"
                price="$149"
                unit="2-hour coaching session"
                features={[
                  "2 hours dedicated instruction",
                  "Personalised technique coaching",
                  "Perfect for absolute beginners",
                  "Video footage of your session",
                  "Priority scheduling",
                  "Unlimited liftoff attempts",
                ]}
                cta="Book a Lesson"
                highlight
                onClick={handleBookCTA}
              />
            </motion.div>
            <motion.div {...fadeUp(0.3)}>
              <PricingCard
                title="Own an eFoil"
                price="From $8,999"
                unit="retail — test ride first"
                features={[
                  "Test ride before you commit",
                  "Fliteboard, Lift & Waydoo models",
                  "Trade-in programme available",
                  "12-month warranty support",
                  "Ongoing coaching discount",
                  "Join our local rider community",
                ]}
                cta="Enquire to Buy"
                onClick={handleBookCTA}
              />
            </motion.div>
          </div>

          {/* Reassurance strip */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-12 flex flex-wrap gap-6 items-center justify-center border-t border-cyan/10 pt-10"
          >
            {[
              "✓  Free cancellation 24h before",
              "✓  All gear included",
              "✓  Confirmation in under 2 hours",
              "✓  Walk-ins welcome",
            ].map((item) => (
              <span key={item} className="font-body text-sand/50 text-sm">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────── */}
      <section className="bg-coral py-20 lg:py-32" id="reviews">
        <div className="max-w-7xl mx-auto px-6">
          {/* Rating headline */}
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14"
          >
            <div>
              <p className="font-heading font-bold text-white/70 text-xs tracking-[0.2em] uppercase mb-3">
                Customer Reviews
              </p>
              <div className="flex items-end gap-4">
                <span className="font-heading font-bold text-white text-[clamp(56px,8vw,90px)] leading-none">
                  4.9
                </span>
                <div className="pb-3">
                  <Stars rating={4.9} count={127} />
                  <p className="font-body text-white/55 text-sm mt-1.5">
                    Based on 127 verified eFoil session reviews
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                {...fadeUp(0.12 * i)}
                className="bg-white/12 rounded-2xl p-8 border border-white/18 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-300 text-sm">
                      ★
                    </span>
                  ))}
                </div>
                {/* Quote */}
                <p className="font-body text-white text-base leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center font-heading font-bold text-cyan text-base flex-shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm">{t.author}</p>
                    <p className="font-body text-white/55 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div {...fadeUp(0.25)} className="text-center mt-12">
            <motion.button
              whileHover={prefersReduced ? {} : { scale: 1.06 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              onClick={handleBookCTA}
              className="bg-white text-coral font-heading font-bold text-base px-12 py-4 rounded-full hover:bg-sand transition-colors duration-200 cursor-pointer shadow-lg"
            >
              Join 127+ Happy Riders — Book Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-sand py-20 lg:py-32" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <motion.p
            {...fadeUp(0)}
            className="font-heading text-coral text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            FAQ — eFoil Rentals &amp; Electric Surfboard Lessons
          </motion.p>
          <motion.h2
            {...fadeUp(0.1)}
            className="font-heading font-bold text-ocean text-[clamp(30px,4vw,56px)] leading-tight mb-12"
          >
            YOUR QUESTIONS,<br />ANSWERED.
          </motion.h2>

          <motion.div {...fadeUp(0.15)}>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.25)} className="mt-12 text-center">
            <p className="font-body text-ocean/50 text-sm mb-5">
              Still have questions? We&apos;re here to help.
            </p>
            <motion.button
              whileHover={prefersReduced ? {} : { scale: 1.05 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              onClick={handleBookCTA}
              className="bg-coral text-white font-heading font-bold text-sm px-9 py-3.5 rounded-full hover:bg-coral/88 transition-colors duration-200 cursor-pointer"
            >
              Book Your Session
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── LOCATION + MAP ─────────────────────────────────────── */}
      <section className="bg-ocean py-20 lg:py-28" id="location">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Info */}
            <motion.div {...fadeUp(0)}>
              <p className="font-heading text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Find Us
              </p>
              <h2 className="font-heading font-bold text-sand text-[clamp(28px,4vw,56px)] leading-tight mb-8">
                WHERE THE<br />OCEAN STARTS.
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Location",
                    desc: "Main beach access — look for the cyan awning at the waterfront",
                  },
                  {
                    icon: "🕐",
                    title: "Open Daily",
                    desc: "Monday – Sunday, 7:00 AM – 7:00 PM",
                  },
                  {
                    icon: "📞",
                    title: "Reservations",
                    desc: "Book online for guaranteed slot, or walk-ins welcome",
                  },
                  {
                    icon: "☀️",
                    title: "Session Conditions",
                    desc: "We operate on flat-water calm days for maximum safety and fun",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-heading font-bold text-sand text-sm mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-body text-sand/55 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={prefersReduced ? {} : { scale: 1.05 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                onClick={handleBookCTA}
                className="mt-10 bg-cyan text-ocean font-heading font-bold text-sm px-9 py-4 rounded-full hover:bg-seafoam transition-colors duration-200 cursor-pointer"
              >
                Book Your Session
              </motion.button>
            </motion.div>

            {/* Google Maps embed */}
            <motion.div
              {...fadeUp(0.18)}
              className="rounded-2xl overflow-hidden border border-cyan/20 h-[420px] lg:h-[480px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=Santa+Cruz+Beach,+California&t=m&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Surfshop eFoil rental location map"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ──────────────────────────────────────── */}
      <section className="relative bg-ocean py-24 overflow-hidden" id="booking">
        {/* Decorative rings */}
        <div
          className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full border border-cyan/8 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full border border-coral/8 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="font-heading text-cyan text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Ready to Ride?
            </p>
            <h2 className="font-heading font-bold text-sand text-[clamp(32px,4.5vw,64px)] leading-tight mb-4">
              BOOK YOUR<br />SESSION TODAY.
            </h2>
            <p className="font-body text-sand/55 text-lg">
              Confirmation in under 2 hours. No experience needed. Just show up.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="bg-white/4 border border-cyan/18 rounded-2xl p-8 lg:p-10"
          >
            <ConversionForm
              startStep="intent"
              submitStep="convert"
              cta="Book My eFoil Session"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
