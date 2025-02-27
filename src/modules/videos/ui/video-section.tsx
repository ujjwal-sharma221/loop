"use client";

import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { VideoPlayer } from "@/modules/studio/ui/video-player";
import { VideoGetOneOutput } from "../types";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { VideoTopRow } from "./video-top-row";

interface VideoSectionProps {
  videoId: string;
}

export function VideoSection({ videoId }: VideoSectionProps) {
  return (
    <Suspense>
      <ErrorBoundary fallback={<p>error</p>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function VideoSectionSuspense({ videoId }: VideoSectionProps) {
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
  return (
    <>
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-xl bg-black",
          video.muxStatus !== "ready" && "rounded-none",
        )}
      >
        <VideoPlayer
          autoPlay
          onPlay={() => {}}
          playbackId={video.muxPlaybackId}
          posterUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
}

interface VideoBannerProps {
  status: VideoGetOneOutput["muxStatus"];
}

function VideoBanner({ status }: VideoBannerProps) {
  if (status === null || status === "ready") return null;

  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="dark rounded-xl rounded-t-none bg-neutral-200 px-4 text-black md:py-2">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center md:justify-center">
          <TextShimmer duration={1.2} className="font-mono text-sm">
            The video is still being processed...
          </TextShimmer>
        </div>
        <Button
          variant="default"
          className="group -my-1.5 -me-2 size-8 shrink-0 rounded-full border border-neutral-200 bg-neutral-100 p-0 shadow-none hover:border-black hover:bg-transparent"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
