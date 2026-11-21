import "./lightbox.css";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { type EventPhoto } from "@/lib/event-photos";

/**
 * Photo lightbox, split out of EventGallery so the Radix dialog code stays out of
 * the initial bundle: it is only needed after a visitor clicks a photo.
 */
export default function EventLightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: EventPhoto[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const active = photos[index];
  const move = (offset: number) =>
    setIndex((current) => (current + offset + photos.length) % photos.length);

  return (
    <Dialog open onOpenChange={(open) => (open ? undefined : onClose())}>
      <DialogContent
        className="event-lightbox"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
      >
        <DialogTitle className="sr-only">{active?.caption ?? "Event photo"}</DialogTitle>
        <DialogDescription className="sr-only">
          Photo from a past TEDxFUTMinna event
        </DialogDescription>
        {active && (
          <>
            <div
              className="lightbox-image"
              onTouchStart={(e) => setTouchStart(e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                const end = e.changedTouches[0]?.clientX;
                if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 50)
                  move(end < touchStart ? 1 : -1);
                setTouchStart(null);
              }}
            >
              <img
                src={active.large}
                alt={`${active.caption} at a past TEDxFUTMinna event`}
                width={1920}
                height={1280}
              />
            </div>
            <div className="lightbox-bottom">
              <span>
                {active.caption}
                <small>
                  {index + 1} / {photos.length}
                </small>
              </span>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Previous photo"
                  aria-label="Previous photo"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Next photo"
                  aria-label="Next photo"
                  onClick={() => move(1)}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
