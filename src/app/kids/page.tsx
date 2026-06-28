import type { Metadata } from "next";
import KidsView from "@/components/views/KidsView";

export const metadata: Metadata = {
  title: "صغيرنا الذكي | Smart Little One",
  description: "ركن مرح وآمن للأطفال: ألعاب تعليمية صحية وحكايات مساء من مركز الكمالية الطبي.",
  alternates: { canonical: "/kids" },
  openGraph: { title: "صغيرنا الذكي | Smart Little One", description: "ركن مرح وآمن للأطفال: ألعاب تعليمية صحية وحكايات مساء من مركز الكمالية الطبي.", url: "/kids" },
};

export default function Page() {
  return <KidsView />;
}
