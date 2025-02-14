"use client";

import { LoaderCircle, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export function StudioUploadModal() {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("New video created");
      utils.studio.getMany.invalidate();
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Something went wrong, please try again!");
    },
  });

  return (
    <Button
      disabled={create.isPending}
      onClick={() => create.mutate()}
      variant="secondary"
      className="max-sm:p-0"
    >
      {create.isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <PlusIcon
          className="opacity-60 sm:-ms-1 sm:me-2"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
      <span className="max-sm:sr-only">Create new</span>
    </Button>
  );
}
