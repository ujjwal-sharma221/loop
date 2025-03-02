import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";

export const appRouter = createTRPCRouter({
  videos: videosRouter,
  studio: studioRouter,
  catgories: categoriesRouter,
  videoViews: videoViewsRouter,
});

export type AppRouter = typeof appRouter;
