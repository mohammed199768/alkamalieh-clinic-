import clinic from "@/data/clinic.json";

export const CLINIC = clinic;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alkamalia-medical.com";

export const FORMSPREE = {
  booking:
    process.env.NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT ||
    "https://formspree.io/f/mnjkvkwq",
  contact:
    process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT ||
    "https://formspree.io/f/xbdvyvwr",
  // Emergency flows stay direct call / WhatsApp only; this legacy env key is intentionally unused.
  emergency:
    process.env.NEXT_PUBLIC_FORMSPREE_EMERGENCY_ENDPOINT ||
    "https://formspree.io/f/your_emergency_id",
  kids:
    process.env.NEXT_PUBLIC_FORMSPREE_KIDS_ENDPOINT ||
    "https://formspree.io/f/mrewkwrn",
};

export const telHref = `tel:${CLINIC.phone}`;

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${CLINIC.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };
