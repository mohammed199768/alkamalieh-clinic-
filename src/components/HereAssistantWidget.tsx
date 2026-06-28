"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { whatsappHref, telHref, CLINIC } from "@/lib/clinic";
import Icon from "./Icon";

type Bi = { ar: string; en: string };
type Scenario = { id: string; q: Bi; a: Bi; wa: string };

const SCENARIOS: Scenario[] = [
  { id: "book", q: { ar: "أريد حجز موعد", en: "I want to book an appointment" },
    a: { ar: "يسعدنا ذلك! يمكنك الحجز عبر نموذج الحجز في الموقع خطوة بخطوة، أو نكمل معك مباشرة عبر واتساب لتأكيد التفاصيل.",
         en: "Happy to help! You can book step by step using the website form, or we can continue on WhatsApp to confirm the details." },
    wa: "مرحباً، أرغب بحجز موعد في مركز الكمالية الطبي." },
  { id: "home", q: { ar: "أريد زيارة منزلية", en: "I want a home visit" },
    a: { ar: "نوفّر زيارات منزلية في مختلف مناطق عمّان. أخبرنا بالمنطقة والوقت المناسب ونكمل الترتيب عبر واتساب.",
         en: "We offer home visits across Amman. Tell us your area and preferred time and we'll arrange it on WhatsApp." },
    wa: "مرحباً، أرغب بزيارة منزلية. منطقتي هي:" },
  { id: "where", q: { ar: "أين موقعكم؟", en: "Where are you located?" },
    a: { ar: "نحن في الكمالية، باتجاه السلط، شارع الأميرة راية، أول مجمع على اليمين. يمكنك فتح الاتجاهات من صفحة التواصل.",
         en: "We are in Al Kamalia, toward Al Salt, Princess Raya Street, first complex on the right. You can open directions from the contact page." },
    wa: "مرحباً، أريد الاتجاهات إلى مركز الكمالية الطبي." },
  { id: "insurance", q: { ar: "هل تقبلون التأمين؟", en: "Do you accept insurance?" },
    a: { ar: "تواصل معنا باسم شركة التأمين وسنساعدك في التأكد من التغطية المتاحة.",
         en: "Send us your insurance provider name on WhatsApp and we'll help confirm available coverage." },
    wa: "مرحباً، هل تقبلون تأمين شركة:" },
  { id: "consult", q: { ar: "أريد استشارة طبية", en: "I want a medical consultation" },
    a: { ar: "يمكنك الحصول على استشارة طبية عامة عبر واتساب أو الهاتف. صف لنا حالتك بإيجاز ونوجّهك للخطوة المناسبة.",
         en: "You can get a general medical consultation via WhatsApp or phone. Briefly describe your situation and we'll guide your next step." },
    wa: "مرحباً، أرغب باستشارة طبية بخصوص:" },
];

type Msg = { from: "bot" | "user"; text: string; wa?: string };

export default function HereAssistantWidget() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [gateHidden, setGateHidden] = useState(pathname === "/");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const L = (b: Bi) => (lang === "ar" ? b.ar : b.en);

  useEffect(() => {
    if (pathname !== "/") { setGateHidden(false); return; }
    const compute = () => {
      const attr = document.documentElement.getAttribute("data-home-section");
      if (attr != null) setGateHidden(parseInt(attr, 10) < 1);
      else setGateHidden(window.scrollY < window.innerHeight * 0.6);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("home-section", compute as EventListener);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("home-section", compute as EventListener);
    };
  }, [pathname]);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ from: "bot", text: t("مرحباً، أنا \"نحن هنا\". كيف أساعدك اليوم؟", "Hi, I'm \"We are here\". How can I help today?") }]);
    }
  }, [open, msgs.length, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const choose = (s: Scenario) => {
    setMsgs((m) => [...m, { from: "user", text: L(s.q) }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: L(s.a), wa: s.wa }]);
    }, 1100);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`group fixed bottom-5 ltr:right-5 rtl:left-5 z-40 flex items-center gap-2 rounded-full bg-navy-900 px-3.5 py-2.5 text-white shadow-float ring-1 ring-white/15 transition-all duration-300 hover:bg-navy-800 ${gateHidden && !open ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"}`}
        aria-label={t("المساعد نحن هنا", "Assistant: We are here")}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20">
          <Icon name="headset" className="h-4 w-4 text-cyan-300" />
        </span>
        <span className="text-xs font-bold">{t("نحن هنا", "We are here")}</span>
      </button>

      {open && (
        <div className="fixed bottom-20 ltr:right-5 rtl:left-5 z-50 flex max-h-[70vh] w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-float animate-pop">
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Icon name="heart-pulse" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">{t("نحن هنا", "We are here")}</p>
                <p className="text-[11px] text-brand-100">{CLINIC.name[lang]}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t("إغلاق", "Close")} className="text-white/90">✕</button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-cloud px-3 py-3 no-scrollbar">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.from === "user" ? "bg-brand-600 text-white" : "bg-white text-slate-700 shadow-sm"}`}>
                  {m.text}
                  {m.wa && (
                    <a href={whatsappHref(m.wa)} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-[#1faf54] px-3 py-1.5 text-xs font-bold text-white">
                      <Icon name="whatsapp" className="h-3.5 w-3.5" /> {t("أكمل عبر واتساب", "Continue on WhatsApp")}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-slate-100 bg-white px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {SCENARIOS.map((s) => (
                <button key={s.id} onClick={() => choose(s)} className="rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 hover:bg-brand-100">
                  {L(s.q)}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-1.5">
              <a href={telHref} className="flex-1 rounded-xl bg-rose-50 px-3 py-1.5 text-center text-[11px] font-bold text-rose-700">{t("اتصال", "Call")}</a>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-xl bg-[#eafaf0] px-3 py-1.5 text-center text-[11px] font-bold text-[#1faf54]">WhatsApp</a>
            </div>
            <p className="mt-2 text-center text-[10px] leading-snug text-slate-400">
              {t("هذا المساعد للمعلومات العامة فقط ولا يغني عن مراجعة الطبيب.", "This assistant is for general information only and does not replace medical consultation.")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
