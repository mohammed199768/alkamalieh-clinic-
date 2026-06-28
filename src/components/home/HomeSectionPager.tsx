"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

const LOCK_MS = 950;
const WHEEL_THRESHOLD = 18;
const SWIPE_THRESHOLD = 50;

/**
 * Full-page section pager (homepage only, lg desktop and above).
 * One wheel notch / swipe / arrow key advances exactly one full section.
 * Body scroll is locked while mounted; cleaned up on unmount.
 * Panels translate via CSS transform; section content animates in on its own
 * (each section uses an IntersectionObserver reveal that fires as it slides in).
 */
export default function HomeSectionPager({ panels }: { panels: React.ReactNode[] }) {
  const count = panels.length;
  const [active, setActive] = useState(0);
  const lockedRef = useRef(false);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartY = useRef<number | null>(null);

  const broadcast = useCallback((i: number) => {
    document.documentElement.setAttribute("data-home-section", String(i));
    window.dispatchEvent(new CustomEvent("home-section", { detail: i }));
  }, []);

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => {
        const next = Math.min(count - 1, Math.max(0, prev + dir));
        if (next !== prev) {
          lockedRef.current = true;
          window.setTimeout(() => (lockedRef.current = false), LOCK_MS);
          broadcast(next);
        }
        return next;
      });
    },
    [count, broadcast]
  );

  const goTo = useCallback(
    (i: number) => {
      setActive((prev) => {
        const next = Math.min(count - 1, Math.max(0, i));
        if (next !== prev) {
          lockedRef.current = true;
          window.setTimeout(() => (lockedRef.current = false), LOCK_MS);
          broadcast(next);
        }
        return next;
      });
    },
    [count, broadcast]
  );

  // lock body scroll + init broadcast
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    broadcast(0);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      document.documentElement.removeAttribute("data-home-section");
    };
  }, [broadcast]);

  // wheel — respect inner scroll, then page at boundaries
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      const dy = e.deltaY;
      if (Math.abs(dy) < WHEEL_THRESHOLD) return;
      const panel = panelRefs.current[active];
      if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const atTop = panel.scrollTop <= 0;
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if (dy > 0 && !atBottom) return; // allow native scroll down inside panel
        if (dy < 0 && !atTop) return; // allow native scroll up inside panel
      }
      e.preventDefault();
      if (lockedRef.current) return;
      go(dy > 0 ? 1 : -1);
    },
    [active, go]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    const panel = panelRefs.current[active];
    if (panel && panel.scrollHeight > panel.clientHeight + 1) {
      const atTop = panel.scrollTop <= 0;
      const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
      if (dy > 0 && !atBottom) return;
      if (dy < 0 && !atTop) return;
    }
    if (Math.abs(dy) < SWIPE_THRESHOLD || lockedRef.current) return;
    go(dy > 0 ? 1 : -1);
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(count - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, count]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "calc(100svh - 4rem)" }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="will-change-transform"
        style={{
          transform: `translate3d(0, calc(-${active} * (100svh - 4rem)), 0)`,
          transition: "transform 900ms cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            data-active={i === active}
            className="w-full overflow-y-auto no-scrollbar"
            style={{ height: "calc(100svh - 4rem)" }}
          >
            {panel}
          </div>
        ))}
      </div>

      {/* section dots */}
      <div className="pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 ltr:right-4 rtl:left-4 lg:flex">
        {panels.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Section ${i + 1}`}
            className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              i === active ? "scale-125 bg-brand-600" : "bg-navy-300/60 hover:bg-navy-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
