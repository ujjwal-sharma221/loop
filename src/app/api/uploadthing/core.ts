import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { videos } from "@/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ videoId: z.string() }))
    .middleware(async ({ input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) throw new UploadThingError("Unauthorized");

      const [existingVideo] = await db
        .select({ thumbnailKey: videos.thumbnailKey })
        .from(videos)
        .where(
          and(eq(videos.id, input.videoId), eq(videos.userId, session.user.id)),
        );

      if (!existingVideo) throw new UploadThingError("Not Found");

      if (existingVideo.thumbnailKey) {
        const utApi = new UTApi();
        await utApi.deleteFiles(existingVideo.thumbnailKey);
        await db
          .update(videos)
          .set({ thumbnailKey: null, thumbnailUrl: null })
          .where(
            and(
              eq(videos.id, input.videoId),
              eq(videos.userId, session.user.id),
            ),
          );
      }

      console.log("AUTH_USER_ID", session.user.id);
      return { user: session.user, ...input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("VIDEO_ID", metadata.videoId);
      console.log("MUTATION_USER_ID", metadata.user.id);
      await db
        .update(videos)
        .set({ thumbnailUrl: file.ufsUrl, thumbnailKey: file.key })
        .where(
          and(
            eq(videos.id, metadata.videoId),
            eq(videos.userId, metadata.user.id),
          ),
        );

      return { uploadedBy: metadata.user.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
