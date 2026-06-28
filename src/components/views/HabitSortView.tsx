"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import KidsRewardFlow from "@/components/KidsRewardFlow";
import data from "@/data/kidsGames.json";

type Item = { id: string; emoji: string; good: boolean; label: { ar: string; en: string } };

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export default function HabitSortView() {
  const { lang, t } = useLang();
  const items = useMemo(() => shuffle(data.habits.items as Item[]), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"" | "ok" | "no">("");
  const [done, setDone] = useState(false);

  const current = items[idx];
  const choose = (good: boolean) => {
    if (feedback) return;
    const correct = good === current.good;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "ok" : "no");
    setTimeout(() => {
      setFeedback("");
      if (idx + 1 < items.length) setIdx(idx + 1);
      else setDone(true);
    }, 700);
  };
  const reset = () => { setIdx(0); setScore(0); setFeedback(""); setDone(false); };
  const passed = score >= Math.ceil(items.length * 0.6);

  return (
    <>
      <PageHeader ar="رتّب العادات" en="Habit Sorting" subAr="هل هذه عادة صحية أم غير صحية؟" subEn="Is this a healthy or unhealthy habit?" emoji="✨" playful />
      <div className="container-x py-10">
        {done ? (
          passed ? (
            <KidsRewardFlow gameName={{ ar: "رتّب العادات", en: "Habit Sorting" }} score={`${score}/${items.length}`} onReset={reset} />
          ) : (
            <div className="mx-auto max-w-md text-center">
              <div className="text-5xl">🌈</div>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">{t("محاولة جميلة!", "Nice try!")}</h2>
              <p className="mt-1 text-slate-600">{t("نتيجتك", "Your score")}: {score}/{items.length}</p>
              <button onClick={reset} className="btn-primary mt-5">{t("حاول مرة أخرى", "Try again")}</button>
            </div>
          )
        ) : (
          <div className="mx-auto max-w-md text-center">
            <p className="mb-3 text-sm font-semibold text-slate-500">{idx + 1}/{items.length}</p>
            <div className={`card flex flex-col items-center gap-3 p-10 transition ${feedback === "ok" ? "bg-mint-50" : feedback === "no" ? "bg-rose-50" : ""}`}>
              <span className="text-7xl">{current.emoji}</span>
              <span className="text-xl font-bold text-ink">{lang === "ar" ? current.label.ar : current.label.en}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button onClick={() => choose(true)} className="rounded-3xl bg-mint-100 py-6 text-lg font-extrabold text-mint-600 shadow-card transition hover:-translate-y-1">😊 {lang === "ar" ? data.habits.good.ar : data.habits.good.en}</button>
              <button onClick={() => choose(false)} className="rounded-3xl bg-rose-100 py-6 text-lg font-extrabold text-rose-600 shadow-card transition hover:-translate-y-1">🙁 {lang === "ar" ? data.habits.bad.ar : data.habits.bad.en}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
