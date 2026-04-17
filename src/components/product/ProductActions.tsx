"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductActions({ inStock, productData }: { inStock?: boolean; productData: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(productData);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(productData);
    router.push("/checkout");
  };

  return (
    <div className="flex gap-2 mt-4 md:mt-6 sticky bottom-0 bg-white p-3 md:p-0 border-t md:border-none border-gray-200 z-50">
      <button 
        onClick={handleAddToCart}
        disabled={inStock === false || added}
        className="flex-1 md:flex-none md:w-[50%] h-[50px] bg-[var(--color-yellow-btn)] hover:bg-[#F39900] disabled:opacity-80 disabled:cursor-not-allowed text-white font-medium text-[16px] rounded-sm flex items-center justify-center gap-2 transition-colors uppercase shadow-sm"
      >
        <ShoppingCart className="w-5 h-5 fill-current" />
        {added ? "Added!" : "Add to Cart"}
      </button>

      <button 
        onClick={handleBuyNow}
        disabled={inStock === false}
        className="flex-1 md:flex-none md:w-[50%] h-[50px] bg-[var(--color-orange-btn)] hover:bg-[#F25A12] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-[16px] rounded-sm flex items-center justify-center gap-2 transition-colors uppercase shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
           <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        Buy Now
      </button>
    </div>
  );
}
