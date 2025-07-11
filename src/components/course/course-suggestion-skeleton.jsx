import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function CourseSuggestionSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 grid gap-2">
      <Skeleton />
      <Skeleton />
      <div className="flex items-center justify-between">
        <Skeleton className="px-20" />
        <Skeleton className="px-10" />
      </div>
    </div>
  );
}
