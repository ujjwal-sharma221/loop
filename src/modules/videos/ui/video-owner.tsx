import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { subscriberCountValues, VideoGetOneOutput } from "../types";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/subscription-button";
import { UserInfo } from "@/modules/users/ui/user-info";
import { useSubscription } from "@/hooks/use-subscription";
import { trpc } from "@/trpc/client";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  subscriberCount: subscriberCountValues;
  videoId: string;
  isSubscribed: boolean;
}

export function VideoOwner({
  user,
  isSubscribed,
  videoId,
  subscriberCount,
}: VideoOwnerProps) {
  const session = authClient.useSession();
  if (!session || !session.data) return null;

  const userId = session.data.user.id;
  const username = session.data.user.name;

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: isSubscribed,
    fromVideoId: videoId,
  });

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 sm:items-start sm:justify-start">
      <Link href={`/users/${user.id}`}>
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={user.name} />
          <div className="flex min-w-0 flex-col gap-1">
            <UserInfo size="lg" name={username} />
            <span className="line-clamp-1 text-sm text-muted-foreground">
              {subscriberCount} subs
            </span>
          </div>
        </div>
      </Link>
      {userId === user.id ? (
        <Button className="group rounded-full" variant="outline" asChild>
          <Link href={`/studio/videos/${videoId}`}>
            <span>Edit Video</span>

            <ArrowRightIcon
              className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={onClick}
          disabled={isPending}
          isSubscribed={isSubscribed}
          className="flex-none"
        />
      )}
    </div>
  );
}
