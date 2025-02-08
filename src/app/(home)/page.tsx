import { HydrateClient, trpc } from "@/trpc/server";
import { ClientPage } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = async () => {
  void trpc.hello.prefetch({ text: "trpc server" });

  return (
    <div>
      <h1>Home</h1>
      <HydrateClient>
        <Suspense fallback={<p>trpc loading...</p>}>
          <ClientPage />
        </Suspense>
      </HydrateClient>
    </div>
  );
};
export default HomePage;
