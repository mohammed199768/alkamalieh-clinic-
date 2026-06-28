"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import VideoCard from "@/components/VideoCard";
import data from "@/data/videos.json";

export default function VideosView() {
  const { lang, t } = useLang();
  const [tab, setTab] = useState(data.tabs[0].id);
  const featured = data.videos.find((v) => v.featured) ?? data.videos[0];
  const list = useMemo(() => data.videos.filter((v) => v.category === tab), [tab]);
  return (
    <>
      <PageHeader ar="شاهد معنا" en="Watch With Us" subAr="فيديوهات من داخل المركز ونصائح طبية وقصص قصيرة." subEn="Videos from inside the center, medical tips and short stories." icon="video" />
      <SectionShell>
        <div className="mb-8"><VideoCard video={featured} featured /></div>
        <div className="mb-6 flex flex-wrap gap-2">
          {data.tabs.map((c) => (
            <button key={c.id} onClick={() => setTab(c.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === c.id ? "bg-brand-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>
              {lang === "ar" ? c.label.ar : c.label.en}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
        {list.length === 0 && <p className="py-10 text-center text-slate-400">{t("لا فيديوهات في هذا القسم بعد", "No videos in this section yet")}</p>}
      </SectionShell>
    </>
  );
}
