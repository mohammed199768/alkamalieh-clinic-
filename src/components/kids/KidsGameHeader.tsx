"use client";
import { useLang } from "@/lib/i18n";
import KidsObject from "./KidsObject";
import type { ObjectId } from "@/data/kidsGameObjects";

/** Title block for a kids game, sitting on the night-sky shell. */
export default function KidsGameHeader({
  ar,
  en,
  subAr,
  subEn,
  object,
}: {
  ar: string;
  en: string;
  subAr?: string;
  subEn?: string;
  object?: ObjectId;
}) {
  const { lang } = useLang();
  return (
    <header className="mb-8 text-center">
      {object && (
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur">
          <KidsObject id={object} size={48} />
        </div>
      )}
      <h1 className="text-h1 font-extrabold text-white">{lang === "ar" ? ar : en}</h1>
      {(subAr || subEn) && (
        <p className="mx-auto mt-3 max-w-xl text-lead text-white/70">
          {lang === "ar" ? subAr : subEn}
        </p>
      )}
    </header>
  );
}
