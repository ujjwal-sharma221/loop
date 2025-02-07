import { cn } from "@/lib/utils";

export function SeparatorText({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center py-3 text-sm text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200",
          className,
        )}
      >
        {label}
      </div>
    </div>
  );
}
