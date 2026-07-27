"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Niche, Project } from "@/lib/data";
import { ProjectCard3D } from "@/components/ProjectCard3D";
import { useLocale } from "@/lib/i18n";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Project[];
  niches: Niche[];
};

export function SearchableShowcase({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  niches,
}: Props) {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<Niche | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const nicheOk = niche === "All" || p.niche === niche;
      if (!nicheOk) return false;
      if (!q) return true;
      const copy = t.projects[p.id];
      const hay = `${p.title} ${copy?.tagline ?? ""} ${copy?.description ?? ""} ${t.niches[p.niche]} ${p.niche} ${p.stack.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, niche, query, t]);

  const availableNiches = useMemo(() => {
    const present = new Set(items.map((p) => p.niche));
    return niches.filter((n) => present.has(n));
  }, [items, niches]);

  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{subtitle}</p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.showcase.search}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-text outline-none placeholder:text-muted/70 focus:border-accent/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNiche("All")}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                niche === "All"
                  ? "bg-accent text-[#041016]"
                  : "border border-white/10 text-muted hover:border-accent/40 hover:text-accent"
              }`}
            >
              {t.showcase.all}
            </button>
            {availableNiches.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNiche(n)}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                  niche === n
                    ? "bg-accent text-[#041016]"
                    : "border border-white/10 text-muted hover:border-accent/40 hover:text-accent"
                }`}
              >
                {t.niches[n]}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs text-muted">
          {t.showcase.showing.replace("{n}", String(filtered.length)).replace("{total}", String(items.length))}
        </p>

        {filtered.length === 0 ? (
          <div className="glass mt-10 rounded-2xl px-6 py-14 text-center text-sm text-muted">
            {t.showcase.empty}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {filtered.map((p, i) => (
              <ProjectCard3D key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
