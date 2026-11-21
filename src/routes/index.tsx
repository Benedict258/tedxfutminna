import { lazy, Suspense } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Mic2,
  Sparkles,
  Users,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Countdown,
  DemoSignup,
  FlipCalendar,
  Reveal,
  Ribbon,
  SpeakerCards,
  TicketButton,
} from "@/components/event-motion";
import { event, eventOffers, pageHead, siteUrl } from "@/lib/event";
import themeLight from "@/assets/theme-light-lettering.png";
import themeDark from "@/assets/theme-dark-lettering.png";
const EventGallery = lazy(() =>
  import("@/components/event-gallery").then((module) => ({ default: module.EventGallery })),
);

// Structured data for the event. Start time is intentionally left out until confirmed.
const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "TEDxFUTMinna 2026",
  description:
    "Reimagining Tomorrow, Shape It Today. Saturday, 12 December 2026 at FUTMinna campus, Minna, Nigeria.",
  startDate: "2026-12-12",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "FUTMinna campus",
    address: { "@type": "PostalAddress", addressLocality: "Minna", addressCountry: "NG" },
  },
  ...(siteUrl ? { url: `${siteUrl}/`, image: [`${siteUrl}/og-image.png`] } : {}),
  offers: eventOffers(),
};

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Reimagining Tomorrow",
      "Join TEDxFUTMinna 2026 on Saturday, 12 December. Eight speakers, seven fields, and ideas that shape what comes next. Tickets from ₦5,000.",
      "/",
    ),
  component: Home,
});
function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <section className="home-hero">
        <Ribbon />
        <div className="hero-inner">
          <div className="hero-copy reveal-load">
            <div className="eyebrow">
              <span className="red-dash" /> TEDxFUTMinna 2026{" "}
              <span className="edition-tag">THIRD EDITION</span>
            </div>
            <h1>
              Reimagining
              <br />
              Tomorrow<span className="headline-period">.</span>
            </h1>
            <p className="hero-subtitle">Shape it today.</p>
            <p className="hero-description">
              Tomorrow isn’t something that happens to us.
              <br className="desktop-break" /> It’s built from the ideas we act on today.
            </p>
            <div className="hero-meta">
              <span>
                <CalendarDays size={17} /> Saturday, 12 December 2026
              </span>
              <span>
                <MapPin size={17} /> FUTMinna campus <small>· Exact venue revealed soon</small>
              </span>
            </div>
            <div className="hero-buttons">
              <TicketButton large />
              <Button variant="editorial" size="hero" asChild>
                <Link to="/schedule">
                  See the Schedule <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <div className="hero-bottom-note">
              <span className="status-dot" /> 100 seats. Infinite possibilities.
            </div>
          </div>
          <div className="hero-calendar">
            <FlipCalendar />
            <span className="calendar-annotation">
              A DATE WITH TOMORROW <span>↗</span>
            </span>
          </div>
        </div>
        <div className="hero-scroll">
          <ArrowDown size={15} />
          <span>THE FUTURE STARTS HERE</span>
        </div>
      </section>
      <section className="countdown-band defer-paint">
        <div>
          <span className="eyebrow">THE COUNTDOWN IS ON</span>
          <h2>
            A new tomorrow.
            <br />
            One extraordinary day.
          </h2>
        </div>
        <Countdown />
      </section>
      <div className="theme-marquee defer-paint" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              REIMAGINING TOMORROW <span className="marquee-star">✳</span> SHAPE IT TODAY{" "}
              <span className="marquee-star">✳</span>{" "}
            </span>
          ))}
        </div>
      </div>
      <section className="section-wrap about-preview defer-paint">
        <Reveal>
          <span className="eyebrow">IDEAS THAT MOVE US</span>
          <h2>
            Different perspectives.
            <br />
            Shared possibilities.
          </h2>
        </Reveal>
        <Reveal>
          <p className="large-body">
            A day to question what is, imagine what could be, and connect with the people shaping
            what comes next.
          </p>
          <p>
            TEDx is a program of local, self-organized events that bring people together to share a
            TED-like experience. At TEDxFUTMinna 2026, ideas meet our community.
          </p>
          <div className="inline-links">
            <Button variant="editorial" size="hero" asChild>
              <Link to="/about">
                About this edition <ArrowUpRight />
              </Link>
            </Button>
            <a href="https://www.ted.com/tedx" target="_blank" rel="noopener noreferrer">
              The TEDx program <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>
      <section className="theme-story official-theme-story defer-paint">
        <div className="section-wrap">
          <span className="eyebrow">OUR THEME · 2026</span>
          <Reveal className="official-theme-art">
            <img
              className="theme-for-light"
              src={themeDark}
              alt="Reimagining Tomorrow — Shape It Today"
              width={656}
              height={442}
              loading="lazy"
            />
            <img
              className="theme-for-dark"
              src={themeLight}
              alt="Reimagining Tomorrow — Shape It Today"
              width={656}
              height={442}
              loading="lazy"
            />
          </Reveal>
          <div className="theme-story-bottom">
            <span>
              Tomorrow isn’t something that happens to us.
              <br />
              It’s built from the ideas we act on today.
            </span>
            <ArrowUpRight size={48} />
          </div>
        </div>
      </section>
      <section className="section-wrap expectation-section defer-paint">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ONE DAY. MANY POSSIBILITIES.</span>
            <h2>What’s waiting for you.</h2>
          </div>
          <span className="section-index">01 / THE EXPERIENCE</span>
        </div>
        <div className="expectation-grid">
          {[
            {
              icon: Mic2,
              title: "8 voices. 7 fields.",
              text: "Fresh perspectives from speakers across disciplines.",
            },
            {
              icon: Play,
              title: "Ideas on screen.",
              text: "TED Talk screenings that open up new conversations.",
            },
            {
              icon: Sparkles,
              title: "Art in motion.",
              text: "Poetry, spoken word and dance. Expression without limits.",
            },
            {
              icon: Users,
              title: "Meaningful connections.",
              text: "Meet the people building what’s next.",
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <div className="expectation-item">
                <item.icon size={25} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section-wrap speakers-preview defer-paint">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE VOICES OF TOMORROW</span>
            <h2>Worth the wait.</h2>
            <p>Speakers to be announced. New perspectives are on their way.</p>
          </div>
          <Button variant="editorial" asChild>
            <Link to="/speakers">
              Meet the speakers <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <SpeakerCards count={4} />
      </section>
      <section className="section-wrap past-preview defer-paint">
        <span className="eyebrow">FROM PAST EDITIONS</span>
        <div className="section-heading">
          <h2>The ideas live on.</h2>
          <Button variant="editorial" asChild>
            <Link to="/past-events">
              Past Events <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <Suspense fallback={null}>
          <EventGallery placement="home" />
        </Suspense>
      </section>
      <section className="section-wrap defer-paint">
        <DemoSignup />
      </section>
    </>
  );
}
