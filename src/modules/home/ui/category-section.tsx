"use client";

import { trpc } from "@/trpc/client";

interface CategoriesSectionProps {
  categoryId?: string;
}

export function CategoriesSection({ categoryId }: CategoriesSectionProps) {
  const [categories] = trpc.catgories.getMany.useSuspenseQuery();
  return <div>{JSON.stringify(categories)}</div>;
}
