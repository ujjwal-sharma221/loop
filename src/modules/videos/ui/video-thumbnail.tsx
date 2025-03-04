import Image from "next/image";

import { formatDuration } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/lib/constants";

interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
}

export function VideoThumbnail({
  title,
  duration,
  imageUrl,
  previewUrl,
}: VideoThumbnailProps) {
  return (
    <div className="group relative">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl transition-all">
        <Image
          src={imageUrl ? imageUrl : THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>
      <div className="absolute bottom-2 right-2 rounded bg-zinc-800 px-1 py-0.5 font-medium text-white">
        {formatDuration(duration)}
      </div>
    </div>
  );
}
