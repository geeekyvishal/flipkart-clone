"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback if no images provided
  const validImages = images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-[500px]">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-auto no-scrollbar md:w-[70px] shrink-0">
         {validImages.map((img, idx) => (
           <div 
             key={idx} 
             onMouseEnter={() => setActiveIndex(idx)}
             onClick={() => setActiveIndex(idx)}
             className={cn(
               "w-16 h-16 rounded-md border-2 overflow-hidden cursor-pointer shrink-0 transition-colors bg-white",
               activeIndex === idx ? "border-[var(--color-brand)]" : "border-gray-200 hover:border-gray-300"
             )}
           >
             <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain p-1" />
           </div>
         ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border border-gray-200 rounded-md bg-white flex items-center justify-center p-4 relative group overflow-hidden">
         {/* Heart Icon placeholder */}
         <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
         </div>

         <img 
           src={validImages[activeIndex]} 
           alt="Product active view" 
           className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 cursor-crosshair" 
         />
      </div>
    </div>
  );
}
