import type { Metadata } from "next";
import VideosView from "@/components/views/VideosView";

export const metadata: Metadata = {
  title: "شاهد معنا | Watch With Us",
  description: "فيديوهات من داخل مركز الكمالية الطبي ونصائح طبية وقصص قصيرة وفيديوهات للأطفال.",
  alternates: { canonical: "/videos" },
  openGraph: { title: "شاهد معنا | Watch With Us", description: "فيديوهات من داخل مركز الكمالية الطبي ونصائح طبية وقصص قصيرة وفيديوهات للأطفال.", url: "/videos" },
};

export default function Page() {
  return <VideosView />;
}
