import type { Metadata } from "next";
import DailyStoriesView from "@/components/views/DailyStoriesView";

export const metadata: Metadata = {
  title: "قصص من يومنا | Daily Stories",
  description: "قصص إنسانية من يوميات مركز الكمالية الطبي تعكس رعايتنا واهتمامنا بكل مريض.",
  alternates: { canonical: "/daily-stories" },
  openGraph: { title: "قصص من يومنا | Daily Stories", description: "قصص إنسانية من يوميات مركز الكمالية الطبي تعكس رعايتنا واهتمامنا بكل مريض.", url: "/daily-stories" },
};

export default function Page() {
  return <DailyStoriesView />;
}
