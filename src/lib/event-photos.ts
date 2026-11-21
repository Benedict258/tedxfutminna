import photo0_480 from "@/assets/event-photos/stage-and-audience-480.webp";
import photo0_960 from "@/assets/event-photos/stage-and-audience-960.webp";
import photo0_1920 from "@/assets/event-photos/stage-and-audience-1920.webp";
import photo1_480 from "@/assets/event-photos/speaker-with-event-screen-480.webp";
import photo1_960 from "@/assets/event-photos/speaker-with-event-screen-960.webp";
import photo1_1920 from "@/assets/event-photos/speaker-with-event-screen-1920.webp";
import photo2_480 from "@/assets/event-photos/community-pair-480.webp";
import photo2_960 from "@/assets/event-photos/community-pair-960.webp";
import photo2_1920 from "@/assets/event-photos/community-pair-1920.webp";
import photo3_480 from "@/assets/event-photos/audience-candid-480.webp";
import photo3_960 from "@/assets/event-photos/audience-candid-960.webp";
import photo3_1920 from "@/assets/event-photos/audience-candid-1920.webp";
import photo4_480 from "@/assets/event-photos/speaker-at-microphone-480.webp";
import photo4_960 from "@/assets/event-photos/speaker-at-microphone-960.webp";
import photo4_1920 from "@/assets/event-photos/speaker-at-microphone-1920.webp";
import photo5_480 from "@/assets/event-photos/speaker-on-red-carpet-480.webp";
import photo5_960 from "@/assets/event-photos/speaker-on-red-carpet-960.webp";
import photo5_1920 from "@/assets/event-photos/speaker-on-red-carpet-1920.webp";
import photo6_480 from "@/assets/event-photos/speakers-group-480.webp";
import photo6_960 from "@/assets/event-photos/speakers-group-960.webp";
import photo6_1920 from "@/assets/event-photos/speakers-group-1920.webp";
import photo7_480 from "@/assets/event-photos/community-group-480.webp";
import photo7_960 from "@/assets/event-photos/community-group-960.webp";
import photo7_1920 from "@/assets/event-photos/community-group-1920.webp";
import photo8_480 from "@/assets/event-photos/live-painting-480.webp";
import photo8_960 from "@/assets/event-photos/live-painting-960.webp";
import photo8_1920 from "@/assets/event-photos/live-painting-1920.webp";
import photo9_480 from "@/assets/event-photos/certificate-presentation-480.webp";
import photo9_960 from "@/assets/event-photos/certificate-presentation-960.webp";
import photo9_1920 from "@/assets/event-photos/certificate-presentation-1920.webp";
import photo10_480 from "@/assets/event-photos/audience-conversation-480.webp";
import photo10_960 from "@/assets/event-photos/audience-conversation-960.webp";
import photo10_1920 from "@/assets/event-photos/audience-conversation-1920.webp";
import photo11_480 from "@/assets/event-photos/wide-stage-and-audience-480.webp";
import photo11_960 from "@/assets/event-photos/wide-stage-and-audience-960.webp";
import photo11_1920 from "@/assets/event-photos/wide-stage-and-audience-1920.webp";
import photo12_480 from "@/assets/event-photos/group-with-red-x-480.webp";
import photo12_960 from "@/assets/event-photos/group-with-red-x-960.webp";
import photo12_1920 from "@/assets/event-photos/group-with-red-x-1920.webp";

export const eventPhotos = [
  {
    id: "stage-and-audience",
    caption: "Stage and audience",
    galleryOnly: false,
    small: photo0_480,
    medium: photo0_960,
    large: photo0_1920,
  },
  {
    id: "speaker-with-event-screen",
    caption: "Speaker with event screen",
    galleryOnly: false,
    small: photo1_480,
    medium: photo1_960,
    large: photo1_1920,
  },
  {
    id: "community-pair",
    caption: "Community pair",
    galleryOnly: false,
    small: photo2_480,
    medium: photo2_960,
    large: photo2_1920,
  },
  {
    id: "audience-candid",
    caption: "Audience candid",
    galleryOnly: false,
    small: photo3_480,
    medium: photo3_960,
    large: photo3_1920,
  },
  {
    id: "speaker-at-microphone",
    caption: "Speaker at microphone",
    galleryOnly: false,
    small: photo4_480,
    medium: photo4_960,
    large: photo4_1920,
  },
  {
    id: "speaker-on-red-carpet",
    caption: "Speaker on red carpet",
    galleryOnly: false,
    small: photo5_480,
    medium: photo5_960,
    large: photo5_1920,
  },
  {
    id: "speakers-group",
    caption: "Speakers group",
    galleryOnly: true,
    small: photo6_480,
    medium: photo6_960,
    large: photo6_1920,
  },
  {
    id: "community-group",
    caption: "Community group",
    galleryOnly: true,
    small: photo7_480,
    medium: photo7_960,
    large: photo7_1920,
  },
  {
    id: "live-painting",
    caption: "Live painting",
    galleryOnly: false,
    small: photo8_480,
    medium: photo8_960,
    large: photo8_1920,
  },
  {
    id: "certificate-presentation",
    caption: "Certificate presentation",
    galleryOnly: false,
    small: photo9_480,
    medium: photo9_960,
    large: photo9_1920,
  },
  {
    id: "audience-conversation",
    caption: "Audience conversation",
    galleryOnly: false,
    small: photo10_480,
    medium: photo10_960,
    large: photo10_1920,
  },
  {
    id: "wide-stage-and-audience",
    caption: "Wide stage and audience",
    galleryOnly: false,
    small: photo11_480,
    medium: photo11_960,
    large: photo11_1920,
  },
  {
    id: "group-with-red-x",
    caption: "Group with red X",
    galleryOnly: true,
    small: photo12_480,
    medium: photo12_960,
    large: photo12_1920,
  },
];
export type EventPhoto = (typeof eventPhotos)[number];
export function photosForPlacement(placement: "home" | "past" | "gallery") {
  const photos =
    placement === "gallery" ? eventPhotos : eventPhotos.filter((photo) => !photo.galleryOnly);
  if (placement !== "home") return photos;
  const ids = [
    "speaker-on-red-carpet",
    "audience-conversation",
    "live-painting",
    "speaker-with-event-screen",
  ];
  return ids.flatMap((id) => photos.filter((photo) => photo.id === id));
}
