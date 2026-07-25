"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled || open
          ? "border-b border-white/8 bg-[#05070b]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="section-pad mx-auto flex h-full max-w-6xl items-center justify-between">
        <a href="#" className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.22em]">
          {profile.brand}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted transition hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#041016]"
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span className={`h-px w-full bg-text transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-text transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-full bg-text transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-[#05070b]/98 backdrop-blur-xl md:hidden"
          >
            <nav className="section-pad flex flex-col gap-6 pt-10">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
