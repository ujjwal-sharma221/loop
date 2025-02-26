import { authClient } from "@/lib/auth-client";

export async function useGetSession() {
  const session = authClient.useSession();
  return;
}
