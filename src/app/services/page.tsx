import type { Metadata } from "next";
import ServicesView from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "الخدمات الطبية | Medical Services",
  description: "Medical services at Al Kamalia Medical Center: general medicine, chronic follow-up, home visits, lab tests, and IV iron sessions.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Medical Services", description: "Medical services at Al Kamalia Medical Center: general medicine, chronic follow-up, home visits, lab tests, and IV iron sessions.", url: "/services" },
};

export default function Page() {
  return <ServicesView />;
}
