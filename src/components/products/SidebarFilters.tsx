"use client";

import { useMemo } from "react";

type SidebarFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export function SidebarFilters({ selectedCategory, onCategoryChange }: SidebarFiltersProps) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Appliances",
    "Home",
    "Beauty",
    "Travel"
  ];

  return (
    <aside className="w-full md:w-[260px] bg-white border border-[var(--color-divider)] rounded-sm shrink-0 flex flex-col p-4 shadow-sm h-fit sticky top-[140px]">
       <div className="border-b border-gray-100 pb-3 mb-3">
          <h2 className="text-lg font-medium text-[var(--color-text-primary)]">Filters</h2>
       </div>

       <div>
         <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] uppercase mb-3">Categories</h3>
         <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => onCategoryChange(cat)}
                  className="w-4 h-4 text-[var(--color-brand)] border-gray-300 focus:ring-[var(--color-brand)]"
                />
                <span className={`text-[14px] group-hover:text-[var(--color-brand)] transition-colors ${selectedCategory === cat ? 'font-medium' : 'text-[var(--color-text-secondary)]'}`}>
                  {cat}
                </span>
              </label>
            ))}
         </div>
       </div>

       <div className="border-b border-gray-100 pb-3 mb-3 mt-4" />

       {/* Visual filler for accurate UI clone */}
       <div>
         <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] uppercase mb-3">Customer Ratings</h3>
         <div className="flex flex-col gap-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-[var(--color-brand)] border-gray-300 focus:ring-[var(--color-brand)]" />
                <span className="text-[14px] text-[var(--color-text-secondary)]">{rating}★ & above</span>
              </label>
            ))}
         </div>
       </div>

    </aside>
  );
}
