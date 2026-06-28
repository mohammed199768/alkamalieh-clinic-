import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "تواصل معنا | Contact Us",
  description: "تواصل مع مركز الكمالية الطبي: هاتف، واتساب، بريد، وموقع على الخريطة في عمّان.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "تواصل معنا | Contact Us", description: "تواصل مع مركز الكمالية الطبي: هاتف، واتساب، بريد، وموقع على الخريطة في عمّان.", url: "/contact" },
};

export default function Page() {
  return <ContactView />;
}
