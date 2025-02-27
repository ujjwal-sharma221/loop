import { SuggestionsSection } from "@/modules/videos/ui/suggestions-section";
import { VideoSection } from "./video-section";
import { CommentsSection } from "@/modules/videos/ui/comments-section";

export function VideoView({ videoId }: { videoId: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-[1700px] flex-col px-4 pt-2.5">
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <VideoSection videoId={videoId} />
          <div className="mt-4 block xl:hidden">
            <SuggestionsSection />
            <CommentsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
