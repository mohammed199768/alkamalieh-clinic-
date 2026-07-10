import type { Metadata } from "next";
import VideosView from "@/components/views/VideosView";

const DESCRIPTION =
  "جولة فيديو قصيرة داخل مركز الكمالية الطبي ومعرض صور لمساحاته الحقيقية. A short clinic tour video and a photo gallery of KAMALIA Medical Center's real spaces.";

export const metadata: Metadata = {
  title: "شاهد معنا | Watch With Us",
  description: DESCRIPTION,
  alternates: { canonical: "/videos" },
  openGraph: { title: "شاهد معنا | Watch With Us", description: DESCRIPTION, url: "/videos" },
};

export default function Page() {
  return <VideosView />;
}
