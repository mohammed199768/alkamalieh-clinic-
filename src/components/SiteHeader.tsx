"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CLINIC, telHref, whatsappHref } from "@/lib/clinic";
import BrandMark from "./BrandMark";
import LanguageToggle from "./LanguageToggle";
import Icon from "./Icon";

type Item = { ar: string; en: string; href: string; icon: string; desc?: { ar: string; en: string }; external?: boolean };
type Group = { ar: string; en: string; href?: string; items?: Item[] };

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
  { ar: "تواصل معنا", en: "Contact us", href: "/contact", icon: "headset" },
  { ar: "الموقع والاتجاهات", en: "Location & directions", href: CLINIC.maps, icon: "directions", external: true },
  { ar: "فيسبوك", en: "Facebook", href: CLINIC.facebook, icon: "facebook", external: true },
  { ar: "واتساب", en: "WhatsApp", href: whatsappHref(), icon: "whatsapp", external: true },
];

const GROUPS: Group[] = [
  { ar: "الرئيسية", en: "Home", href: "/" },
  { ar: "الخدمات", en: "Services", items: SERVICES },
  { ar: "احجز الآن", en: "Booking", href: "/booking" },
  { ar: "المحتوى الطبي", en: "Medical Content", items: CONTENT },
  { ar: "العائلة والأطفال", en: "Family & Kids", items: KIDS },
  { ar: "تواصل معنا", en: "Contact", items: CONTACT },
];

export default function SiteHeader() {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isKids = pathname?.startsWith("/kids") || pathname?.startsWith("/bedtime-stories");
  const L = (o: { ar: string; en: string }) => (lang === "ar" ? o.ar : o.en);

  const groupActive = (g: Group) =>
    (g.href && pathname === g.href) || (g.items?.some((i) => !i.external && i.href.split("#")[0] === pathname) ?? false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Kamalia Medical Center" onClick={() => setMenuOpen(false)}>
          <BrandMark />
        </Link>

        {/* desktop nav (lg+) */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {GROUPS.map((g, i) =>
            g.items ? (
              <NavDropdown key={i} group={g} active={groupActive(g)} L={L} />
            ) : (
              <Link
                key={i}
                href={g.href!}
                className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  groupActive(g) ? "text-brand-700" : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {L(g)}
                {groupActive(g) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />}
              </Link>
            )
          )}
        </nav>

        {/* desktop CTAs */}
        <div className="hidden items-center gap-2.5 lg:flex">
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

        {/* mobile/tablet bar (below lg) */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <Link href="/booking" aria-label={t("احجز الآن", "Book Now")} className="btn-primary px-3 py-2">
            <Icon name="calendar" className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label={t("القائمة", "Menu")}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy-200 text-navy-800"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} L={L} t={t} pathname={pathname} />
    </header>
  );
}

/* ---------------- desktop dropdown ---------------- */
function NavDropdown({ group, active, L }: { group: Group; active: boolean; L: (o: { ar: string; en: string }) => string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const openNow = () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); setOpen(true); };
  const closeSoon = () => { closeTimer.current = window.setTimeout(() => setOpen(false), 120); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon} onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition ${active ? "text-brand-700" : "text-navy-600 hover:text-navy-900"}`}
      >
        {L(group)}
        <Icon name="chevron" className={`h-3.5 w-3.5 rotate-90 transition-transform ${open ? "-rotate-90" : ""}`} />
      </button>

      <div
        id={panelId}
        role="menu"
        className={`absolute top-full z-50 mt-2 w-72 origin-top ltr:left-0 rtl:right-0 ${
          open ? "pointer-events-auto opacity-100 translate-y-0 scale-100" : "pointer-events-none opacity-0 -translate-y-1 scale-[0.98]"
        } rounded-2xl border border-white/50 bg-white/85 p-2 shadow-xl backdrop-blur-xl transition-all duration-200`}
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

/* ---------------- mobile / tablet drawer ---------------- */
function MobileMenu({
  open, onClose, L, t, pathname,
}: {
  open: boolean;
  onClose: () => void;
  L: (o: { ar: string; en: string }) => string;
  t: (ar: string, en: string) => string;
  pathname: string | null;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const groups: { head: { ar: string; en: string }; items: Item[] }[] = [
    { head: { ar: "الخدمات", en: "Services" }, items: SERVICES.slice(0, 4) },
    { head: { ar: "المحتوى الطبي", en: "Medical Content" }, items: CONTENT },
    { head: { ar: "العائلة والأطفال", en: "Family & Kids" }, items: [KIDS[0], KIDS[4]] },
    { head: { ar: "التواصل", en: "Contact" }, items: CONTACT },
  ];

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy-950/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white/90 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ltr:right-0 rtl:left-0 ${
          open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <BrandMark />
          <button onClick={onClose} aria-label={t("إغلاق", "Close")} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy-200 text-navy-800">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5">
          <div className="flex flex-col gap-1">
            <DrawerLink href="/" onClose={onClose} active={pathname === "/"}>{t("الرئيسية", "Home")}</DrawerLink>
            <DrawerLink href="/booking" onClose={onClose} active={pathname === "/booking"}>{t("احجز الآن", "Booking")}</DrawerLink>
          </div>

          {groups.map((g, gi) => (
            <div key={gi} className="mt-6">
              <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-brand-600">{L(g.head)}</p>
              <div className="flex flex-col gap-0.5">
                {g.items.map((it, i) =>
                  it.external ? (
                    <a key={i} href={it.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-navy-700 transition hover:bg-brand-50" style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}>
                      <Icon name={it.icon} className="h-5 w-5 text-brand-500" />
                      <span className="text-base font-semibold">{L(it)}</span>
                    </a>
                  ) : (
                    <Link key={i} href={it.href} onClick={onClose} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-navy-700 transition hover:bg-brand-50">
                      <Icon name={it.icon} className="h-5 w-5 text-brand-500" />
                      <span className="text-base font-semibold">{L(it)}</span>
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            <a href={telHref} className="btn-emergency w-full">
              <Icon name="ambulance" className="h-4 w-4" /> {t("طوارئ", "Emergency")}
            </a>
            <Link href="/booking" onClick={onClose} className="btn-primary w-full">
              <Icon name="calendar" className="h-4 w-4" /> {t("احجز الآن", "Book")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DrawerLink({ href, children, onClose, active }: { href: string; children: React.ReactNode; onClose: () => void; active: boolean }) {
  return (
    <Link href={href} onClick={onClose} className={`rounded-xl px-2 py-2.5 text-xl font-bold transition ${active ? "text-brand-700" : "text-navy-900 hover:text-brand-700"}`}>
      {children}
    </Link>
  );
}
