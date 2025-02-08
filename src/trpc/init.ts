import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import superjson from "superjson";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { rateLimit } from "@/lib/rate-limit";

export const createTRPCContext = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return { userId: session?.user.id };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  async function isAuthorized(opts) {
    const { ctx } = opts;

    if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    const [userInfo] = await db
      .select()
      .from(user)
      .where(eq(user.id, ctx.userId));

    if (!userInfo) throw new TRPCError({ code: "UNAUTHORIZED" });

    const { success } = await rateLimit.limit(userInfo.id);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    return opts.next({
      ctx: { ...ctx, userInfo },
    });
  },
);
