import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/content-pages';
import { pageHead } from '@/lib/event';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact', 'Connect with TEDxFUTMinna 2026. Questions about the event, partnerships and programme.'), component: ContactPage });
