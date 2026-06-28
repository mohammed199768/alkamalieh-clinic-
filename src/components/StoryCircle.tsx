"use client";
import { useLang } from "@/lib/i18n";

type Story = { id: string; title: { ar: string; en: string }; color: string };

export default function StoryCircle({ story, onClick }: { story: Story; onClick?: () => void }) {
  const { lang } = useLang();
  return (
    <button onClick={onClick} className="flex w-20 shrink-0 flex-col items-center gap-1.5">
      <span className="rounded-full bg-gradient-to-tr from-brand-400 to-mint-400 p-[3px]">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white" style={{ boxShadow: `inset 0 0 0 3px ${story.color}` }}>
          <span className="h-12 w-12 rounded-full" style={{ background: story.color }} />
        </span>
      </span>
      <span className="line-clamp-1 text-[11px] font-semibold text-slate-600">{lang === "ar" ? story.title.ar : story.title.en}</span>
    </button>
  );
}
