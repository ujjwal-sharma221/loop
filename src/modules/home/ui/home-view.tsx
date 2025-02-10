import { CategoriesSection } from "./category-section";

interface HomeViewProps {
  categoryId?: string;
}

export function HomeView({ categoryId }: HomeViewProps) {
  return (
    <div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4">
      <CategoriesSection categoryId={categoryId} />
    </div>
  );
}
