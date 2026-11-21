import { createFileRoute } from "@tanstack/react-router";
import { TicketsPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/tickets")({
  head: () =>
    pageHead(
      "Tickets",
      "100 seats. Early Bird ₦5,000 until 2 December 2026, Regular ₦7,500. Book TEDxFUTMinna 2026 tickets on Selar.",
      "/tickets",
    ),
  component: TicketsPage,
});
