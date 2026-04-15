import { SkeletonRectangle } from "@/components/shared/SkeletonLoading";

export function ProductListingSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row gap-4 items-start">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-[260px] bg-white border border-[var(--color-divider)] rounded-sm p-4 h-[600px] shrink-0">
         <SkeletonRectangle className="h-6 w-1/2 mb-6" />
         <div className="space-y-4">
            <SkeletonRectangle className="h-4 w-3/4" />
            <SkeletonRectangle className="h-4 w-2/3" />
            <SkeletonRectangle className="h-4 w-1/2" />
            <SkeletonRectangle className="h-4 w-3/4" />
         </div>
      </div>
      
      {/* Main Grid Skeleton */}
      <div className="flex-1 w-full bg-white border border-[var(--color-divider)] rounded-sm p-4 min-h-[600px]">
         <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
             <SkeletonRectangle className="h-6 w-[200px]" />
             <SkeletonRectangle className="h-6 w-[150px]" />
         </div>
         
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <SkeletonRectangle key={i} className="h-[300px] w-full rounded-xl" />
            ))}
         </div>
      </div>
    </div>
  );
}
