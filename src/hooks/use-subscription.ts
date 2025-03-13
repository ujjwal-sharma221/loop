"use client";

import { toast } from "sonner";

import { trpc } from "@/trpc/client";

interface UseSubscriptionProps {
  userId: string;
  isSubscribed: boolean;
  fromVideoId?: string;
}

export const useSubscription = ({
  userId,
  isSubscribed,
  fromVideoId,
}: UseSubscriptionProps) => {
  const utils = trpc.useUtils();

  const subscribe = trpc.subscriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed");
      if (fromVideoId) {
        utils.subscriptions.subscriptionCount.invalidate();
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(error);
    },
  });

  const unSubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed");
      if (fromVideoId) {
        utils.subscriptions.subscriptionCount.invalidate();
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(error);
    },
  });

  const isPending = subscribe.isPending || unSubscribe.isPending;

  const onClick = () => {
    if (isSubscribed) unSubscribe.mutate({ userId });
    else subscribe.mutate({ userId });
  };

  return { isPending, onClick };
};
