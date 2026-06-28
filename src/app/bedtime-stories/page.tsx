import type { Metadata } from "next";
import BedtimeListView from "@/components/views/BedtimeListView";

export const metadata: Metadata = {
  title: "حكايات المساء | Evening Stories",
  description: "حكايات مساء لطيفة تهدّئ الأطفال قبل النوم من مركز الكمالية الطبي.",
  alternates: { canonical: "/bedtime-stories" },
  openGraph: { title: "حكايات المساء | Evening Stories", description: "حكايات مساء لطيفة تهدّئ الأطفال قبل النوم من مركز الكمالية الطبي.", url: "/bedtime-stories" },
};

export default function Page() {
  return <BedtimeListView />;
}
