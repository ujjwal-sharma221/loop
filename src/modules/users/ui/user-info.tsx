import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const userInfoVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "[&_p]:text-sm [&_svg]:size-4",
      sm: "[&_p]:text-xs [&_svg]:size-3.5",
      lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-black",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}

export function UserInfo({ name, className, size }: UserInfoProps) {
  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="line-clamp-1 text-neutral-500 hover:text-neutral-800">
            {name}
          </p>
        </TooltipTrigger>
        <TooltipContent align="center" className="bg-black/70">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
