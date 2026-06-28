import type { Metadata } from "next";
import EmergencyView from "@/components/views/EmergencyView";

export const metadata: Metadata = {
  title: "رعاية داخل العيادة 24 ساعة | 24-hour in-clinic care",
  description: "معلومات عن استقبال الحالات العاجلة داخل المركز.",
  alternates: { canonical: "/emergency" },
  openGraph: { title: "رعاية داخل العيادة 24 ساعة | 24-hour in-clinic care", description: "معلومات عن استقبال الحالات العاجلة داخل المركز.", url: "/emergency" },
};

export default function Page() {
  return <EmergencyView />;
}
