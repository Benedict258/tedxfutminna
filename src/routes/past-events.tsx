import { createFileRoute } from '@tanstack/react-router';
import { PhotosPage } from '@/components/content-pages';
import { pageHead } from '@/lib/event';
export const Route = createFileRoute('/past-events')({ head: () => pageHead('Past Events', 'Look back at the stages, voices, art and conversations of past TEDxFUTMinna editions.'), component: PhotosPage });
