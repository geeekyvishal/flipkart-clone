"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function CategoryNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger collapse when user scrolls past 30px
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { label: "For You", icon: "/img-logo/all.svg", active: true },
    { label: "Fashion", icon: "/img-logo/fashion.svg", active: false },
    { label: "Mobiles", icon: "/img-logo/mobiles.svg", active: false },
    { label: "Beauty", icon: "/img-logo/beauty.svg", active: false },
    { label: "Electronics", icon: "/img-logo/just-headphones.svg", active: false },
    { label: "Home", icon: "/img-logo/home-final.svg", active: false },
    { label: "Appliances", icon: "/img-logo/tv.svg", active: false },
    { label: "Toys, ba...", icon: "/img-logo/toy.svg", active: false },
    { label: "Food & H...", icon: "/img-logo/food.svg", active: false },
    { label: "Auto Acc...", icon: "/img-logo/auto-acc.svg", active: false },
    { label: "2 Wheele...", icon: "/img-logo/auto-new.svg", active: false },
    { label: "Sports & ...", icon: "/img-logo/sport.svg", active: false },
    { label: "Books & ...", icon: "/img-logo/books.svg", active: false },
    { label: "Furniture", icon: "/img-logo/furniture.svg", active: false },
  ];

  if (pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <div className={`bg-white hidden sm:block transition-all duration-300 ease-in-out w-full`}>
      <PageContainer>
        <div className="w-full border-t border-b border-[var(--color-divider)] border-opacity-70">
          <div 
            className={`flex items-center gap-2 lg:gap-4 overflow-x-auto overflow-y-hidden no-scrollbar justify-between w-full transition-all duration-300 ease-in-out px-1 relative ${
               isScrolled ? "h-[36px]" : "h-[90px]"
            }`}
          >
          {categories.map((category) => (
            <div
              key={category.label}
              className={`flex flex-col items-center cursor-pointer min-w-[70px] relative group whitespace-nowrap transition-transform duration-300 h-full ${
                 isScrolled ? "justify-center pb-0" : "justify-end pb-[12px]"
              } ${
                category.active
                  ? "text-black"
                  : "text-black hover:text-[#2874F0]"
              }`}
            >
              <div 
                 className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
                    isScrolled 
                      ? "h-0 opacity-0 mb-0 w-0 p-0 overflow-hidden" 
                      : `w-[50px] h-[50px] p-[10px] opacity-100 ${category.active ? 'bg-[#dff0ff] rounded-2xl mb-[4px]' : 'mb-[4px]'}`
                 }`}
              >
                 <img src={category.icon} alt={category.label} className="w-full h-full object-contain hover:scale-105 transition-transform duration-150" />
              </div>
              
              <span className={`text-[14px] leading-[16px] font-['Inter',_sans-serif] transition-all duration-300 ease-in-out ${
                 category.active ? "font-[600]" : "font-[400]"
              } ${isScrolled ? "translate-y-[1px]" : ""}`}>
                 {category.label}
              </span>
              
              {/* Specialized Flipkart active hover bracket logic mapped dynamically to pure bottom edge without breaking bounds */}
              {category.active && (
                <div className="absolute left-[10%] right-[10%] bottom-0 h-[3px] bg-[#2874F0] rounded-t-lg shadow-sm transition-all duration-300" />
              )}
            </div>
          ))}
        </div>
        </div>
      </PageContainer>
    </div>
  );
}
