import { useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { photosForPlacement, type EventPhoto } from '@/lib/event-photos';
import { Reveal } from './event-motion';

export function EventGallery({ placement }: { placement: 'home' | 'past' | 'gallery' }) {
  const photos = photosForPlacement(placement);
  const [selected, setSelected] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const active: EventPhoto | undefined = selected === null ? undefined : photos[selected];
  const move = (offset: number) => setSelected(index => index === null ? null : (index + offset + photos.length) % photos.length);
  return <>
    <div className={`event-photo-grid ${placement === 'home' ? 'event-photo-preview' : ''}`}>
      {photos.map((photo, index) => <Reveal key={photo.id} className="event-photo-item"><figure>
        <Button variant="ghost" className="event-photo-button" aria-label={`Open photo: ${photo.caption}`} onClick={() => setSelected(index)}>
          <img src={photo.medium} srcSet={`${photo.small} 480w, ${photo.medium} 960w, ${photo.large} 1920w`} sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw" alt={`${photo.caption} at a past TEDxFUTMinna event`} width={1920} height={1280} loading="lazy" decoding="async"/>
          <span className="photo-expand"><Maximize2 size={18}/></span>
        </Button><figcaption>{photo.caption}</figcaption>
      </figure></Reveal>)}
    </div>
    <Dialog open={active !== undefined} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="event-lightbox" onKeyDown={e => { if (e.key === 'ArrowLeft') move(-1); if (e.key === 'ArrowRight') move(1); }}>
        <DialogTitle className="sr-only">{active?.caption ?? 'Event photo'}</DialogTitle>
        <DialogDescription className="sr-only">Photo from a past TEDxFUTMinna event</DialogDescription>
        {active && <>
          <div className="lightbox-image" onTouchStart={e => setTouchStart(e.touches[0]?.clientX ?? null)} onTouchEnd={e => {
            const end = e.changedTouches[0]?.clientX;
            if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 50) move(end < touchStart ? 1 : -1);
            setTouchStart(null);
          }}><img src={active.large} alt={`${active.caption} at a past TEDxFUTMinna event`} width={1920} height={1280}/></div>
          <div className="lightbox-bottom"><span>{active.caption}<small>{(selected ?? 0) + 1} / {photos.length}</small></span><div>
            <Button variant="ghost" size="icon" title="Previous photo" aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft/></Button>
            <Button variant="ghost" size="icon" title="Next photo" aria-label="Next photo" onClick={() => move(1)}><ArrowRight/></Button>
          </div></div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}