import type { Metadata } from "next";
import MedicalMinuteView from "@/components/views/MedicalMinuteView";

const DESCRIPTION =
  "محتوى صحي تثقيفي سريع من مركز الكمالية الطبي مع جولة فيديو قصيرة داخل المركز. Quick educational health content and a short clinic tour video from KAMALIA Medical Center.";

export const metadata: Metadata = {
  title: "صحتك في دقيقة | Medical Minute",
  description: DESCRIPTION,
  alternates: { canonical: "/medical-minute" },
  openGraph: { title: "صحتك في دقيقة | Medical Minute", description: DESCRIPTION, url: "/medical-minute" },
};

export default function Page() {
  return <MedicalMinuteView />;
}
