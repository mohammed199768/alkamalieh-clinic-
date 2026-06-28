"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import KidsGameCard from "@/components/KidsGameCard";
import Link from "next/link";

export default function KidsView() {
  const { t } = useLang();
  const [sound, setSound] = useState(false);
  const games = [
    { href: "/kids/memory-game", emoji: "🧠", color: "#DCEEFF", title: { ar: "لعبة الذاكرة", en: "Memory Game" }, desc: { ar: "طابق البطاقات الصحية", en: "Match the healthy cards" } },
    { href: "/kids/healthy-quiz", emoji: "🍎", color: "#E6F7EC", title: { ar: "اختبار صحي", en: "Healthy Quiz" }, desc: { ar: "أسئلة ممتعة عن الصحة", en: "Fun health questions" } },
    { href: "/kids/habit-sort", emoji: "✨", color: "#FFF1DC", title: { ar: "رتّب العادات", en: "Habit Sorting" }, desc: { ar: "افرز العادات الصحية", en: "Sort healthy habits" } },
  ];
  return (
    <>
      <PageHeader ar="صغيرنا الذكي" en="Smart Little One" subAr="ركن مرح وآمن يتعلّم فيه أطفالنا العادات الصحية باللعب." subEn="A fun, safe corner where kids learn healthy habits by playing." emoji="🧸" playful />
      <SectionShell>
        <div className="mb-6 flex items-center justify-center gap-3">
          <button onClick={() => setSound((s) => !s)} className="btn-ghost text-sm">
            {sound ? t("🔊 الصوت مفعّل", "🔊 Sound on") : t("🔈 الصوت متوقف", "🔈 Sound off")}
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {games.map((g) => <KidsGameCard key={g.href} game={g} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/bedtime-stories" className="btn-primary">{t("حكايات المساء 🌙", "Evening Stories 🌙")}</Link>
        </div>
      </SectionShell>
    </>
  );
}
