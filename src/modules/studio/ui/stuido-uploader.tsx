import MuxUploader from "@mux/mux-uploader-react";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
}

export function StudioUploader({ endpoint, onSuccess }: StudioUploaderProps) {
  return (
    <div>
      <MuxUploader endpoint={endpoint} />
    </div>
  );
}
