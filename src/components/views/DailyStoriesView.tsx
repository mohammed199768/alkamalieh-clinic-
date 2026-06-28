"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { whatsappHref } from "@/lib/clinic";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Image from "next/image";
import { MEDIA } from "@/data/media";
import stories from "@/data/dailyStories.json";

export default function DailyStoriesView() {
  const { lang, t } = useLang();
  const L = (b: { ar: string; en: string }) => (lang === "ar" ? b.ar : b.en);
  const imgs = [MEDIA.consultation, MEDIA.familyCare, MEDIA.childCare, MEDIA.seniorHome, MEDIA.labTesting, MEDIA.consultationRemote, MEDIA.consultation, MEDIA.familyCare];
  const storyIcon = (ct: string) => (ct === "contact" ? "headset" : "heart-pulse");
  const cta = (s: typeof stories[number]) => {
    if (s.ctaType === "contact") return { href: whatsappHref(L(s.title)), cls: "btn-whatsapp", icon: "whatsapp", ext: true };
    return { href: "/booking", cls: "btn-primary", icon: "arrow", ext: false };
  };
  return (
    <>
      <PageHeader ar="قصص من يومنا" en="Stories from Our Day" subAr="لأن خلف كل حالة إنساناً يستحق أن يُسمع." subEn="Because behind every case is a human who deserves to be heard." icon="heart-pulse" />
      <SectionShell>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => {
            const c = cta(s);
            return (
              <Reveal key={s.id} delay={(i % 3) as 0 | 1 | 2}>
                <article className="group card-elevated flex h-full flex-col overflow-hidden">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image src={imgs[i % imgs.length]} alt={L(s.title)} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
                    <span className="absolute bottom-3 ltr:left-3 rtl:right-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-navy-700 backdrop-blur">
                      <Icon name={storyIcon(s.ctaType)} className="h-3.5 w-3.5 text-brand-600" /> {L(s.hook)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-h3 font-bold text-navy-900">{L(s.title)}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{L(s.body)}</p>
                    {c.ext ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${c.cls} mt-5 text-sm`}>
                        <Icon name={c.icon} className="h-4 w-4" /> {L(s.ctaLabel)}
                      </a>
                    ) : (
                      <Link href={c.href} className={`${c.cls} mt-5 text-sm`}>{L(s.ctaLabel)} <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" /></Link>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </SectionShell>
    </>
  );
}
