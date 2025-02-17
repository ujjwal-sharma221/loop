"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { VideoDropdownMenu } from "./video-dropdown-menu";

interface FormSectionProps {
  videoId: string;
}

export function FormSection({ videoId }: FormSectionProps) {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function FormSectionSkeleton() {
  return <p>Loading</p>;
}

function FormSectionSuspense({ videoId }: FormSectionProps) {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold"> Video Details</h1>
        <p className="text-muted-foreground">Manager your video options</p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button type="submit"> Save </Button>
        <VideoDropdownMenu />
      </div>
    </div>
  );
}
