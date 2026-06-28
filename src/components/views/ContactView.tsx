"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { CLINIC, telHref, whatsappHref, FORMSPREE } from "@/lib/clinic";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import GoogleMapBlock from "@/components/GoogleMapBlock";
import Icon from "@/components/Icon";

export default function ContactView() {
  const { lang, t } = useLang();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error("Contact submission failed");
      setSent(true);
    } catch {
      setError(t("تعذّر إرسال الرسالة. حاول مرة أخرى أو تواصل معنا عبر واتساب.", "Could not send the message. Please try again or contact us on WhatsApp."));
    } finally {
      setSending(false);
    }
  };
  const input = "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <>
      <PageHeader ar="تواصل معنا" en="Contact Us" subAr="نحن هنا للإجابة على أسئلتك ومساعدتك." subEn="We're here to answer your questions and help." icon="headset" />
      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="mb-4 font-bold text-ink">{t("معلومات التواصل", "Contact details")}</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3"><Icon name="phone" className="h-5 w-5 text-brand-500" /><a href={telHref}>{CLINIC.phone}</a></li>
                <li className="flex items-center gap-3"><Icon name="mail" className="h-5 w-5 text-brand-500" /><a className="break-all" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></li>
                <li className="flex items-start gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 text-brand-500" /><span>{lang === "ar" ? CLINIC.address.ar : CLINIC.address.en}</span></li>
                <li className="flex items-center gap-3"><Icon name="clock" className="h-5 w-5 text-brand-500" /><span>{t("رعاية داخل العيادة 24 ساعة", "24-hour in-clinic care")}</span></li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
                <a href={CLINIC.maps} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm"><Icon name="pin" className="h-4 w-4" /> {t("الاتجاهات", "Directions")}</a>
              </div>
            </div>
            <GoogleMapBlock />
          </div>

          <div className="card p-6">
            <h3 className="mb-4 font-bold text-ink">{t("أرسل رسالة", "Send a message")}</h3>
            {sent ? (
              <div className="rounded-2xl bg-mint-50 p-6 text-center text-mint-600">
                <Icon name="check" className="mx-auto h-8 w-8" />
                <p className="mt-2 font-semibold">{t("تم استلام رسالتك، سنعاود التواصل معك.", "Message received. We'll get back to you.")}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} placeholder={t("الاسم", "Name")} />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} placeholder={t("رقم الهاتف", "Phone")} inputMode="tel" />
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} min-h-32`} placeholder={t("رسالتك", "Your message")} />
                {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
                <button disabled={sending} className="btn-primary w-full">{sending ? t("جارٍ الإرسال…", "Sending…") : t("إرسال", "Send")}</button>
                <p className="text-xs text-slate-400">{t("لا ترسل تفاصيل طوارئ مهددة للحياة عبر النموذج — اتصل بخدمات الطوارئ المحلية فوراً.", "Do not send life-threatening emergency details via the form - call local emergency services immediately.")}</p>
              </form>
            )}
          </div>
        </div>
      </SectionShell>
    </>
  );
}
