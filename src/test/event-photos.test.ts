import { describe, expect, it } from 'vitest';
import { eventPhotos, photosForPlacement } from '@/lib/event-photos';

describe('Approved event photo placements', () => {
  it('includes all 13 approved photos in Gallery', () => {
    expect(photosForPlacement('gallery')).toHaveLength(13);
  });
  it('keeps the three sponsor-bearing photos in Gallery only', () => {
    const restricted = ['speakers-group', 'community-group', 'group-with-red-x'];
    expect(eventPhotos.filter(photo => photo.galleryOnly).map(photo => photo.id).sort()).toEqual([...restricted].sort());
    for (const placement of ['home', 'past'] as const) {
      expect(photosForPlacement(placement).map(photo => photo.id).filter(id => restricted.includes(id))).toEqual([]);
    }
  });
  it('excludes the TED Talk screening photo from every placement', () => {
    expect(eventPhotos.map(photo => photo.id)).not.toContain('ted-talk-screening');
  });
});