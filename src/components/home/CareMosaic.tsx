"use client";
import { useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { HOME_MEDIA } from "@/data/homeMedia";
import Icon from "@/components/Icon";
import MaskedCard from "./MaskedCard";
import { useImageSize, useIsMobile, useMaskPositions, useStaggeredReveal } from "./maskHooks";

const SERVICES = [
  { ar: "طب عام", en: "General medicine", num: "01", feat: true },
  { ar: "زيارة منزلية", en: "Home visit", num: "02", feat: false },
  { ar: "رعاية الأطفال", en: "Children care", num: "03", feat: false },
  { ar: "متابعة الأمراض المزمنة", en: "Chronic follow-up", num: "04", feat: false },
  { ar: "فحوصات مخبرية", en: "Lab tests", num: "05", feat: false },
  { ar: "جلسات الحديد بالوريد", en: "IV iron sessions", num: "06", feat: false },
];

export default function CareMosaic() {
  const { lang, t } = useLang();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isMobile = useIsMobile();
  const { positions } = useMaskPositions(gridRef, cardRefs, [isMobile]);
  const natural = useImageSize(HOME_MEDIA.mosaic);
  const { containerRef, getAnimStyle } = useStaggeredReveal();

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="snap-section flex min-h-[calc(100svh-4rem)] w-full items-center py-16 sm:py-20 lg:py-24"
    >
      <div className="container-x w-full">
      <div className="mb-8 max-w-2xl" style={getAnimStyle(0)}>
        <p className="eyebrow mb-3">{t("خدماتنا", "Our services")}</p>
        <h2 className="text-h2 font-extrabold tracking-tight text-navy-900">
          {t("رعاية شاملة في مكان واحد", "Comprehensive care in one place")}
        </h2>
        <p className="mt-3 text-lead text-navy-500">
          {t(
            "من الطوارئ إلى المتابعة المزمنة، نرتب لك الخطوة الطبية الأقرب.",
            "From emergencies to chronic follow-up, we arrange your nearest medical step."
          )}
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-1.5 md:gap-2 lg:h-[68vh] lg:min-h-[540px] lg:grid-cols-3 lg:grid-rows-2"
      >
        {SERVICES.map((s, i) => (
          <Link key={i} href="/booking" className={s.feat ? "lg:row-span-2" : ""}>
            <MaskedCard
              bgImage={HOME_MEDIA.mosaic}
              position={positions[i]}
              natural={natural}
              cardRef={(el) => (cardRefs.current[i] = el)}
              className={`group relative h-full min-h-[150px] overflow-hidden rounded-xl md:min-h-[170px] md:rounded-2xl ${s.feat ? "min-h-[220px]" : ""}`}
              style={getAnimStyle(Math.min(i + 1, 3))}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-navy-950/10 transition-opacity duration-300 group-hover:from-navy-950/90" />
              <span className="absolute top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 text-xs font-semibold text-white ltr:left-3 rtl:right-3 md:h-10 md:w-10 md:text-sm">
                {s.num}
              </span>
              <div className="absolute bottom-3 z-10 ltr:left-4 rtl:right-4 md:bottom-5 ltr:md:left-6 rtl:md:right-6">
                <h3 className={`font-extrabold leading-[1.05] tracking-tight text-white ${s.feat ? "text-2xl md:text-4xl" : "text-lg md:text-2xl"}`}>
                  {lang === "ar" ? s.ar : s.en}
                </h3>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-white/80">
                  {t("احجز الآن", "Book now")} <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                </span>
              </div>
            </MaskedCard>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
