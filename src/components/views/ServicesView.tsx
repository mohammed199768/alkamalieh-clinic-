"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import DisclaimerNote from "@/components/DisclaimerNote";
import ClinicTour from "@/components/clinic-tour/ClinicTour";
import Icon from "@/components/Icon";
import { CLINIC_PHOTOS } from "@/data/clinicMedia";
import services from "@/data/services.json";

export default function ServicesView() {
  const { lang, t } = useLang();
  const L = (b: { ar: string; en: string }) => (lang === "ar" ? b.ar : b.en);
  const dentistry = services.find((s) => s.id === "dentistry");
  const gridServices = services.filter((s) => s.id !== "dentistry");
  const dentPhoto = CLINIC_PHOTOS.photo_07;

  return (
    <>
      <PageHeader
        ar="خدماتنا الطبية"
        en="Our Medical Services"
        subAr="رعاية تجمع بين الدفء والاحترافية في كل تخصص."
        subEn="Care that blends warmth and professionalism across every service."
        icon="stethoscope"
      />

      {/* Scroll-controlled clinic tour */}
      <ClinicTour />

      <SectionShell>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gridServices.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <ServiceCard service={s} full />
            </div>
          ))}
        </div>

        {/* Dentistry highlight */}
        {dentistry && (
          <div
            id="dentistry"
            className="mt-10 scroll-mt-24 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-card"
          >
            <div className="grid items-stretch md:grid-cols-2">
              <div className="relative min-h-[240px] md:min-h-full">
                <Image
                  src={dentPhoto.src}
                  alt={L(dentPhoto.alt)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <span className="icon-pad h-12 w-12">
                  <Icon name="smile" className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-h2 font-extrabold text-navy-900">{L(dentistry.title)}</h2>
                <p className="mt-3 text-navy-500">{L(dentistry.desc)}</p>
                <Link href="/booking" className="btn-primary mt-6 w-fit">
                  {t("احجز موعدك", "Book your visit")}
                  <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <DisclaimerNote />
        </div>
      </SectionShell>
    </>
  );
}
