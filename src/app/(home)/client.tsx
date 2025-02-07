"use client";

import { trpc } from "@/trpc/client";

export function ClientPage() {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "trpc server from client",
  });
  return <div>Page Client {data.greeting} </div>;
}
