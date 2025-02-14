import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.userInfo;
    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "untitled",
      })
      .returning();

    return { video };
  }),
});
