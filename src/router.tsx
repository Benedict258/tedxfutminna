import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    // Route preloads are considered stale immediately so a fresh preload always refetches.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
