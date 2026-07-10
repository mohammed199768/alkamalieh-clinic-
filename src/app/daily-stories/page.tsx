import type { Metadata } from "next";
import DailyStoriesView from "@/components/views/DailyStoriesView";

const DESCRIPTION =
  "قصص إنسانية وتوعوية مستوحاة من تفاصيل الحياة اليومية من مركز الكمالية الطبي — لأغراض تثقيفية عامة. Educational everyday-care stories from KAMALIA Medical Center.";

export const metadata: Metadata = {
  title: "قصص من تفاصيل يومنا | Daily Stories",
  description: DESCRIPTION,
  alternates: { canonical: "/daily-stories" },
  openGraph: { title: "قصص من تفاصيل يومنا | Daily Stories", description: DESCRIPTION, url: "/daily-stories" },
};

export default function Page() {
  return <DailyStoriesView />;
}
