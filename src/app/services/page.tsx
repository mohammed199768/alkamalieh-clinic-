import type { Metadata } from "next";
import ServicesView from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "الخدمات الطبية | Medical Services",
  description: "خدمات مركز الكمالية الطبي: طوارئ، طب عام، متابعة مزمنة، زيارات منزلية، فحوصات وجلسات حديد وريدي.",
  alternates: { canonical: "/services" },
  openGraph: { title: "الخدمات الطبية | Medical Services", description: "خدمات مركز الكمالية الطبي: طوارئ، طب عام، متابعة مزمنة، زيارات منزلية، فحوصات وجلسات حديد وريدي.", url: "/services" },
};

export default function Page() {
  return <ServicesView />;
}
