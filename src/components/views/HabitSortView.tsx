"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import KidsGameShell, { GlassCard } from "@/components/kids/KidsGameShell";
import KidsGameHeader from "@/components/kids/KidsGameHeader";
import GameProgress from "@/components/kids/GameProgress";
import GameResult from "@/components/kids/GameResult";
import data from "@/data/kidsGames.json";

type Item = { id: string; emoji: string; good: boolean; label: { ar: string; en: string } };

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
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
    }, 750);
  };
  const reset = () => {
    setIdx(0);
    setScore(0);
    setFeedback("");
    setDone(false);
  };

  const pct = (score / items.length) * 100;
  const level =
    pct >= 80
      ? { ar: "بطل العادات", en: "Habit Hero" }
      : pct >= 50
      ? { ar: "صديق الصحة", en: "Health Friend" }
      : { ar: "مستكشف صغير", en: "Little Explorer" };

  return (
    <KidsGameShell>
      <KidsGameHeader
        ar="رتّب العادة الصحية"
        en="Healthy Habit Sort"
        subAr="هل هذه عادة صحية أم غير صحية؟"
        subEn="Is this a healthy or unhealthy habit?"
        object="shield"
      />
      {done ? (
        <GameResult
          gameName={{ ar: "رتّب العادة الصحية", en: "Healthy Habit Sort" }}
          headlineAr="نتيجة اللعبة"
          headlineEn="Game Result"
          levelAr={level.ar}
          levelEn={level.en}
          score={`${score}/${items.length}`}
          onReset={reset}
        />
      ) : (
        <div className="mx-auto max-w-md text-center">
          <GameProgress current={idx + 1} total={items.length} labelAr="عادة" labelEn="Habit" />
          <GlassCard
            className={`flex flex-col items-center gap-3 transition ${
              feedback === "ok" ? "!bg-mint-400/20" : feedback === "no" ? "!bg-amber-300/15" : ""
            }`}
          >
            <span className="text-7xl" aria-hidden>{current.emoji}</span>
            <span className="text-xl font-bold text-white">
              {lang === "ar" ? current.label.ar : current.label.en}
            </span>
          </GlassCard>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => choose(true)}
              className="rounded-3xl border-2 border-mint-300/50 bg-mint-400/20 py-6 text-lg font-extrabold text-mint-100 backdrop-blur transition hover:-translate-y-1 hover:bg-mint-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              😊 {lang === "ar" ? data.habits.good.ar : data.habits.good.en}
            </button>
            <button
              onClick={() => choose(false)}
              className="rounded-3xl border-2 border-amber-300/50 bg-amber-300/15 py-6 text-lg font-extrabold text-amber-100 backdrop-blur transition hover:-translate-y-1 hover:bg-amber-300/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              🙂 {lang === "ar" ? data.habits.bad.ar : data.habits.bad.en}
            </button>
          </div>
          {feedback && (
            <p className="mt-4 text-sm font-semibold text-white/80">
              {feedback === "ok" ? t("أحسنت! 🌟", "Well done! 🌟") : t("لا بأس، لنكمل!", "That's okay, let's continue!")}
            </p>
          )}
        </div>
      )}
    </KidsGameShell>
  );
}
