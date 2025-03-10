"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { VideoGetOneOutput, VideoReaction } from "../types";
import { VideoOwner } from "./video-owner";
import { UpvoteIcon } from "@/components/icons/upvote-icon";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DownvoteIcon } from "@/components/icons/downvote-icon";
import { VideoMenu } from "./video-menu";
import { trpc } from "@/trpc/client";

interface VideoTopRowProps {
  video: VideoGetOneOutput;
  reaction: VideoReaction;
}

export function VideoTopRow({ video, reaction }: VideoTopRowProps) {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(video.viewCount);
  }, [video.viewCount]);

  const expandedViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "standard",
    }).format(video.viewCount);
  }, [video.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(video.createdAt, { addSuffix: true });
  }, [video.createdAt]);

  const expandedDate = useMemo(() => {
    return format(video.createdAt, "d MMM yyyy");
  }, [video.createdAt]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <VideoOwner user={video.user} videoId={video.id} />
        <div className="-mb-2 flex gap-2 overflow-x-auto pb-2 sm:mb-0 sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible sm:pb-0">
          <VideoReactions
            videoReaction={reaction}
            videoId={video.id}
            likes={video.likeCount}
            dislikes={video.dislikeCount}
          />
          <VideoMenu videoId={video.id} variant="secondary" />
        </div>
      </div>
      <VideoDescription
        compactViews={compactViews}
        expandedViews={expandedViews}
        compactDate={compactDate}
        expandedDate={expandedDate}
        description={video.description}
      />
    </div>
  );
}

interface VideoReactionProps {
  videoReaction: VideoReaction;
  videoId: string;
  likes: number;
  dislikes: number;
}

function VideoReactions({
  videoReaction,
  videoId,
  likes,
  dislikes,
}: VideoReactionProps) {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(
    videoReaction,
  );
  const [localLikes, setLikes] = useState<number>(likes);
  const [localDislikes, setDislikes] = useState<number>(dislikes);
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getVideoReaction.invalidate({ id: videoId });
      toast.success("Reaction recorded");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const dislike = trpc.videoReactions.dislike.useMutation({
    onSuccess: () => {
      utils.videos.getVideoReaction.invalidate({ id: videoId });
      toast.success("Reaction recorded");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const handleLike = () => {
    if (reaction === "like") {
      setReaction(null);
      setLikes((prev) => prev - 1);
      like.mutate({ videoId });
    } else {
      if (reaction === "dislike") {
        setDislikes((prev) => prev - 1);
      }
      like.mutate({ videoId });
      setReaction("like");
      setLikes((prev) => prev + 1);
    }
  };

  const handleDislike = () => {
    if (reaction === "dislike") {
      setReaction(null);
      setDislikes((prev) => prev - 1);
      dislike.mutate({ videoId });
    } else {
      if (reaction === "like") {
        setLikes((prev) => prev - 1);
      }
      dislike.mutate({ videoId });
      setReaction("dislike");
      setDislikes((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-none items-center">
      <Button
        onClick={handleLike}
        disabled={like.isPending || dislike.isPending}
        className={cn(
          videoReaction === "like" && "bg-zinc-700 text-white",
          "gap-2 rounded-l-full rounded-r-none pr-4 hover:text-primary",
        )}
        variant="secondary"
      >
        <UpvoteIcon
          className={cn("size-5", videoReaction === "like" && "fill-black")}
        />
        {localLikes}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        onClick={handleDislike}
        disabled={like.isPending || dislike.isPending}
        className={cn(
          "rounded-l-none rounded-r-full pl-3",
          videoReaction === "dislike" && "bg-zinc-700 text-white",
        )}
        variant="secondary"
      >
        <DownvoteIcon className={cn("size-5")} />
        {localDislikes}
      </Button>
    </div>
  );
}

interface VideoDescriptionProps {
  compactViews: string;
  expandedViews: string;
  compactDate: string;
  expandedDate: string;
  description?: string | null;
}

function VideoDescription({
  compactDate,
  compactViews,
  expandedDate,
  expandedViews,
  description,
}: VideoDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onClick={() => setIsExpanded((prev) => !prev)}
      className="cursor-pointer rounded-xl bg-secondary/50 p-3 transition hover:bg-secondary/80"
    >
      <div className="mb-2 flex gap-2 text-sm">
        <span className="font-medium">
          {isExpanded ? expandedViews : compactViews} views
        </span>
        <span className="font-medium">
          {isExpanded ? expandedDate : compactDate}
        </span>
      </div>
      <div className="relative">
        <p
          className={cn(
            "whitespace-pre-wrap text-sm",
            !isExpanded && "line-clamp-2",
          )}
        >
          {description || "no description"}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium">
          {isExpanded ? (
            <>
              Show less <ChevronUp className="size-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="size-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
