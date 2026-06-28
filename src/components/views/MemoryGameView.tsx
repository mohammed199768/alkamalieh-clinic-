"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import KidsRewardFlow from "@/components/KidsRewardFlow";
import data from "@/data/kidsGames.json";

type Card = { key: string; emoji: string; id: string };

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export default function MemoryGameView() {
  const { t } = useLang();
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const reset = () => {
    const deck = data.memory.pairs.flatMap((p) => [
      { key: `${p.id}-a`, emoji: p.emoji, id: p.id },
      { key: `${p.id}-b`, emoji: p.emoji, id: p.id },
    ]);
    setCards(shuffle(deck)); setFlipped([]); setMatched([]); setMoves(0); setWon(false);
  };
  useEffect(() => { reset(); }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      setMoves((m) => m + 1);
      if (cards[a].id === cards[b].id) {
        setMatched((mm) => [...mm, cards[a].id]);
        setFlipped([]);
      } else {
        const tmo = setTimeout(() => setFlipped([]), 800);
        return () => clearTimeout(tmo);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length && matched.length === data.memory.pairs.length) {
      const tmo = setTimeout(() => setWon(true), 500);
      return () => clearTimeout(tmo);
    }
  }, [matched, cards.length]);

  const click = (i: number) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(cards[i].id)) return;
    setFlipped((f) => [...f, i]);
  };

  return (
    <>
      <PageHeader ar="لعبة الذاكرة" en="Memory Game" subAr="طابق كل بطاقتين متشابهتين." subEn="Match each pair of cards." emoji="🧠" playful />
      <div className="container-x py-10">
        {won ? (
          <KidsRewardFlow gameName={{ ar: "لعبة الذاكرة", en: "Memory Game" }} score={`${moves} ${t("حركة", "moves")}`} onReset={reset} />
        ) : (
          <div className="mx-auto max-w-md">
            <p className="mb-4 text-center text-sm font-semibold text-slate-500">{t("الحركات", "Moves")}: {moves}</p>
            <div className="grid grid-cols-4 gap-3">
              {cards.map((c, i) => {
                const show = flipped.includes(i) || matched.includes(c.id);
                return (
                  <button key={c.key} onClick={() => click(i)} className={`flex aspect-square items-center justify-center rounded-2xl text-3xl shadow-card transition-all duration-200 ${show ? "bg-white" : "bg-brand-600"}`}>
                    {show ? c.emoji : ""}
                  </button>
                );
              })}
            </div>
            <button onClick={reset} className="btn-ghost mx-auto mt-6 block">{t("ابدأ من جديد", "Restart")}</button>
          </div>
        )}
      </div>
    </>
  );
}
