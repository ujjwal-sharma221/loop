import { categoriesRouter } from "@/modules/categories/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  catgories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
