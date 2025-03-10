import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

export type VideoGetOneOutput =
  inferRouterOutputs<AppRouter>["videos"]["getOne"];

export type VideoReaction =
  | inferRouterOutputs<AppRouter>["videos"]["getVideoReaction"]
  | null;
