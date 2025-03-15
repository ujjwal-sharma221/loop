import { HydrateClient, trpc } from "@/trpc/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { videos } from "@/db/schema";
import { VideoView } from "@/modules/videos/ui/video-view";

interface VideoIdPageProps {
  params: Promise<{ videoId: string }>;
}

const VideoIdPage = async ({ params }: VideoIdPageProps) => {
  const { videoId } = await params;

  const [creator] = await db
    .select({
      creatorId: videos.userId,
    })
    .from(videos)
    .where(eq(videos.id, videoId));

  void trpc.videos.getOne.prefetch({ id: videoId });
  void trpc.videos.getVideoReaction.prefetch({ id: videoId });
  void trpc.subscriptions.subscriptionCount.prefetch();
  void trpc.subscriptions.isSubscribed.prefetch({
    creatorId: creator.creatorId,
  });

  return (
    <HydrateClient>
      <VideoView videoId={videoId} creatorId={creator.creatorId} />
    </HydrateClient>
  );
};

export default VideoIdPage;
