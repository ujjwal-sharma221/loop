import { toast } from "sonner";
import { useState } from "react";
import { Ellipsis, ImagePlusIcon, RotateCcw, SparklesIcon } from "lucide-react";

import { trpc } from "@/trpc/client";
import { ThumbnailUploadModal } from "./thumbnail-upload-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ImageDropdownMenu({ videoId }: { videoId: string }) {
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const utils = trpc.useUtils();
  const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Thumbnail restored");
    },
    onError: (err) => {
      toast.error("something went wrong");
      console.error(err);
    },
  });

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Background job started,", {
        description: "This may take some time",
      });
    },
    onError: (err) => {
      toast.error("something went wrong");
      console.error(err);
    },
  });

  return (
    <>
      <ThumbnailUploadModal
        videoId={videoId}
        open={thumbnailModalOpen}
        onOpenChange={setThumbnailModalOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1 size-7 rounded-full bg-black/50 opacity-100 shadow-none duration-300 hover:bg-black/50 group-hover:opacity-100 md:opacity-0"
            aria-label="Open edit menu"
          >
            <Ellipsis size={16} className="text-white" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
            <ImagePlusIcon className="mr-1 size-4" />
            Change
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => generateThumbnail.mutate({ id: videoId })}
          >
            <SparklesIcon className="mr-1 size-4" />
            AI-Generated
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => restoreThumbnail.mutate({ id: videoId })}
          >
            <RotateCcw className="mr-1 size-4" />
            Restore
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
