"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { FORMSPREE } from "@/lib/clinic";
import RewardCard from "./RewardCard";
import Icon from "./Icon";

export default function KidsRewardFlow({
  gameName,
  score,
  onReset,
}: {
  gameName: { ar: string; en: string };
  score?: string;
  onReset?: () => void;
}) {
  const { lang, t } = useLang();
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const confirm = async () => {
    setConfirmed(true);
    await fetch(FORMSPREE.kids, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        childName: name,
        gameName: gameName.en,
        score: score ?? "",
        date: new Date().toISOString().slice(0, 10),
      }),
    }).catch(() => null);
  };

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="text-6xl">🎉</div>
      <h2 className="mt-2 text-2xl font-extrabold text-ink">{t("أحسنت!", "Well done!")}</h2>
      <p className="mt-1 text-slate-600">{t("لقد فزت! اكتب اسمك لتحصل على بطاقتك التشجيعية.", "You won! Type your name to get your encouragement card.")}</p>

      {!confirmed ? (
        <div className="mt-6 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("اسم صغيرنا الذكي", "Smart little one's name")} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-center text-lg font-bold outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
          <button onClick={confirm} disabled={!name.trim()} className="btn-primary w-full disabled:opacity-40">
            <Icon name="star" className="h-5 w-5" /> {t("احصل على البطاقة", "Get my card")}
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <RewardCard childName={name} gameName={gameName} score={score} />
          {onReset && <button onClick={onReset} className="btn-ghost">{t("العب مرة أخرى", "Play again")}</button>}
        </div>
      )}
    </div>
  );
}
