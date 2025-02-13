import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function UserAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={cn(className)}>
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
