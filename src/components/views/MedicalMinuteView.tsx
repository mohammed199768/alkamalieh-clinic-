"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { whatsappHref } from "@/lib/clinic";
import PageHeader from "@/components/PageHeader";
import StoryCircle from "@/components/StoryCircle";
import ReelCard from "@/components/ReelCard";
import Icon from "@/components/Icon";
import data from "@/data/medicalMinute.json";

type Bi = { ar: string; en: string };
type Reel = { id: string; category: string; color: string; title: Bi; body: Bi };

export default function MedicalMinuteView() {
  const { lang, t } = useLang();
  const L = (b: Bi) => (lang === "ar" ? b.ar : b.en);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Reel | null>(null);

  const reels = useMemo(() => {
    return (data.reels as Reel[]).filter((r) => {
      const okTab = tab === "all" || r.category === tab;
      const okQ = !q || L(r.title).toLowerCase().includes(q.toLowerCase()) || L(r.body).toLowerCase().includes(q.toLowerCase());
      return okTab && okQ;
    });
  }, [tab, q, lang]);

  return (
    <>
      <PageHeader ar="صحتك في دقيقة" en="Medical Minute" subAr="معلومة صحية سريعة بأسلوب ممتع وسهل." subEn="Quick health bites in a fun, easy format." icon="play" />

      <section className="container-x py-8">
        {/* Stories circles */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {data.stories.map((s) => (
            <StoryCircle key={s.id} story={s} onClick={() => {
              const r = (data.reels as Reel[]).find((x) => x.category === s.category);
              if (r) setActive(r);
            }} />
          ))}
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:left-4 rtl:right-4 text-slate-400"><Icon name="search" className="h-5 w-5" /></span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("ابحث عن نصيحة…", "Search a tip…")} className="w-full rounded-2xl border border-slate-200 bg-white py-3 ltr:pl-12 rtl:pr-12 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
        </div>

        {/* Category tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {data.categories.map((c) => (
            <button key={c.id} onClick={() => setTab(c.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${tab === c.id ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
              {L(c.label)}
            </button>
          ))}
        </div>

        {/* Reels grid (horizontal swipe on mobile) */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-3 no-scrollbar sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible lg:grid-cols-4">
          {reels.map((r) => (
            <div key={r.id} className="w-44 shrink-0 sm:w-auto"><ReelCard reel={r} onOpen={() => setActive(r)} /></div>
          ))}
        </div>
        {reels.length === 0 && <p className="py-10 text-center text-slate-400">{t("لا نتائج", "No results")}</p>}
      </section>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="flex aspect-[9/12] flex-col justify-end p-6 text-white" style={{ background: active.color }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="relative">
                <span className="chip mb-2 bg-white/85">{t("صحتك في دقيقة", "Medical Minute")}</span>
                <h3 className="text-2xl font-extrabold drop-shadow">{L(active.title)}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-slate-700">{L(active.body)}</p>
              <p className="mt-3 text-xs text-amber-700">{t("محتوى تثقيفي عام لا يغني عن مراجعة الطبيب.", "General educational content; not a substitute for a doctor.")}</p>
              <a href={whatsappHref(L(active.title))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 w-full text-sm">
                <Icon name="whatsapp" className="h-4 w-4" /> {t("اسأل عبر واتساب", "Ask on WhatsApp")}
              </a>
              <button onClick={() => setActive(null)} className="btn-ghost mt-2 w-full text-sm">{t("إغلاق", "Close")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
