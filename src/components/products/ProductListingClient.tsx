"use client";

import { useState, useMemo, useEffect } from "react";
import { SidebarFilters } from "./SidebarFilters";
import { ProductGridContainer } from "./ProductGridContainer";
import { ProductListingSkeleton } from "./ProductListingSkeleton";
import { useSearchParams } from "next/navigation";
import { FlipkartLoader } from "@/components/shared/FlipkartLoader";

import { PageContainer } from "@/components/layout/PageContainer";

type ProductListingClientProps = {
  initialProducts: any[];
};

export function ProductListingClient({ initialProducts }: ProductListingClientProps) {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('search') || "";

  const [isLoading, setIsLoading] = useState(false); // Only use to simulate initial load if desired
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || "");
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
     let result = [...initialProducts];

     // 1. Filter by Search Query
     if (searchQuery) {
       result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
     }

     // 2. Filter by Category
     if (selectedCategory && selectedCategory !== "All") {
       result = result.filter(p => p.category === selectedCategory);
     }

     // 3. Sort
     if (sortOption === "price-low-high") {
       result.sort((a, b) => a.numericPrice - b.numericPrice);
     } else if (sortOption === "price-high-low") {
       result.sort((a, b) => b.numericPrice - a.numericPrice);
     }
     
     return result;

  }, [initialProducts, searchQuery, selectedCategory, sortOption]);

  if (isLoading) {
    return <ProductListingSkeleton />;
  }

  return (
    <PageContainer className="py-2 sm:py-4 flex flex-col md:flex-row gap-0 sm:gap-4 items-start relative pointer-events-auto">
       
       {/* Desktop Sidebar OR Active Mobile Sidebar Modal */}
       <div 
         className={`
           shrink-0 md:w-[280px] 
           ${showMobileFilters ? "fixed inset-0 z-50 bg-white overflow-y-auto px-4 pt-16 pb-20" : "hidden md:block"}
         `}
       >
         {showMobileFilters && (
            <div className="absolute top-0 flex items-center justify-between w-full left-0 p-4 border-b border-gray-200">
               <span className="font-medium text-lg uppercase text-gray-800">Filters</span>
               <button onClick={() => setShowMobileFilters(false)} className="text-gray-500 font-bold p-2 text-xl" aria-label="Close Filters">✕</button>
            </div>
         )}
         <SidebarFilters 
           selectedCategory={selectedCategory} 
           onCategoryChange={(cat) => {
             setSelectedCategory(cat);
             if (showMobileFilters) setShowMobileFilters(false); // Auto close modal
           }} 
         />
       </div>

       {/* Mobile Sticky Footer Toggler */}
       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex items-center shadow-[0_-8px_10px_-1px_rgba(0,0,0,0.05)] z-40 h-[50px]">
          <button 
             className="flex-1 flex items-center justify-center gap-2 font-medium text-[14px] text-gray-800 border-r border-gray-200 h-full uppercase"
             aria-haspopup="dialog"
             aria-label="Filter products"
             onClick={() => setShowMobileFilters(true)}
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" /></svg>
             Filters
          </button>
          
          <div className="flex-1 flex items-center justify-center font-medium text-[14px] text-gray-800 h-full uppercase relative">
             <select 
               className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
               value={sortOption}
               aria-label="Sort products"
               onChange={(e) => setSortOption(e.target.value)}
             >
                <option value="relevance">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
             </select>
             <div className="flex items-center gap-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
                Sort
             </div>
          </div>
       </div>

       {/* Grid Canvas */}
       <div className="flex-1 w-full pb-[60px] md:pb-0 px-2 sm:px-0">
         <ProductGridContainer 
           products={filteredAndSortedProducts} 
           sortOption={sortOption} 
           onSortChange={setSortOption} 
           searchQuery={searchQuery}
         />
       </div>

    </PageContainer>
  );
}
