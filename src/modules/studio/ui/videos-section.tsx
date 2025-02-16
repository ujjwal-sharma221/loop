"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

import { DEFAULT_LIMIT } from "@/lib/constants";
import { trpc } from "@/trpc/client";
import { InfiniteScroll } from "@/components/infinte-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VideoThumbnail } from "@/modules/videos/ui/video-thumbnail";
import { snakeCaseToTitle } from "@/lib/utils";

export function VideosSection() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <LoaderCircle className="animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ErrorBoundary fallback={<p className="text-destructive">Error..</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
}

function VideosSectionSuspense() {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  return (
    <div>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px] pl-6">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="pr-6 text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  legacyBehavior
                  href={`/studio/videos/${video.id}`}
                  key={video.id}
                >
                  <TableRow className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-36 shrink-0">
                          <VideoThumbnail
                            duration={video.duration || 0}
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.previewUrl}
                            title={video.title}
                          />
                        </div>
                        <div className="flex flex-col gap-y-1 overflow-hidden">
                          <span className="line-clamp-1 text-sm">
                            {video.title}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {video.description || "no description"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>visiblity</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {snakeCaseToTitle(video.muxStatus || "error")}
                      </div>
                    </TableCell>
                    <TableCell>date</TableCell>
                    <TableCell>views</TableCell>
                    <TableCell>comments</TableCell>
                    <TableCell>likes</TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>

      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
}
