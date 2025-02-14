import { createTRPCRouter } from "../init";

import { categoriesRouter } from "@/modules/categories/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  videos: videosRouter,
  studio: studioRouter,
  catgories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
