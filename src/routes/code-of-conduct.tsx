import { createFileRoute } from "@tanstack/react-router";
import { ConductPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/code-of-conduct")({
  head: () =>
    pageHead(
      "Code of Conduct",
      "The official TEDxFUTMinna 2026 community policy will be announced here.",
      "/code-of-conduct",
    ),
  component: ConductPage,
});
