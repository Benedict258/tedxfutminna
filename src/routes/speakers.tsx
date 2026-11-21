import { createFileRoute } from "@tanstack/react-router";
import { SpeakersPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/speakers")({
  head: () =>
    pageHead(
      "Speakers",
      "Eight speakers from seven fields. The voices of TEDxFUTMinna 2026 will be revealed soon.",
      "/speakers",
    ),
  component: SpeakersPage,
});
