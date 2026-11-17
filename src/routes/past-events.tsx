import { createFileRoute } from '@tanstack/react-router';
import { PhotosPage } from '@/components/content-pages';
import { pageHead } from '@/lib/event';
export const Route = createFileRoute('/past-events')({ head: () => pageHead('Past Events', 'Moments from past TEDxFUTMinna editions. Approved event photos coming soon.'), component: PhotosPage });
