"use client";
import { useLang } from "@/lib/i18n";
import { telHref, CLINIC } from "@/lib/clinic";
import Icon from "./Icon";

export default function EmergencyCTA({
  variant = "button",
  className = "",
}: {
  variant?: "button" | "banner";
  className?: string;
}) {
  const { t } = useLang();
  if (variant === "banner") {
    return (
      <div className={`card-emergency relative overflow-hidden p-1 ${className}`}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-center gap-5 px-6 py-6 sm:flex-row sm:justify-between sm:px-8">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <Icon name="ambulance" className="h-6 w-6 animate-pulseSoft" />
            </span>
            <div>
              <p className="text-lg font-extrabold">{t("طوارئ على مدار 24 ساعة", "Emergency care, 24/7")}</p>
              <p className="text-sm text-white/80">{t("فريقنا جاهز لاستقبالك في أي وقت — اتصل الآن.", "Our team is ready any time — call now.")}</p>
            </div>
          </div>
          <a href={telHref} className="btn bg-white px-6 py-3 text-rose-700 hover:bg-rose-50">
            <Icon name="phone" className="h-4 w-4" /> {CLINIC.phone}
          </a>
        </div>
      </div>
    );
  }
  return (
    <a href={telHref} className={`btn-emergency ${className}`}>
      <Icon name="ambulance" className="h-4 w-4" />
      {t("طوارئ 24 ساعة", "24/7 Emergency")}
    </a>
  );
}
