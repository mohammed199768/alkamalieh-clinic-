import type { Metadata } from "next";
import EmergencyView from "@/components/views/EmergencyView";

export const metadata: Metadata = {
  title: "طوارئ 24 ساعة | 24/7 Emergency",
  description: "خدمة طوارئ على مدار الساعة في مركز الكمالية الطبي بعمّان. اتصل الآن.",
  alternates: { canonical: "/emergency" },
  openGraph: { title: "طوارئ 24 ساعة | 24/7 Emergency", description: "خدمة طوارئ على مدار الساعة في مركز الكمالية الطبي بعمّان. اتصل الآن.", url: "/emergency" },
};

export default function Page() {
  return <EmergencyView />;
}
