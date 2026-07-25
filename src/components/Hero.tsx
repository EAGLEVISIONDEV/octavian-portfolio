"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const HeroScene3D = dynamic(
  () => import("@/components/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false },
);

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-mask opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(94,234,212,0.12),transparent_55%)]"
      />

      <div className="absolute inset-y-0 right-0 w-full opacity-80 lg:w-[55%]">
        <HeroScene3D />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-24 pt-28 lg:justify-center lg:pb-16">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent"
          >
            {profile.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            {profile.name.split(" ")[0]}
            <br />
            <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#041016] transition hover:bg-accent-2"
            >
              View work
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-text transition hover:border-accent hover:text-accent"
            >
              GitHub profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
