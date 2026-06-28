"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/i18n";
import { CLINIC, telHref, whatsappHref } from "@/lib/clinic";
import BrandMark from "./BrandMark";
import LanguageToggle from "./LanguageToggle";
import Icon from "./Icon";

type Item = { ar: string; en: string; href: string; icon: string; external?: boolean };
type Group = { ar: string; en: string; href?: string; items?: Item[] };

const MAIN: Item[] = [
  { ar: "الرئيسية", en: "Home", href: "/", icon: "home" },
  { ar: "الخدمات", en: "Services", href: "/services", icon: "stethoscope" },
  { ar: "احجز الآن", en: "Book Now", href: "/booking", icon: "calendar" },
  { ar: "تواصل معنا", en: "Contact us", href: "/contact", icon: "headset" },
];

const SERVICES: Item[] = [
  { ar: "طب عام", en: "General medicine", href: "/services", icon: "stethoscope" },
  { ar: "طوارئ 24 ساعة", en: "24/7 Emergency", href: "/emergency", icon: "ambulance" },
  { ar: "زيارات منزلية", en: "Home visits", href: "/services#home-visits", icon: "home" },
  { ar: "فحوصات مخبرية", en: "Lab tests", href: "/services#labs", icon: "vial" },
  { ar: "جلسات الحديد بالوريد", en: "IV iron sessions", href: "/services#iv-iron", icon: "droplet" },
  { ar: "متابعة الأمراض المزمنة", en: "Chronic care", href: "/services#chronic-care", icon: "heart-pulse" },
];

const CONTENT: Item[] = [
  { ar: "صحتك في دقيقة", en: "Medical Minute", href: "/medical-minute", icon: "play" },
  { ar: "نصائح طبية", en: "Medical tips", href: "/medical-tips", icon: "activity" },
  { ar: "قصص يومية", en: "Daily stories", href: "/daily-stories", icon: "quote" },
  { ar: "شاهد معنا", en: "Watch with us", href: "/videos", icon: "video" },
  { ar: "الأسئلة الشائعة", en: "FAQ", href: "/faq", icon: "message" },
];

const KIDS: Item[] = [
  { ar: "صغيرنا الذكي", en: "Smart Little One", href: "/kids", icon: "users" },
  { ar: "لعبة الذاكرة الصحية", en: "Memory game", href: "/kids/memory-game", icon: "sparkle" },
  { ar: "صح أم خطأ الصحي", en: "Healthy quiz", href: "/kids/healthy-quiz", icon: "check" },
  { ar: "رتّب العادة الصحية", en: "Habit sort", href: "/kids/habit-sort", icon: "star" },
  { ar: "حكايات المساء", en: "Evening Stories", href: "/bedtime-stories", icon: "bed" },
];

const CONTACT: Item[] = [
  { ar: "واتساب", en: "WhatsApp", href: whatsappHref(), icon: "whatsapp", external: true },
  { ar: "فيسبوك", en: "Facebook", href: CLINIC.facebook, icon: "facebook", external: true },
  { ar: "الموقع والاتجاهات", en: "Location & directions", href: CLINIC.maps, icon: "directions", external: true },
];

const GROUPS: Group[] = [
  { ar: "الرئيسية", en: "Home", href: "/" },
  { ar: "الخدمات", en: "Services", items: SERVICES },
  { ar: "احجز الآن", en: "Booking", href: "/booking" },
  { ar: "المحتوى الطبي", en: "Medical Content", items: CONTENT },
  { ar: "العائلة والأطفال", en: "Family & Kids", items: KIDS },
  { ar: "تواصل معنا", en: "Contact", items: [{ ar: "تواصل معنا", en: "Contact us", href: "/contact", icon: "headset" }, ...CONTACT] },
];

