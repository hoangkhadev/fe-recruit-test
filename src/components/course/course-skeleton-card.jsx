import { Skeleton } from "@/components/ui/skeleton";

export function CourseSkeletonCard() {
  return (
    <div className="border border-neutral-100 bg-white rounded-xl shadow transition-all duration-300 transform p-2">
      <div className="w-full object-cover rounded-t-xl bg-skeleton h-[282px] animate-pulse"></div>
      <div className="flex-1 mt-4 grid gap-2">
        <div className="flex items-center gap-2">
          <Skeleton />
          <Skeleton />
        </div>

        <Skeleton />
        <Skeleton />

        <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>

        <Skeleton />

        <div className="grid gap-2">
          <Skeleton />

          <div className="flex justify-between items-center">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
