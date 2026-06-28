/**
 * Homepage media — TEMPORARY Unsplash placeholders.
 * Replace each URL with real Al Kamalia Medical Center photography before launch.
 * Every homepage section imports from here; no image URL is hardcoded in components.
 */
const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HOME_MEDIA = {
  hero: u("1576091160550-2173dba999ef", 2000), // doctor consultation / care
  mosaic: u("1559839734-2b71ea197ec2", 2200), // patient care / family reassurance (shared for masked cards)
  reception: u("1519494026892-80bbd2d6fd0d", 2000), // clinic reception / location
  homeVisit: u("1584515933487-779824d29309"), // home / senior care
  lab: u("1581093588401-fbb62a02f120"), // lab / testing
  child: u("1632053001332-2268c0a4dd3c"), // child care
} as const;

export type HomeMedia = typeof HOME_MEDIA;
