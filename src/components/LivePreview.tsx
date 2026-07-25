"use client";

import { useState } from "react";
import Image from "next/image";
import { liveSnapshot } from "@/lib/data";

type Props = {
  url: string;
  title: string;
  iframeBlocked?: boolean;
};

export function LivePreview({ url, title, iframeBlocked }: Props) {
  const [shotError, setShotError] = useState(false);
  const snapshot = liveSnapshot(url);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#06080d]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-muted">
          {url.replace(/^https?:\/\//, "")}
        </div>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
          Live
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0c12]">
        {/* Always-on live snapshot from the real page */}
        {!shotError ? (
          <Image
            src={snapshot}
            alt={`${title} live preview`}
            fill
            unoptimized
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover object-top"
            onError={() => setShotError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent text-xs text-muted">
            Open live demo →
          </div>
        )}

        {/* Real iframe overlay when the site allows embedding */}
        {!iframeBlocked && (
          <iframe
            src={url}
            title={`${title} live site`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 opacity-95"
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#06080d] to-transparent" />
      </div>
    </div>
  );
}
