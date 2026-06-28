import { CLINIC, SITE_URL } from "@/lib/clinic";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: CLINIC.name.en,
    alternateName: CLINIC.name.ar,
    url: SITE_URL,
    telephone: "+962796119707",
    email: CLINIC.email,
    image: `${SITE_URL}/og.png`,
    description:
      "Al Kamalia Medical Center: 24/7 emergency care, general medicine, chronic disease follow-up, home visits, lab tests and IV iron sessions in Amman.",
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.address.en,
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    availableService: [
      "Emergency care","General medicine","Chronic disease follow-up",
      "Home visits","Lab tests","IV iron sessions","Medical consultations",
    ],
    sameAs: [CLINIC.facebook].filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
