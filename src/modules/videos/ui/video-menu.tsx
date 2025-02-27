import { ListPlusIcon, Share2Icon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ChevronsUpDownIcon } from "@/components/icons/chevrons-up-down-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoMenuProps {
  videoId: string;
  variant?: "ghost" | "secondary";
  onRemove?: () => void;
}

export function VideoMenu({ variant, videoId, onRemove }: VideoMenuProps) {
  const onShare = () => {
    const fullUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/videos/${videoId}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className="rounded-full">
          <ChevronsUpDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={onShare}>
          <Share2Icon className="mr-2 size-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <ListPlusIcon className="mr-2 size-4" />
          Add to playlist
        </DropdownMenuItem>
        {onRemove ? (
          <DropdownMenuItem onClick={() => {}}>
            <Trash2 className="mr-2 size-4" />
            Remove
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
