import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="mx-auto w-1/2 space-y-2">
      <div className="relative">
        <Input
          className="peer rounded-full pe-9 shadow-none"
          placeholder="Search..."
        />

        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <Search size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