export default function SiteHeader() {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isKids = pathname?.startsWith("/kids") || pathname?.startsWith("/bedtime-stories");
  const L = (o: { ar: string; en: string }) => (lang === "ar" ? o.ar : o.en);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const groupActive = (g: Group) =>
    (g.href && pathname === g.href) || (g.items?.some((i) => !i.external && i.href.split("#")[0] === pathname) ?? false);

  return (
    <header className="fixed inset-x-0 top-0 z-[500] h-16 max-w-full border-b border-white/60 bg-white/80 backdrop-blur-2xl lg:sticky">
      <div className="container-x relative z-[501] flex h-16 max-w-full items-center justify-between gap-2 sm:gap-4">
        <Link href="/" aria-label="Kamalia Medical Center" onClick={closeMenu} className="min-w-0 shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {GROUPS.map((g, i) =>
            g.items ? (
              <NavDropdown key={i} group={g} active={groupActive(g)} L={L} />
            ) : (
              <Link
                key={i}
                href={g.href!}
                className={`relative rounded-full px-2.5 py-2 text-xs font-semibold transition xl:px-3.5 xl:text-sm ${
                  groupActive(g) ? "text-brand-700" : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {L(g)}
                {groupActive(g) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <LanguageToggle />
          {!isKids && (
            <a href={telHref} className="btn-emergency px-3.5 py-2 text-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <Icon name="ambulance" className="h-3.5 w-3.5" />
              </span>
              {t("طوارئ", "Emergency")}
            </a>
          )}
          <Link href="/booking" className="btn-primary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <Icon name="calendar" className="h-3.5 w-3.5" />
            </span>
            {t("احجز الآن", "Book Now")}
          </Link>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 lg:hidden">
          <LanguageToggle className="shrink-0" />
          <Link
            href="/booking"
            aria-label={t("احجز الآن", "Book Now")}
            onClick={closeMenu}
            className="btn-primary hidden h-11 w-11 shrink-0 px-0 min-[390px]:inline-flex"
          >
            <Icon name="calendar" className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("القائمة", "Menu")}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-navy-200/70 bg-white/80 text-navy-800 shadow-xs transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} L={L} t={t} pathname={pathname} />
    </header>
  );
}

function NavDropdown({ group, active, L }: { group: Group; active: boolean; L: (o: { ar: string; en: string }) => string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className={`flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-semibold transition xl:px-3.5 xl:text-sm ${active ? "text-brand-700" : "text-navy-600 hover:text-navy-900"}`}
      >
        {L(group)}
        <Icon name="chevron" className={`h-3.5 w-3.5 rotate-90 transition-transform ${open ? "-rotate-90" : ""}`} />
      </button>

      {open && (
        <div
          id={panelId}
          role="menu"
          className="absolute top-full z-[600] mt-2 w-72 origin-top animate-fadeIn rounded-2xl border border-white/50 bg-white/90 p-2 shadow-xl backdrop-blur-2xl ltr:left-0 rtl:right-0"
        >
          {group.items!.map((it, i) =>
            it.external ? (
              <a key={i} role="menuitem" href={it.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-brand-50">
                <DropIcon name={it.icon} />
                <span className="text-sm font-semibold text-navy-800">{L(it)}</span>
              </a>
            ) : (
              <Link key={i} role="menuitem" href={it.href} onClick={() => setOpen(false)} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-brand-50">
                <DropIcon name={it.icon} />
                <span className="text-sm font-semibold text-navy-800">{L(it)}</span>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

function DropIcon({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
      <Icon name={name} className="h-4 w-4" />
    </span>
  );
}

function MobileMenu({
  open,
  onClose,
  L,
  t,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  L: (o: { ar: string; en: string }) => string;
  t: (ar: string, en: string) => string;
  pathname: string | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overscrollBehavior = prevBodyOverscroll;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const groups: { head: { ar: string; en: string }; items: Item[] }[] = [
    { head: { ar: "الرئيسية", en: "Main" }, items: MAIN },
    { head: { ar: "الخدمات", en: "Services" }, items: SERVICES },
    { head: { ar: "المحتوى الطبي", en: "Medical Content" }, items: CONTENT },
    { head: { ar: "العائلة والأطفال", en: "Family & Kids" }, items: KIDS },
  ];

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("القائمة", "Menu")}
      className={`fixed inset-0 z-[999] max-w-full overflow-hidden bg-[#f4f8ff]/90 text-navy-900 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      } motion-reduce:transition-none`}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,112,228,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(54,183,210,0.18),transparent_36%)]" />
      <div
        className={`relative z-[1000] flex h-dvh max-w-full flex-col overflow-y-auto overscroll-contain px-4 pb-6 pt-4 transition-transform duration-300 sm:px-8 ${
          open ? "translate-y-0" : "translate-y-5"
        } motion-reduce:translate-y-0 motion-reduce:transition-none`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-4">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("إغلاق", "Close")}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-navy-200/70 bg-white/80 text-navy-800 shadow-soft transition hover:border-brand-300 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label={t("القائمة", "Menu")} className="mx-auto grid w-full max-w-3xl flex-1 content-start gap-3 py-4">
          {groups.map((g, gi) => (
            <section
              key={gi}
              className={`rounded-3xl border border-white/70 bg-white/75 p-3 text-start shadow-soft backdrop-blur-xl transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
              style={{ transitionDelay: open ? `${gi * 45}ms` : "0ms" }}
            >
              <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{L(g.head)}</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {g.items.map((it, i) => (
                  <MobileMenuItem
                    key={`${it.href}-${i}`}
                    item={it}
                    L={L}
                    onClose={onClose}
                    active={!it.external && it.href.split("#")[0] === pathname}
                  />
                ))}
              </div>
            </section>
          ))}
        </nav>

        <div
          className={`mx-auto grid w-full max-w-3xl gap-2 border-t border-navy-100/70 pt-4 transition-all duration-300 min-[440px]:grid-cols-3 ${
            open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
          style={{ transitionDelay: open ? `${groups.length * 45}ms` : "0ms" }}
        >
          <Link href="/booking" onClick={onClose} className="btn-primary w-full">
            <Icon name="calendar" className="h-4 w-4" /> {t("احجز الآن", "Book Now")}
          </Link>
          <a href={telHref} className="btn-emergency w-full" onClick={onClose}>
            <Icon name="ambulance" className="h-4 w-4" /> {t("طوارئ", "Emergency")}
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full" onClick={onClose}>
            <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

function MobileMenuItem({
  item,
  L,
  onClose,
  active,
}: {
  item: Item;
  L: (o: { ar: string; en: string }) => string;
  onClose: () => void;
  active: boolean;
}) {
  const className = `flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
    active ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100" : "text-navy-800 hover:bg-brand-50 hover:text-brand-700"
  }`;
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
        <Icon name={item.icon} className="h-4 w-4" />
      </span>
      <span>{L(item)}</span>
    </>
  );

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClose}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onClose}>
      {content}
    </Link>
  );
}
