"use client";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/home/SplashScreen";
import HeroEditorial from "@/components/home/HeroEditorial";
import CareMosaic from "@/components/home/CareMosaic";
import VisitBooking from "@/components/home/VisitBooking";
import HomeSectionPager from "@/components/home/HomeSectionPager";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [pagerOn, setPagerOn] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      setPagerOn(desktop && !reduce);
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  const panels = [
    <HeroEditorial key="hero" />,
    <CareMosaic key="mosaic" />,
    <VisitBooking key="visit" />,
    <SiteFooter key="footer" force />,
  ];

  return (
    <div className="overflow-x-clip bg-[#f6f9fe]">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {pagerOn ? (
        <HomeSectionPager panels={panels} />
      ) : (
        <div>
          {panels.map((p, i) => (
            <div key={i}>{p}</div>
          ))}
        </div>
      )}
    </div>
  );
}
