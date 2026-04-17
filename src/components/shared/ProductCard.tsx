"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useEffect, useState } from "react";

type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  numericPrice?: number;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  reviews?: number;
  image: string;
};

export function ProductCard({ id, title, price, numericPrice, oldPrice, discount, rating, reviews, image }: ProductCardProps) {
  const toggleItem = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isLoved = mounted ? isInWishlist(id) : false;

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault(); // prevent link navigation
    const nPrice = numericPrice || Number(price.replace(/[^0-9]/g, ''));
    toggleItem({ id, title, price, numericPrice: nPrice, oldPrice, discount, rating, reviews, image });
  }

  return (
    <Link href={`/product/${id}`} className="block h-full cursor-pointer">
      <div className="group bg-white border border-[var(--color-divider)] rounded-xl p-3 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative h-full">
        
      {/* Wishlist Button */}
      <button 
        aria-label="Add to Wishlist"
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 z-10 transition-colors"
      >
        <Heart className={`w-5 h-5 ${isLoved ? 'fill-red-500 text-red-500' : ''}`} aria-hidden="true" />
      </button>

        {/* Product Image Wrapper */}
        <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details section */}
        <div className="flex flex-col gap-1 mt-2 flex-1">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1">{title}</h3>
          
          {/* Rating and Reviews */}
          {rating && (
            <div className="flex items-center gap-1.5 text-[12px]">
              <div className="flex items-center gap-0.5 bg-[var(--color-success)] text-white px-1.5 py-[2px] rounded font-bold">
                <span>{rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
              <span className="text-[var(--color-muted)] font-medium">({reviews?.toLocaleString()})</span>
              {/* Assured Badge Mock */}
              <span className="inline-block ml-1">
                 <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-4 object-contain" />
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-center gap-2 mt-auto pt-1">
            <span className="text-[16px] font-bold text-[var(--color-text-primary)]">{price}</span>
            {oldPrice && <span className="text-[14px] text-[var(--color-muted)] line-through">{oldPrice}</span>}
            {discount && <span className="text-[14px] font-bold text-[var(--color-success)]">{discount}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
