"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Using 7 local images mathematically cloned carefully to permit perfect sliding bounds
const baseImages = [
  "/carousal-img/1.png",
  "/carousal-img/2.png",
  "/carousal-img/3.png",
  "/carousal-img/4.png",
  "/carousal-img/5.png",
  "/carousal-img/6.png",
  "/carousal-img/7.png",
];

// Replicate arrays to allow absolute infinite shifts left or right smoothly
const extendedImages = [...baseImages, ...baseImages, ...baseImages];

export function HeroBanner() {
  // Start array index in the exact middle of the extended array block
  const [currentIndex, setCurrentIndex] = useState(baseImages.length); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // Drag Mechanics
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (dragStartX !== null) return; // Pause auto-slide while dragging natively
    
    const timer = setInterval(() => {
       handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [dragStartX, currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Safe cyclic resets when hitting boundary of extended array (creates the infinite scroll optical effect)
  useEffect(() => {
     if (currentIndex >= baseImages.length * 2) {
       setTimeout(() => {
         setIsTransitioning(false); // remove CSS animation string temporarily
         // Instantly snap the container exactly back to the identical center frame block
         setCurrentIndex(currentIndex - baseImages.length);
       }, 500); // 500ms bounds matches the duration-500 css transition exactly so you never notice it
     }
     
     if (currentIndex <= 0) {
       setTimeout(() => {
         setIsTransitioning(false);
         setCurrentIndex(currentIndex + baseImages.length);
       }, 500);
     }
  }, [currentIndex]);

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsTransitioning(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragStartX(clientX);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (dragStartX === null) return;
    setIsTransitioning(true);
    
    // Swipe Threshold calculations (50px to trigger slide shift)
    if (dragOffset > 50) {
      setCurrentIndex((prev) => prev - 1);
    } else if (dragOffset < -50) {
      setCurrentIndex((prev) => prev + 1);
    }
    
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <section className="w-full relative py-1 mb-4 group bg-white">
      <div 
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* Dynamic sliding container tracking explicit pixel gaps rendering 2.5 limits */}
        <div 
          className="flex gap-4 w-full"
          style={{ 
             // width mappings: 42% card size + 1rem geometric fixed gap
             transform: `translateX(calc(-${currentIndex} * (42% + 1rem) + ${dragOffset}px))`,
             transition: isTransitioning ? "transform 500ms ease-out" : "none"
          }}
        >
          {extendedImages.map((src, idx) => {
            return (
              <div 
                key={idx}
                className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[42%] rounded-[14px] overflow-hidden pointer-events-none bg-gray-50 flex"
              >
                <img
                  src={src}
                  alt={`Banner ${idx}`}
                  className="w-full h-auto object-contain opacity-[0.98] transition-opacity"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots beneath active UI boundaries exactly mirroring authentic geometric padding */}
      <div className="absolute -bottom-3 left-0 right-0 flex justify-center items-center gap-[6px] z-20">
        {baseImages.map((_, dotIdx) => {
          const isActive = dotIdx === (currentIndex % baseImages.length);
          return (
            <div
              key={dotIdx}
              className={`transition-all duration-300 rounded-full ${
                isActive 
                  ? "w-[16px] h-[5px] bg-[#666666]" 
                  : "w-[5px] h-[5px] bg-[#C1C1C1]"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
