"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { liveSnapshot } from "@/lib/data";

type Props = {
  url: string;
  displayUrl: string;
  title: string;
};

/**
 * Lazy live preview: loads snapshot only when near viewport.
 * Snapshot URL waits 10s on thum.io so the page is visually settled.
 * No iframes — avoids multi-site JS/CPU lag.
 */
export function LivePreview({ url, displayUrl, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px 0px" });
  const [shotError, setShotError] = useState(false);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const snapshot = liveSnapshot(url);

  // Small client delay before requesting the shot so cards stagger
  // and the service applies its 10s render wait cleanly.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(t);
  }, [inView]);

  const showImage = inView && ready && !shotError;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-[#06080d]"
    >
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-muted">
          {displayUrl.replace(/^https?:\/\//, "")}
        </div>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
          Live
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0c12]">
        {showImage && (
          <Image
            src={snapshot}
            alt={`${title} live preview`}
            fill
            unoptimized
            loading="lazy"
            decoding="async"
            sizes="(max-width:768px) 100vw, 50vw"
            className={`object-cover object-top transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setShotError(true)}
          />
        )}

        {(!showImage || !loaded) && !shotError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
              Capturing page…
            </p>
          </div>
        )}

        {shotError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent px-4 text-center text-xs text-muted">
            Preview loading · click card to open site
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#06080d] to-transparent" />
      </div>
    </div>
  );
}
