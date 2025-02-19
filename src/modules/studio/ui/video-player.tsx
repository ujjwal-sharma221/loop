"use client";

import { THUMBNAIL_FALLBACK } from "@/lib/constants";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  autoPlay?: boolean;
  onPlay?: () => void;
  playbackId?: string | null | undefined;
  posterUrl?: string | null | undefined;
}

export function VideoPlayer({
  autoPlay,
  onPlay,
  playbackId,
  posterUrl,
}: VideoPlayerProps) {
  if (!playbackId) return null;

  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={posterUrl || THUMBNAIL_FALLBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="size-full object-contain"
      accentColor="#FF2056 "
      onPlay={onPlay}
    />
  );
}
