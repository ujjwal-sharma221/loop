import { HomeView } from "@/modules/home/ui/home-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId } = await searchParams;

  void trpc.catgories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};
export default HomePage;
