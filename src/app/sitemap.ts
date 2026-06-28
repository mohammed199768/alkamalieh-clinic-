import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";
import stories from "@/data/bedtimeStories.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/services", "/booking", "/emergency", "/medical-tips",
    "/medical-minute", "/daily-stories", "/videos", "/kids",
    "/kids/memory-game", "/kids/healthy-quiz", "/kids/habit-sort",
    "/bedtime-stories", "/contact", "/faq", "/privacy",
  ];
  const now = new Date();
  const base = routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const storyRoutes = stories.map((s) => ({
    url: `${SITE_URL}/bedtime-stories/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...base, ...storyRoutes];
}
