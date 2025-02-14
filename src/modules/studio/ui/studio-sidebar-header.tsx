import Link from "next/link";

import { SidebarHeader } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "@/components/user-avatar";

export function StudioSidebarHeader() {
  const session = authClient.useSession();
  if (!session.data)
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <div className="flex flex-col items-center">
          <UserAvatar
            className="animate-pulse border border-black transition-opacity hover:opacity-80"
            name=""
          />
          <p className="animate-pulse text-muted-foreground">loading</p>
        </div>
      </SidebarHeader>
    );

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current" className="flex flex-col items-center">
        <UserAvatar
          className="border border-black transition-opacity hover:opacity-80"
          name={session.data.user.name}
        />
        <p className="font-semibold underline">{session.data.user.name}</p>
      </Link>
    </SidebarHeader>
  );
}
