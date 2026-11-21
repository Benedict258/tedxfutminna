import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "Frequently Asked Questions",
      "Confirmed answers about TEDxFUTMinna 2026 dates, tickets, venue and speakers.",
      "/faq",
    ),
  component: FaqPage,
});
