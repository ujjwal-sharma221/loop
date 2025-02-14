"use client";

import { useEffect } from "react";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

export function InfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isManual = false,
}: InfiniteScrollProps) {
  const { targetRef, intersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (intersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [intersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="h-1" ref={targetRef}></div>
      {hasNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          variant="secondary"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "loading..." : "load more"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          You have reached the end of the list
        </p>
      )}
    </div>
  );
}
