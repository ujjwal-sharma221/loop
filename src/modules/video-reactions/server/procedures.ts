import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { videoReactions } from "@/db/schema";

export const videoReactionsRouter = createTRPCRouter({
  like: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.userInfo;
      const { videoId } = input;

      const [existingVideoReaction] = await db
        .select()
        .from(videoReactions)
        .where(
          and(
            eq(videoReactions.videoId, videoId),
            eq(videoReactions.userId, userId),
            eq(videoReactions.type, "like"),
          ),
        );

      if (existingVideoReaction) {
        const [deletedVideoReaction] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.videoId, videoId),
              eq(videoReactions.userId, userId),
            ),
          )
          .returning();

        return deletedVideoReaction;
      }

      const [createdVideoViewReaction] = await db
        .insert(videoReactions)
        .values({ userId, videoId, type: "like" })
        .onConflictDoUpdate({
          target: [videoReactions.videoId, videoReactions.userId],
          set: { type: "like" },
        })
        .returning();

      return createdVideoViewReaction;
    }),

  dislike: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.userInfo;
      const { videoId } = input;

      const [existingVideoReactionDislike] = await db
        .select()
        .from(videoReactions)
        .where(
          and(
            eq(videoReactions.videoId, videoId),
            eq(videoReactions.userId, userId),
            eq(videoReactions.type, "dislike"),
          ),
        );

      if (existingVideoReactionDislike) {
        const [deletedVideoReaction] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.id, existingVideoReactionDislike.id),
              eq(videoReactions.userId, userId),
            ),
          )
          .returning();

        return deletedVideoReaction;
      }

      const [createdVideoViewReaction] = await db
        .insert(videoReactions)
        .values({ userId, videoId, type: "dislike" })
        .onConflictDoUpdate({
          target: [videoReactions.videoId, videoReactions.userId],
          set: { type: "dislike" },
        })
        .returning();

      return createdVideoViewReaction;
    }),
});
