"use client";
import { useLang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import DisclaimerNote from "@/components/DisclaimerNote";
import services from "@/data/services.json";

export default function ServicesView() {
  const { t } = useLang();
  return (
    <>
      <PageHeader ar="خدماتنا الطبية" en="Our Medical Services" subAr="رعاية تجمع بين الدفء والاحترافية في كل تخصص." subEn="Care that blends warmth and professionalism across every service." icon="stethoscope" />
      <SectionShell>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} full />)}
        </div>
        <div className="mt-8"><DisclaimerNote /></div>
      </SectionShell>
    </>
  );
}
