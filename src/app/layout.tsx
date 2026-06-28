import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import HereAssistantWidget from "@/components/HereAssistantWidget";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, CLINIC } from "@/lib/clinic";

export const viewport: Viewport = {
  themeColor: "#1c61d4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CLINIC.name.ar} | ${CLINIC.name.en}`,
    template: `%s | ${CLINIC.name.ar}`,
  },
  description:
    "مركز الكمالية الطبي في عمّان: طوارئ 24 ساعة، طب عام، متابعة الأمراض المزمنة، زيارات منزلية، فحوصات مخبرية، وجلسات الحديد الوريدي. Al Kamalia Medical Center, Amman.",
  keywords: [
    "مركز الكمالية الطبي",
    "طوارئ عمان",
    "زيارات منزلية عمان",
    "Al Kamalia Medical Center",
    "Amman clinic",
    "home visits Amman",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_JO",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: CLINIC.name.ar,
    title: `${CLINIC.name.ar} | ${CLINIC.name.en}`,
    description: CLINIC.tagline.ar,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLINIC.name.ar} | ${CLINIC.name.en}`,
    description: CLINIC.tagline.ar,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <JsonLd />
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
          >
            تخطَّ إلى المحتوى / Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <WhatsAppFloatingButton />
          <HereAssistantWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
