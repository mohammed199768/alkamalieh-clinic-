import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import MedicalContentDock from "@/components/MedicalContentDock";
import HereAssistantWidget from "@/components/HereAssistantWidget";
import JsonLd from "@/components/JsonLd";
import PWAProvider from "@/components/pwa/PWAProvider";
import MobileAppDock from "@/components/navigation/MobileAppDock";
import { SITE_URL, CLINIC } from "@/lib/clinic";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ar",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

const englishFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-en",
  fallback: ["Arial", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#1c61d4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "KAMALIA",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "KAMALIA",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/pwa/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/pwa/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: `${CLINIC.name.ar} | ${CLINIC.name.en}`,
    template: `%s | ${CLINIC.name.ar}`,
  },
  description:
    "مركز الكمالية الطبي في عمّان: رعاية داخل العيادة 24 ساعة، طب عام، متابعة الأمراض المزمنة، زيارات منزلية، فحوصات مخبرية، وجلسات الحديد الوريدي. Al Kamalia Medical Center, Amman.",
  keywords: [
    "مركز الكمالية الطبي",
    "رعاية طبية 24 ساعة عمان",
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
      <body className={`${arabicFont.variable} ${englishFont.variable} antialiased`}>
        <JsonLd />
        <LanguageProvider>
          <PWAProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft"
          >
            تخطَّ إلى المحتوى / Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="pt-16 lg:pt-0">{children}</main>
          <SiteFooter />
          <WhatsAppFloatingButton />
          <MedicalContentDock />
          <HereAssistantWidget />
          <MobileAppDock />
          </PWAProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
