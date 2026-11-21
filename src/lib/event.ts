export const siteUrl = "https://tedxfutminna.com";

export const event = {
  name: "TEDxFUTMinna 2026",
  date: "Saturday, 12 December 2026",
  theme: "Reimagining Tomorrow, Shape It Today",
  ticketUrl: import.meta.env["VITE_TICKET_URL"] ?? "https://selar.com/z992991r2q",
  capacity: 100,
  earlyPrice: 5000,
  regularPrice: 7500,
  // Date boundaries in Nigeria; midnight is a countdown reference, not an advertised start time.
  eventBoundary: Date.parse("2026-12-12T00:00:00+01:00"),
  earlyBirdEnd: Date.parse("2026-12-03T00:00:00+01:00"),
};
export function ticketPrice(now: number) {
  return now < event.earlyBirdEnd ? event.earlyPrice : event.regularPrice;
}
export function remainingTime(now: number, target = event.eventBoundary) {
  const seconds = Math.max(0, Math.floor((target - now) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
}
export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Speakers", to: "/speakers" },
  { label: "Schedule", to: "/schedule" },
  { label: "Tickets", to: "/tickets" },
  { label: "Sponsors", to: "/sponsors" },
  { label: "Team", to: "/team" },
  { label: "Past Events", to: "/past-events" },
  { label: "Gallery", to: "/gallery" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;
export const ogImage = `${siteUrl}/og-image.png`;
export function pageHead(title: string, description: string, path: string) {
  const fullTitle = `TEDxFUTMinna 2026 | ${title}`;
  const url = `${siteUrl}${path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TEDxFUTMinna 2026" },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@TEDxFUTMinna" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
