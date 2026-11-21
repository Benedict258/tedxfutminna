import { describe, it, expect } from "vitest";
import { event, remainingTime, ticketPrice } from "../lib/event";
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
});
