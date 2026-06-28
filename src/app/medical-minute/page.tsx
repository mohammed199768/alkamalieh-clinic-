import type { Metadata } from "next";
import MedicalMinuteView from "@/components/views/MedicalMinuteView";

export const metadata: Metadata = {
  title: "صحتك في دقيقة | Medical Minute",
  description: "معلومات صحية سريعة بأسلوب ممتع من مركز الكمالية الطبي.",
  alternates: { canonical: "/medical-minute" },
  openGraph: { title: "صحتك في دقيقة | Medical Minute", description: "معلومات صحية سريعة بأسلوب ممتع من مركز الكمالية الطبي.", url: "/medical-minute" },
};

export default function Page() {
  return <MedicalMinuteView />;
}
