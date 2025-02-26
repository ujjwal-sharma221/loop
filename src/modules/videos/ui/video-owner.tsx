import Link from "next/link";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { VideoGetOneOutput } from "../types";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/subscription-button";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export function VideoOwner({ user, videoId }: VideoOwnerProps) {
  const session = authClient.useSession();
  const userId = session.data?.user.id;

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 sm:items-start sm:justify-start">
      <Link href={`/users/${user.id}`}>
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={user.name} />
          <span className="line-clamp-1 text-sm text-muted-foreground">
            0 subs
          </span>
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
          onClick={() => {}}
          disabled={false}
          isSubscribed={false}
          className="flex-none"
        />
      )}
    </div>
  );
}
