"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "eFoil Sessions", href: "/efoil" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ocean/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="font-heading font-bold text-xl lg:text-2xl tracking-tight text-sand"
          >
            SURF<span className="text-cyan">SHOP</span>
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <motion.div key={l.label} whileHover={{ y: -1 }}>
              <Link
                href={l.href}
                className="text-sm font-body font-medium text-sand/80 hover:text-cyan transition-colors duration-200"
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.06, backgroundColor: "#e55a20" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => track("intent")}
            className="bg-coral text-white font-heading font-bold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Book Now
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-sand p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-sand origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 bg-sand"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-sand origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          menuOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-ocean/95 backdrop-blur-md lg:hidden"
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sand/80 hover:text-cyan font-body font-medium py-1 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#booking"
            onClick={() => {
              setMenuOpen(false);
              track("intent");
            }}
            className="bg-coral text-white font-heading font-bold text-sm px-6 py-3 rounded-full text-center mt-2"
          >
            Book Now
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
