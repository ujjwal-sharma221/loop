import { FormSection } from "./form-section";

interface VideoViewProps {
  videoId: string;
}

export function VideoView({ videoId }: VideoViewProps) {
  return (
    <div className="px-4 pt-2.5">
      <FormSection videoId={videoId} />
    </div>
  );
}
