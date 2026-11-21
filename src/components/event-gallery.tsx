import { Suspense, lazy, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photosForPlacement, type EventPhoto } from "@/lib/event-photos";
import { Reveal } from "./event-motion";

// Radix dialog + lightbox logic only load after a visitor clicks a photo.
const EventLightbox = lazy(() => import("./event-lightbox"));

export function EventGallery({ placement }: { placement: "home" | "past" | "gallery" }) {
  const photos = photosForPlacement(placement);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className={`event-photo-grid ${placement === "home" ? "event-photo-preview" : ""}`}>
        {photos.map((photo, index) => (
          <Reveal key={photo.id} className="event-photo-item">
            <figure>
              <Button
                variant="ghost"
                className="event-photo-button"
                aria-label={`Open photo: ${photo.caption}`}
                onClick={() => setSelected(index)}
              >
                <img
                  src={photo.medium}
                  srcSet={`${photo.small} 480w, ${photo.medium} 960w, ${photo.large} 1920w`}
                  sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                  alt={`${photo.caption} at a past TEDxFUTMinna event`}
                  width={1920}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                />
                <span className="photo-expand">
                  <Maximize2 size={18} />
                </span>
              </Button>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      {selected !== null && (
        <Suspense fallback={null}>
          <EventLightbox
            photos={photos}
            initialIndex={selected}
            onClose={() => setSelected(null)}
          />
        </Suspense>
      )}
    </>
  );
}
