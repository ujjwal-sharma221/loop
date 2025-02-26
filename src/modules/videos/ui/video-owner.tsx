import { VideoGetOneOutput } from "../types";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export function VideoOwner({ user, videoId }: VideoOwnerProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 sm:items-start sm:justify-start">
      User Info
    </div>
  );
}
