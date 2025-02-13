import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StudioUploadModal() {
  return (
    <Button variant="secondary" className="max-sm:p-0">
      <PlusIcon
        className="opacity-60 sm:-ms-1 sm:me-2"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Create new</span>
    </Button>
  );
}
