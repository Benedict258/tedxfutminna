import { describe, it, expect } from "vitest";
import { event, eventOffers, pageHead, remainingTime, ticketPrice } from "../lib/event";
import { normalizeSiteUrl, pageMetadata, robotsTxt, sitemapXml } from "../lib/site-url";
describe("Confirmed event rules", () => {
  it("charges ₦5,000 through 2 December in Nigeria", () => {
    expect(ticketPrice(Date.parse("2026-12-02T23:59:59+01:00"))).toBe(5000);
  });
  it("charges ₦7,500 after Early Bird closes", () => {
    expect(ticketPrice(Date.parse("2026-12-03T00:00:00+01:00"))).toBe(7500);
  });
  it("has a 100-seat capacity", () => {
    expect(event.capacity).toBe(100);
  });
  it("counts down to 12 December without announcing a start time", () => {
    expect(remainingTime(Date.parse("2026-12-11T00:00:00+01:00"))).toEqual([1, 0, 0, 0]);
  });
  it("keeps the site origin empty until VITE_SITE_URL is a real http(s) url", () => {
    expect(normalizeSiteUrl(undefined)).toBe("");
    expect(normalizeSiteUrl("")).toBe("");
    expect(normalizeSiteUrl("tedxfutminna")).toBe("");
    expect(normalizeSiteUrl("https://events.example.com/")).toBe("https://events.example.com");
    expect(sitemapXml("")).not.toContain("<loc>");
    expect(robotsTxt("")).not.toContain("Sitemap:");
    expect(sitemapXml("https://events.example.com")).toContain(
      "<loc>https://events.example.com/tickets</loc>",
    );
    expect(robotsTxt("https://events.example.com")).toContain(
      "Sitemap: https://events.example.com/sitemap.xml",
    );
    expect(
      pageMetadata("https://events.example.com", "Tickets", "Seats", "/tickets").links,
    ).toEqual([{ rel: "canonical", href: "https://events.example.com/tickets" }]);
    expect(pageHead("Tickets", "Seats", "/tickets").links).toEqual([]);
  });
  it("publishes Early Bird through 2 December and Regular from 3 December", () => {
    expect(eventOffers()).toEqual([
      {
        "@type": "Offer",
        name: "Early Bird",
        url: event.ticketUrl,
        price: "5000",
        priceCurrency: "NGN",
        priceValidUntil: "2026-12-02",
      },
      {
        "@type": "Offer",
        name: "Regular",
        url: event.ticketUrl,
        price: "7500",
        priceCurrency: "NGN",
        validFrom: "2026-12-03",
      },
    ]);
  });
});
