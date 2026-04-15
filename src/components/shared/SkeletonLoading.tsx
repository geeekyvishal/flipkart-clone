import { cn } from "@/lib/utils";

// Helper components to mimic content structure before loading
export function SkeletonRectangle({ className }: { className?: string }) {
  return (
    <div className={cn("bg-gray-200 animate-pulse rounded-md", className)} />
  );
}

export function SkeletonCircle({ className }: { className?: string }) {
  return (
    <div className={cn("bg-gray-200 animate-pulse rounded-full", className)} />
  );
}

export function HomeSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4 space-y-6">
      {/* Hero Skeleton (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonRectangle className="h-[260px] md:col-span-1 rounded-2xl" />
        <SkeletonRectangle className="h-[260px] md:col-span-1 rounded-2xl" />
        <SkeletonRectangle className="h-[260px] md:col-span-1 rounded-2xl" />
      </div>

       {/* Recommendations Skeleton Row */}
       <div className="bg-white p-4 justify-between rounded-xl hidden md:flex">
          {[1, 2, 3, 4, 5, 6].map((i) => (
             <SkeletonRectangle key={i} className="h-[200px] w-[180px]" />
          ))}
       </div>
       
       {/* Grid Skeleton */}
       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
             <SkeletonRectangle key={i} className="h-[300px] w-full bg-white border border-gray-100 rounded-xl" />
          ))}
       </div>
    </div>
  );
}
