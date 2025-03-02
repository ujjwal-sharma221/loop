"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { VideoGetOneOutput } from "../types";
import { VideoOwner } from "./video-owner";
import { UpvoteIcon } from "@/components/icons/upvote-icon";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DownvoteIcon } from "@/components/icons/downvote-icon";
import { VideoMenu } from "./video-menu";

interface VideoTopRowProps {
  video: VideoGetOneOutput;
}

export function VideoTopRow({ video }: VideoTopRowProps) {
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
          <VideoReactions />
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

function VideoReactions() {
  const videoReaction = "like";

  return (
    <div className="flex flex-none items-center">
      <Button
        className="gap-2 rounded-l-full rounded-r-none pr-4"
        variant="secondary"
      >
        <UpvoteIcon
          className={cn("size-5", videoReaction === "like" && "fill-black")}
        />
        {1}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        className="rounded-l-none rounded-r-full pl-3"
        variant="secondary"
      >
        <DownvoteIcon
          className={cn("size-5", videoReaction !== "like" && "fill-black")}
        />
        {1}
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
