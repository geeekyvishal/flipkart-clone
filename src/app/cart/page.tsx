"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  // Hydration safety check purely because Zustand persist syncs local storage post-mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
       <div className="bg-white min-h-screen py-4 md:py-8 flex justify-center">
          <div className="w-10 h-10 border-4 border-t-[var(--color-brand)] border-gray-200 rounded-full animate-spin"></div>
       </div>
    );
  }

  // Render isolated empty state if cart array is totally blank
  if (items.length === 0) {
    return (
       <div className="bg-white min-h-screen pb-10">
          <EmptyCart />
       </div>
    );
  }

  return (
    <main className="bg-white min-h-[calc(100vh-150px)]">
      <PageContainer className="py-4 md:py-8">
         <div className="flex flex-col lg:flex-row gap-4 items-start">
            
            {/* Left Box: Items Stack */}
            <div className="w-full lg:w-[65%] flex flex-col pt-0 shadow-sm md:rounded-sm overflow-hidden border border-gray-100/50">
               <div className="bg-white p-4 border-b border-gray-100 shadow-sm flex items-center justify-between">
                  <h2 className="text-[18px] font-medium text-[var(--color-text-primary)]">
                    Flipkart ({items.length})
                  </h2>
               </div>
               
               <div className="flex flex-col bg-white">
                 {items.map(item => (
                    <CartItemRow key={item.id} item={item} />
                 ))}
               </div>

               {/* Place Order CTA duplicated underneath logic for mobile logic parity */}
               <div className="bg-white p-4 md:p-6 shadow-[-5px_-5px_10px_rgba(0,0,0,0.02)] flex justify-end sticky bottom-0 md:static border-t border-gray-100 z-40">
                  <Link href="/checkout" className="w-[180px] md:w-[250px] block">
                     <button className="hidden md:block w-full bg-[var(--color-orange-btn)] hover:bg-[#F25A12] text-white py-4 rounded-sm font-medium text-[16px] uppercase transition-colors shadow-sm">
                        Place Order
                     </button>
                  </Link>
               </div>
            </div>

            {/* Right Box: Math Panel */}
            <div className="w-full lg:w-[35%]">
               <CartSummary />
            </div>

         </div>
      </PageContainer>
    </main>
  );
}
