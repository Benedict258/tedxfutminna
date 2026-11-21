import { createFileRoute } from "@tanstack/react-router";
import { PhotosPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/gallery")({
  head: () =>
    pageHead(
      "Gallery",
      "Explore real moments from past TEDxFUTMinna events: speakers, audience, live painting and community.",
      "/gallery",
    ),
  component: () => <PhotosPage gallery />,
});
