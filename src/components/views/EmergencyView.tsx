"use client";
import { useLang } from "@/lib/i18n";
import { telHref, whatsappHref, CLINIC } from "@/lib/clinic";
import Icon from "@/components/Icon";

export default function EmergencyView() {
  const { t } = useLang();
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <Icon name="siren" className="h-10 w-10 animate-pulseSoft" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-ink sm:text-4xl">{t("طوارئ 24 ساعة", "24/7 Emergency")}</h1>
      <p className="mt-3 max-w-md text-slate-600">{t("نحن جاهزون لاستقبالك في أي وقت. اضغط للاتصال المباشر بالمركز.", "We're ready any time. Tap to call the center directly.")}</p>

      <a href={telHref} className="btn-emergency mt-8 w-full max-w-md px-8 py-5 text-lg">
        <Icon name="phone" className="h-6 w-6" /> {t("اتصل الآن", "Call Now")} — {CLINIC.phone}
      </a>
      <a href={whatsappHref("لدي حالة عاجلة وأحتاج المساعدة.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full max-w-md px-8 py-4">
        <Icon name="whatsapp" className="h-5 w-5" /> {t("تواصل عبر واتساب", "Contact via WhatsApp")}
      </a>

      <p className="mt-8 max-w-md rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-700">
        {t("في الحالات الخطيرة أو المهددة للحياة، اتصل بخدمات الطوارئ المحلية فوراً.", "For severe or life-threatening cases, call your local emergency services immediately.")}
      </p>
    </div>
  );
}
