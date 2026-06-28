"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { whatsappHref } from "@/lib/clinic";
import Icon from "@/components/Icon";

export default function EmergencyView() {
  const { t } = useLang();
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon name="clock" className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-ink sm:text-4xl">{t("رعاية داخل العيادة 24 ساعة", "24-hour in-clinic care")}</h1>
      <p className="mt-3 max-w-md text-slate-600">
        {t(
          "نستقبل الحالات العاجلة داخل المركز على مدار 24 ساعة ونوجهك للخطوة المناسبة عند الوصول.",
          "We receive urgent cases inside the clinic 24 hours a day and guide you to the right next step when you arrive."
        )}
      </p>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Link href="/contact" className="btn-primary flex-1 px-8 py-4">
          <Icon name="headset" className="h-5 w-5" /> {t("معلومات التواصل", "Contact information")}
        </Link>
        <a
          href={whatsappHref("مرحباً، أريد التواصل مع مركز الكمالية الطبي.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 px-8 py-4"
        >
          <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
        </a>
      </div>

      <p className="mt-8 max-w-md rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-700">
        {t("في الحالات الخطيرة أو المهددة للحياة، اتصل بخدمات الطوارئ المحلية فوراً.", "For severe or life-threatening cases, call your local emergency services immediately.")}
      </p>
    </div>
  );
}
