import type { Metadata } from "next";
import ServicesView from "@/components/views/ServicesView";

const SERVICES_DESCRIPTION =
  "Medical services at KAMALIA Medical Center: general medicine, dentistry, chronic follow-up, home visits, lab tests and IV iron sessions — plus an interactive clinic tour of the center.";

export const metadata: Metadata = {
  title: "الخدمات الطبية وجولة داخل المركز | Medical Services",
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: "Medical Services", description: SERVICES_DESCRIPTION, url: "/services" },
};

export default function Page() {
  return <ServicesView />;
}
