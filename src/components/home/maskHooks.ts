"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export type MaskPosition = { x: number; y: number; sw: number; sh: number };

/** Tracks the (max-width: 767px) media query. SSR-safe (defaults to false). */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export type ImageSize = { w: number; h: number };

/** Loads the image once and returns its natural dimensions. */
export function useImageSize(src: string): ImageSize {
  const [size, setSize] = useState<ImageSize>({ w: 0, h: 0 });
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => setSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
  }, [src]);
  return size;
}

/**
 * Computes each card's window into the shared section image.
 * Re-measures on ResizeObserver + window resize + provided deps.
 */
export function useMaskPositions(
  sectionRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>,
  deps: unknown[] = []
): { positions: MaskPosition[]; height: number } {
  const [positions, setPositions] = useState<MaskPosition[]>([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const compute = () => {
      const sr = section.getBoundingClientRect();
      const sw = sr.width;
      const sh = sr.height;
      setHeight(sh);
      setPositions(
        cardRefs.current.map((el) => {
          if (!el) return { x: 0, y: 0, sw, sh };
          const r = el.getBoundingClientRect();
          return { x: r.left - sr.left, y: r.top - sr.top, sw, sh };
        })
      );
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(section);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, cardRefs, ...deps]);

  return { positions, height };
}

/**
 * Section reveal via IntersectionObserver. Lightly REPLAYS: becomes active when
 * ~enterRatio of the section is visible, and resets once it has mostly left, so
 * scrolling back up re-triggers the staggered entrance (no constant flicker).
 */
export function useStaggeredReveal(enterRatio = 0.4) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= enterRatio) setVisible(true);
          else if (e.intersectionRatio <= 0.06) setVisible(false);
        });
      },
      { threshold: [0, 0.06, enterRatio, 0.7] }
    );
    io.observe(el);

    // When inside the full-page pager, drive visibility from the active panel
    // (robust even if IntersectionObserver doesn't re-fire on transform-only moves).
    const syncPanel = () => {
      const panel = el.closest("[data-active]");
      if (panel) setVisible(panel.getAttribute("data-active") === "true");
    };
    syncPanel();
    window.addEventListener("home-section", syncPanel as EventListener);

    return () => {
      io.disconnect();
      window.removeEventListener("home-section", syncPanel as EventListener);
    };
  }, [enterRatio]);

  const getAnimStyle = (index: number): CSSProperties => {
    if (reduce) return { opacity: 1, transform: "none" };
    const d = index * 110;
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    };
  };

  const getImageStyle = (delay = 0.15): CSSProperties => {
    if (reduce) return { opacity: 1, transform: "none" };
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1) translateY(0)" : "scale(0.985) translateY(18px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    };
  };

  return { containerRef, getAnimStyle, getImageStyle, visible };
}
