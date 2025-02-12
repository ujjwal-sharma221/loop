"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
  categoryId?: string;
}

export function CategoriesSection({ categoryId }: CategoriesSectionProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center text-muted-foreground">
          <LoaderCircle className="animate-spin" />
        </div>
      }
    >
      <ErrorBoundary fallback={<p className="text-destructive">Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSectionSuspense({ categoryId }: CategoriesSectionProps) {
  const router = useRouter();
  const [categories] = trpc.catgories.getMany.useSuspenseQuery();
  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId}
      data={data}
    ></FilterCarousel>
  );
}
