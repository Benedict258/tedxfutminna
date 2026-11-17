import { createFileRoute } from '@tanstack/react-router';
import { TeamPage } from '@/components/content-pages';
import { pageHead } from '@/lib/event';
export const Route = createFileRoute('/team')({ head: () => pageHead('The Core Team', 'Meet the people behind TEDxFUTMinna 2026. Core team details coming soon.'), component: TeamPage });
