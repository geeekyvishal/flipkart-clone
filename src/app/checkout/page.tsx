"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartSummary } from "@/components/cart/CartSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlipkartLoader } from "@/components/shared/FlipkartLoader";
import { PageContainer } from "@/components/layout/PageContainer";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Security redirect if Cart is empty to avoid phantom order generation
    if (mounted && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [mounted, cartItems.length, router]);

  if (!mounted || cartItems.length === 0) {
    return (
      <main className="bg-white min-h-[calc(100vh-64px)] flex justify-center items-center">
         <FlipkartLoader />
      </main>
    );
  }

  return (
    <main className="bg-white min-h-[calc(100vh-64px)] py-4">
      <PageContainer>
         <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
            
            {/* Left Box: Form Sequence */}
            <div className="w-full lg:w-[65%] gap-4 flex flex-col pt-0">
               {/* Login Mock Block */}
               <div className="bg-white p-4 shadow-sm border border-gray-100 flex items-center gap-4 rounded-sm">
                 <span className="bg-gray-100 text-gray-500 font-bold w-6 h-6 flex items-center justify-center rounded-sm text-sm">1</span>
                 <div>
                    <h2 className="text-gray-500 font-medium uppercase text-[15px] flex items-center gap-2">Login <span className="text-[var(--color-success)] ml-2 text-xl">✓</span></h2>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-1">Vishal Singh <span className="font-normal text-gray-500 ml-2">+91 9876543210</span></p>
                 </div>
               </div>

               {/* Active Address Block */}
               <CheckoutForm />

               {/* Ordered Items */}
               <div className="bg-white shadow-sm border border-gray-100 rounded-sm">
                 <div className="bg-[var(--color-brand)] p-3 flex items-center gap-3 rounded-t-sm">
                   <span className="bg-white text-[var(--color-brand)] font-bold w-6 h-6 flex items-center justify-center rounded-sm text-sm">3</span>
                   <h2 className="text-white font-medium uppercase text-sm">Order Summary</h2>
                 </div>
                 <div className="flex flex-col">
                    {cartItems.map((item) => (
                       <CartItemRow key={item.id} item={item} />
                    ))}
                 </div>
               </div>

               {/* Payments Mock Block */}
               <div className="bg-white p-4 shadow-sm border border-gray-100 flex items-center gap-4 rounded-sm opacity-60">
                 <span className="bg-gray-100 text-gray-500 font-bold w-6 h-6 flex items-center justify-center rounded-sm text-sm">4</span>
                 <h2 className="text-gray-500 font-medium uppercase text-[15px]">Payment Options</h2>
               </div>
            </div>

            {/* Right Box: Math Summary strictly hiding the "Place Order" button */}
            <div className="w-full lg:w-[35%]">
               <CartSummary hideButton={true} />
            </div>
         </div>
      </PageContainer>
    </main>
  );
}
