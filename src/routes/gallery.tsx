import { createFileRoute } from '@tanstack/react-router';
import { PhotosPage } from '@/components/content-pages';
import { pageHead } from '@/lib/event';
export const Route = createFileRoute('/gallery')({ head: () => pageHead('Gallery', 'Explore the TEDxFUTMinna photo collection. Approved real event photos coming soon.'), component: () => <PhotosPage gallery/> });
