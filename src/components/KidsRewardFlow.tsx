"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { FORMSPREE } from "@/lib/clinic";
import RewardCard from "./RewardCard";
import Icon from "./Icon";

export default function KidsRewardFlow({
  gameName,
  score,
  levelLabel,
  onReset,
}: {
  gameName: { ar: string; en: string };
  score?: string;
  levelLabel?: string;
  onReset?: () => void;
}) {
  const { lang, t } = useLang();
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const confirm = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE.kids, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          childName: name,
          gameName: gameName.en,
          score: score ?? "",
          levelLabel: levelLabel ?? "",
          language: lang,
          date: new Date().toISOString().slice(0, 10),
        }),
      });
      if (!res.ok) throw new Error("Kids reward submission failed");
      setConfirmed(true);
    } catch {
      setError(t("تعذّر إرسال بيانات الفائز. حاول مرة أخرى.", "Could not submit the winner details. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-[1.75rem] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl">
      <div className="text-5xl" aria-hidden>🎉</div>
      <h2 className="mt-2 text-2xl font-extrabold text-white">{t("أحسنت!", "Well done!")}</h2>
      <p className="mt-1 text-white/75">{t("اكتب اسمك لتحصل على بطاقتك التشجيعية.", "Type your name to get your encouragement card.")}</p>

      {!confirmed ? (
        <div className="mt-6 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("اسم صغيرنا الذكي", "Smart little one's name")}
            aria-label={t("اسم الطفل", "Child's name")}
            className="w-full rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-center text-lg font-bold text-ink outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
          />
          {error && <p className="text-sm font-semibold text-amber-300">{error}</p>}
          <button
            onClick={confirm}
            disabled={!name.trim() || submitting}
            className="btn-primary w-full disabled:opacity-40"
          >
            <Icon name="star" className="h-5 w-5" />{" "}
            {submitting ? t("جارٍ الإرسال…", "Sending…") : t("احصل على البطاقة", "Get my card")}
          </button>
          <p className="text-xs text-white/55">
            {t(
              "يُدخل اسم الطفل فقط لإنشاء البطاقة. لا نطلب أي بيانات أخرى.",
              "The child's name is used only to create the card. We ask for nothing else."
            )}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <RewardCard childName={name} gameName={gameName} score={score} />
          {onReset && (
            <button onClick={onReset} className="btn-ghost">
              {t("العب مرة أخرى", "Play again")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
