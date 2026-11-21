import { createFileRoute } from "@tanstack/react-router";
import { SponsorsPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/sponsors")({
  head: () =>
    pageHead(
      "Partners & Sponsors",
      "Partner with TEDxFUTMinna 2026. Confirmed sponsors will be announced here.",
      "/sponsors",
    ),
  component: SponsorsPage,
});
