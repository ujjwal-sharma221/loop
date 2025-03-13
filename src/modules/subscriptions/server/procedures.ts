import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";

export const subscriptionsRouter = createTRPCRouter({
  subscriptionCount: baseProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    if (!userId) throw new TRPCError({ code: "BAD_REQUEST" });

    const [subscriberCount] = await db
      .select({
        subscribers: db.$count(
          subscriptions,
          eq(subscriptions.creatorId, userId),
        ),
      })
      .from(subscriptions);

    return (subscriberCount && subscriberCount.subscribers) ?? 0;
  }),

  create: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId } = input;
      if (userId === ctx.userInfo.id)
        throw new TRPCError({ code: "BAD_REQUEST" });

      const [subscription] = await db
        .insert(subscriptions)
        .values({ viewerId: ctx.userInfo.id, creatorId: userId })
        .returning();

      return subscription;
    }),

  isSubscribed: baseProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      if (!userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be logged in to check subscription status",
        });

      const results = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.creatorId, input.creatorId),
            eq(subscriptions.viewerId, userId),
          ),
        );

      return results.length > 0;
    }),

  remove: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId } = input;
      if (userId === ctx.userInfo.id)
        throw new TRPCError({ code: "BAD_REQUEST" });

      const [deletedSubscription] = await db
        .delete(subscriptions)
        .where(
          and(
            eq(subscriptions.viewerId, ctx.userInfo.id),
            eq(subscriptions.creatorId, userId),
          ),
        )
        .returning();

      return deletedSubscription;
    }),
});
