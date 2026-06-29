"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Icon from "@/components/Icon";

/**
 * Premium night-sky surface shared by every kids game and the hub.
 * Deep navy background, soft glowing aurora, gentle stars + moon accent.
 * Animations are decorative only and respect prefers-reduced-motion.
 */
export default function KidsGameShell({
  children,
  back = true,
}: {
  children: React.ReactNode;
  back?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-navy-950 text-white">
      {/* aurora glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-[#b4a8ff]/15 blur-3xl" />
      </div>
      {/* starfield */}
      <Stars />
      {/* moon accent */}
      <div className="pointer-events-none absolute right-6 top-6 hidden sm:block">
        <div className="h-16 w-16 rounded-full bg-[#ffe08a]/90 shadow-[0_0_50px_12px_rgba(255,224,138,0.45)]" />
      </div>

      <div className="container-x relative z-10 py-8 sm:py-12">
        {back && (
          <Link
            href="/kids"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Icon name="chevron" className="h-4 w-4 rtl:rotate-180" />
            {t("عالم الألعاب", "Games world")}
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}

function Stars() {
  // Deterministic positions so SSR and client markup match.
  const stars = [
    [8, 14, 2], [18, 40, 1.5], [27, 12, 1], [36, 60, 2], [44, 22, 1.5],
    [55, 48, 1], [63, 16, 2], [72, 52, 1.5], [81, 28, 1], [90, 44, 2],
    [12, 70, 1.5], [33, 84, 1], [49, 76, 2], [68, 80, 1.5], [86, 68, 1],
    [22, 56, 1], [58, 34, 1.5], [77, 8, 1], [40, 38, 1], [95, 20, 1.5],
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map(([x, y, r], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white motion-safe:animate-pulseSoft"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${r}px`,
            height: `${r}px`,
            opacity: 0.6,
            animationDelay: `${(i % 5) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Liquid-glass card used inside the night-sky shell. */
export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/15 bg-white/10 p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
