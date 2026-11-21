import { createFileRoute } from "@tanstack/react-router";
import { SchedulePage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/schedule")({
  head: () =>
    pageHead(
      "Schedule",
      "Saturday, 12 December 2026. The full TEDxFUTMinna 2026 programme is to be announced.",
      "/schedule",
    ),
  component: SchedulePage,
});
