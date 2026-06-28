"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import KidsRewardFlow from "@/components/KidsRewardFlow";
import Icon from "@/components/Icon";
import data from "@/data/kidsGames.json";

export default function HealthyQuizView() {
  const { lang, t } = useLang();
  const qs = data.quiz.questions;
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const answer = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    const correct = idx === qs[i].answer;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 < qs.length) { setI(i + 1); setPicked(null); }
      else setDone(true);
    }, 900);
  };
  const reset = () => { setI(0); setScore(0); setPicked(null); setDone(false); };

  const passed = score >= Math.ceil(qs.length * 0.6);

  return (
    <>
      <PageHeader ar="اختبار صحي" en="Healthy Quiz" subAr="أجب عن الأسئلة وكن بطل الصحة!" subEn="Answer the questions and be a health hero!" emoji="🍎" playful />
      <div className="container-x py-10">
        {done ? (
          passed ? (
            <KidsRewardFlow gameName={{ ar: "اختبار صحي", en: "Healthy Quiz" }} score={`${score}/${qs.length}`} onReset={reset} />
          ) : (
            <div className="mx-auto max-w-md text-center">
              <div className="text-5xl">💪</div>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">{t("محاولة جيدة!", "Good try!")}</h2>
              <p className="mt-1 text-slate-600">{t("نتيجتك", "Your score")}: {score}/{qs.length}</p>
              <button onClick={reset} className="btn-primary mt-5">{t("حاول مرة أخرى", "Try again")}</button>
            </div>
          )
        ) : (
          <div className="mx-auto max-w-md">
            <p className="mb-2 text-center text-sm font-semibold text-slate-500">{t("سؤال", "Question")} {i + 1}/{qs.length}</p>
            <div className="card p-6 text-center">
              <h2 className="text-xl font-bold text-ink">{lang === "ar" ? qs[i].q.ar : qs[i].q.en}</h2>
              <div className="mt-5 space-y-3">
                {qs[i].options.map((o, idx) => {
                  const isAns = idx === qs[i].answer;
                  const state = picked === null ? "" : isAns ? "bg-mint-100 border-mint-400 text-mint-600" : picked === idx ? "bg-rose-50 border-rose-300 text-rose-600" : "opacity-60";
                  return (
                    <button key={idx} onClick={() => answer(idx)} className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-start font-semibold transition ${state || "border-slate-200 hover:border-brand-300"}`}>
                      {lang === "ar" ? o.ar : o.en}
                      {picked !== null && isAns && <Icon name="check" className="h-5 w-5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
