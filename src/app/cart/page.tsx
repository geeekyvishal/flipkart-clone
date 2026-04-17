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
  const savedItems = useCartStore((state) => state.savedItems) || [];

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

  // Render isolated empty state if cart array is totally blank (and no saved items)
  if (items.length === 0 && savedItems.length === 0) {
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
            
            {/* Left Column (Items & Saved) */}
            <div className="w-full lg:w-[65%] flex flex-col gap-4">
              
              {/* Active Cart Box */}
              <div className="w-full flex flex-col pt-0 shadow-sm md:rounded-sm overflow-hidden border border-gray-100/50 bg-white">
                 <div className="bg-white p-4 border-b border-gray-100 shadow-sm flex items-center justify-between">
                    <h2 className="text-[18px] font-medium text-[var(--color-text-primary)]">
                      Flipkart ({items.length})
                    </h2>
                    <button 
                      onClick={() => useCartStore.getState().clearCart()} 
                      className="text-[14px] font-medium text-[var(--color-brand)] uppercase hover:text-blue-700 active:scale-95 transition-all"
                    >
                      Clear Cart
                    </button>
                 </div>
                 
                 {items.length === 0 ? (
                    <div className="p-8">
                       <EmptyCart />
                    </div>
                 ) : (
                    <div className="flex flex-col bg-white">
                      {items.map(item => (
                         <CartItemRow key={item.id} item={item} />
                      ))}
                    </div>
                 )}

                 {/* Place Order CTA */}
                 {items.length > 0 && (
                   <div className="bg-white p-4 md:p-6 shadow-[-5px_-5px_10px_rgba(0,0,0,0.02)] flex justify-end sticky bottom-0 md:static border-t border-gray-100 z-40">
                      <Link href="/checkout" className="w-[180px] md:w-[250px] block">
                         <button className="hidden md:block w-full bg-[var(--color-orange-btn)] hover:bg-[#F25A12] text-white py-4 rounded-sm font-medium text-[16px] uppercase transition-colors shadow-sm">
                            Place Order
                         </button>
                      </Link>
                   </div>
                 )}
              </div>

              {/* Saved For Later Block */}
              {savedItems.length > 0 && (
                <div className="w-full flex flex-col shadow-sm md:rounded-sm overflow-hidden border border-gray-100/50 bg-white">
                  <div className="bg-white p-4 border-b border-gray-100 shadow-sm flex items-center justify-between">
                    <h2 className="text-[18px] font-medium text-[var(--color-text-primary)]">
                      Saved For Later ({savedItems.length})
                    </h2>
                  </div>
                  <div className="flex flex-col bg-white">
                    {savedItems.map(item => (
                      <CartItemRow key={item.id} item={item} isSavedForLater={true} />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Math Panel */}
            <div className="w-full lg:w-[35%] flex flex-col gap-4 sticky top-24">
               {items.length > 0 && <CartSummary />}
            </div>

         </div>
      </PageContainer>
    </main>
  );
}
