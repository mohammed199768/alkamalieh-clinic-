"use client";
import { useLang } from "@/lib/i18n";
import Icon from "./Icon";

export default function TrustBar() {
  const { lang } = useLang();
  const items = [
    { ar: "خدمة طوارئ 24 ساعة", en: "24/7 emergency", icon: "clock" },
    { ar: "فريق يسمعك ويهتم", en: "A team that listens", icon: "heart-pulse" },
    { ar: "زيارات منزلية", en: "Home visits", icon: "home" },
    { ar: "معتمدون لدى التأمين", en: "Insurance accepted", icon: "shield" },
  ];
  return (
    <div className="border-y border-white/60 bg-white/60 backdrop-blur">
      <div className="container-x grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name={it.icon} className="h-5 w-5" />
            </span>
            {lang === "ar" ? it.ar : it.en}
          </div>
        ))}
      </div>
    </div>
  );
}
