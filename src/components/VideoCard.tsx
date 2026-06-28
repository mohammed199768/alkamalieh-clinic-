"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { MEDIA } from "@/data/media";
import Icon from "./Icon";

type Bi = { ar: string; en: string };
type Video = { id: string; category: string; title: Bi; duration: string; poster: string; src?: string; embed?: string };

const CAT: Record<string, Bi> = {
  inside: { ar: "من داخل المركز", en: "Inside" },
  tips: { ar: "نصائح طبية", en: "Tips" },
  kids: { ar: "للأطفال", en: "Kids" },
  short: { ar: "قصص قصيرة", en: "Stories" },
};

export default function VideoCard({ video, featured = false }: { video: Video; featured?: boolean }) {
  const { lang, t } = useLang();
  const [play, setPlay] = useState(false);
  const L = (b: Bi) => (lang === "ar" ? b.ar : b.en);
  const hasMedia = Boolean(video.src || video.embed);
  const cat = CAT[video.category] ?? { ar: "", en: "" };
  const thumb = MEDIA.videoThumbs[video.category] ?? MEDIA.videoThumbs.inside;

  const Thumb = (
    <div className={`relative ${featured ? "sm:w-3/5" : ""} aspect-video w-full overflow-hidden bg-navy-950`}>
      <Image src={thumb} alt={L(video.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/10" />
      {play && video.src ? (
        <video src={video.src} controls autoPlay className="absolute inset-0 h-full w-full object-cover" />
      ) : play && video.embed ? (
        <iframe src={video.embed} title={L(video.title)} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media" allowFullScreen />
      ) : (
        <button onClick={() => hasMedia && setPlay(true)} className="group/btn absolute inset-0 flex items-center justify-center" aria-label={t("تشغيل", "Play")}>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-glow transition-transform duration-200 group-hover/btn:scale-110">
            <Icon name="play" className="h-6 w-6 ltr:translate-x-0.5 rtl:-translate-x-0.5" />
          </span>
        </button>
      )}
      <span className="absolute bottom-3 ltr:right-3 rtl:left-3 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">{video.duration}</span>
      <span className="absolute top-3 ltr:left-3 rtl:right-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{L(cat)}</span>
    </div>
  );

  return (
    <div className={`group card overflow-hidden ${featured ? "sm:flex sm:items-stretch" : ""}`}>
      {Thumb}
      <div className={`p-5 ${featured ? "sm:flex sm:w-2/5 sm:flex-col sm:justify-center sm:p-7" : ""}`}>
        {featured && <span className="eyebrow mb-3">{t("الفيديو المميّز", "Featured")}</span>}
        <h3 className={`font-bold text-navy-900 ${featured ? "text-h3" : ""}`}>{L(video.title)}</h3>
        {!hasMedia && <p className="mt-2 text-xs text-navy-400">{t("سيتوفّر الفيديو قريباً", "Video coming soon")}</p>}
      </div>
    </div>
  );
}
