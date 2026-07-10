/**
 * Centralized, typed source of truth for the real Al Kamalia Medical Center
 * photography and video. Every component that shows clinic imagery imports from
 * here — no image path is hardcoded anywhere else.
 *
 * Assets live under /public/clinic-media (photos, video, frames, manifest) and
 * were migrated from the local reference capture. Descriptions are neutral and
 * accurate; no space is over-claimed (e.g. photo_07 is documented only as an
 * equipped treatment room, never a dedicated dental room).
 */

export type LocalizedText = { ar: string; en: string };

export type ClinicPhotoId =
  | "photo_01"
  | "photo_02"
  | "photo_03"
  | "photo_04"
  | "photo_05"
  | "photo_06"
  | "photo_07";

export type ClinicVideoId = "video_01";
export type ClinicMediaId = ClinicPhotoId | ClinicVideoId;

/** Semantic space each photo depicts, used to pick imagery by meaning. */
export type ClinicSpace =
  | "reception"
  | "corridor"
  | "treatment"
  | "observation"
  | "room";

export interface ClinicPhoto {
  id: ClinicPhotoId;
  type: "photo";
  src: string;
  width: number;
  height: number;
  space: ClinicSpace;
  alt: LocalizedText;
  title: LocalizedText;
}

export interface ClinicVideo {
  id: ClinicVideoId;
  type: "video";
  src: string;
  poster: string;
  width: number;
  height: number;
  alt: LocalizedText;
  title: LocalizedText;
}

const PHOTO_BASE = "/clinic-media/photos";

export const CLINIC_PHOTOS: Record<ClinicPhotoId, ClinicPhoto> = {
  photo_01: {
    id: "photo_01",
    type: "photo",
    src: `${PHOTO_BASE}/photo_01.webp`,
    width: 1314,
    height: 1600,
    space: "reception",
    alt: {
      ar: "قاعة الاستقبال وصالة الانتظار في مركز الكمالية الطبي",
      en: "Reception and waiting hall at KAMALIA Medical Center",
    },
    title: { ar: "الاستقبال والانتظار", en: "Reception & waiting" },
  },
  photo_02: {
    id: "photo_02",
    type: "photo",
    src: `${PHOTO_BASE}/photo_02.webp`,
    width: 1219,
    height: 1600,
    space: "reception",
    alt: {
      ar: "منطقة استقبال وانتظار مريحة داخل مركز الكمالية الطبي",
      en: "A comfortable reception and waiting lounge inside KAMALIA Medical Center",
    },
    title: { ar: "منطقة الانتظار", en: "Waiting lounge" },
  },
  photo_03: {
    id: "photo_03",
    type: "photo",
    src: `${PHOTO_BASE}/photo_03.webp`,
    width: 1200,
    height: 1600,
    space: "reception",
    alt: {
      ar: "قاعة استقبال مضيئة وواسعة في مركز الكمالية الطبي",
      en: "A bright, spacious reception hall at KAMALIA Medical Center",
    },
    title: { ar: "قاعة الاستقبال", en: "Reception hall" },
  },
  photo_04: {
    id: "photo_04",
    type: "photo",
    src: `${PHOTO_BASE}/photo_04.webp`,
    width: 1200,
    height: 1600,
    space: "corridor",
    alt: {
      ar: "ممر يؤدي إلى مناطق العلاج داخل مركز الكمالية الطبي",
      en: "A corridor leading to the treatment areas at KAMALIA Medical Center",
    },
    title: { ar: "الممر ومناطق العلاج", en: "Corridor & care areas" },
  },
  photo_05: {
    id: "photo_05",
    type: "photo",
    src: `${PHOTO_BASE}/photo_05.webp`,
    width: 1200,
    height: 1600,
    space: "treatment",
    alt: {
      ar: "أجنحة علاج خاصة بستائر زرقاء في مركز الكمالية الطبي",
      en: "Private treatment bays with blue curtains at KAMALIA Medical Center",
    },
    title: { ar: "أجنحة العلاج", en: "Treatment bays" },
  },
  photo_06: {
    id: "photo_06",
    type: "photo",
    src: `${PHOTO_BASE}/photo_06.webp`,
    width: 1200,
    height: 1600,
    space: "observation",
    alt: {
      ar: "أسرّة ملاحظة بأغطية زرقاء نظيفة في مركز الكمالية الطبي",
      en: "Observation beds with clean blue covers at KAMALIA Medical Center",
    },
    title: { ar: "أسرّة الملاحظة", en: "Observation beds" },
  },
  photo_07: {
    id: "photo_07",
    type: "photo",
    src: `${PHOTO_BASE}/photo_07.webp`,
    width: 1200,
    height: 1600,
    space: "room",
    alt: {
      ar: "غرفة علاج مجهزة داخل مركز الكمالية الطبي",
      en: "An equipped treatment room inside KAMALIA Medical Center",
    },
    title: { ar: "غرفة علاج مجهزة", en: "Equipped treatment room" },
  },
};

export const CLINIC_VIDEO: ClinicVideo = {
  id: "video_01",
  type: "video",
  src: "/clinic-media/video/video_01.mp4",
  poster: CLINIC_PHOTOS.photo_03.src,
  width: 720,
  height: 1280,
  alt: {
    ar: "جولة قصيرة داخل مركز الكمالية الطبي",
    en: "A short tour inside KAMALIA Medical Center",
  },
  title: {
    ar: "جولة قصيرة داخل المركز",
    en: "A Short Tour Inside the Center",
  },
};

/** Ordered list of every photo, handy for galleries. */
export const CLINIC_PHOTO_LIST: ClinicPhoto[] = [
  CLINIC_PHOTOS.photo_01,
  CLINIC_PHOTOS.photo_02,
  CLINIC_PHOTOS.photo_03,
  CLINIC_PHOTOS.photo_04,
  CLINIC_PHOTOS.photo_05,
  CLINIC_PHOTOS.photo_06,
  CLINIC_PHOTOS.photo_07,
];

export function clinicPhoto(id: ClinicPhotoId): ClinicPhoto {
  return CLINIC_PHOTOS[id];
}
