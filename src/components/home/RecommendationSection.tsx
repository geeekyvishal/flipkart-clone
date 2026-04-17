"use client";

import Link from "next/link";
import { useRef } from "react";

type RecommendationProps = {
  products: any[];
};

export function RecommendationSection({ products }: RecommendationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#EAF5FF] to-[#F8E9FF] rounded-[18px] p-4 md:p-5 shadow-sm relative group">
      <h2 className="text-[24px] md:text-[28px] font-bold text-[var(--color-text-primary)] mb-4 md:mb-5">
        Still looking for these?
      </h2>

      {/* Left Arrow - Matches standard Flipkart shadow drawer */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-[55%] -translate-y-1/2 w-10 h-20 bg-white/95 shadow-[4px_0_12px_rgba(0,0,0,0.1)] flex items-center justify-center rounded-r-md z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700 mr-1">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow - Floating Circular button matching the user's screenshot exactly */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-[55%] -translate-y-1/2 w-[46px] h-[46px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] flex items-center justify-center rounded-full z-10 transition-transform hover:scale-105 hidden md:flex cursor-pointer"
      >
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[20px] h-[20px] text-gray-800 ml-0.5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-6 -mb-4 scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id}
            className="block"
          >
            <div 
              className="w-[200px] md:w-[220px] shrink-0 bg-white/70 backdrop-blur-sm rounded-2xl p-2 cursor-pointer hover:-translate-y-1 transition-transform border border-white/50 shadow-sm group"
            >
              <div className="bg-white w-full h-[160px] md:h-[180px] rounded-xl overflow-hidden p-3 relative">
                 <img 
                   src={product.image} 
                   alt={product.title} 
                   className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                 />
              </div>
              
              <div className="px-2 pt-3 pb-1 text-center">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                <p className="text-sm font-bold text-gray-900 mt-1">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
