import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { HydrateClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";
import { StudioView } from "@/modules/studio/ui/studio-view";
import { DEFAULT_LIMIT } from "@/lib/constants";

const StudioPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth");

  void trpc.studio.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};
export default StudioPage;
