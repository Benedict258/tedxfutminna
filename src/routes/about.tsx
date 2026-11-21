import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/content-pages";
import { pageHead } from "@/lib/event";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About this edition",
      "Discover the third edition of TEDxFUTMinna 2026 and the theme Reimagining Tomorrow, Shape It Today.",
      "/about",
    ),
  component: AboutPage,
});
