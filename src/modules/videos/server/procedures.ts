import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { db } from "@/db";
import { videos, videoUpdateSchema } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  update: protectedProcedure
    .input(videoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.userInfo;

      if (!input.id) throw new TRPCError({ code: "BAD_REQUEST" });

      const updatedVideo = await db
        .update(videos)
        .set({
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          visibility: input.visibility,
          updatedAt: new Date(),
        })
        .where(and(eq(videos.id, input.id), eq(videos.userId, userId)));

      if (!updatedVideo) throw new TRPCError({ code: "NOT_FOUND" });
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.userInfo;
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policy: ["public"],
        input: [
          { generated_subtitles: [{ language_code: "en", name: "English" }] },
        ],
      },
      cors_origin: "*",
    });
    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "untitled",
        muxStatus: "waiting",
        muxUploadId: upload.id,
      })
      .returning();

    return { video: video, url: upload.url };
  }),
});
