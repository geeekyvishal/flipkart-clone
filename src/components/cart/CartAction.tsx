"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function CartAction() {
  // We use this little trick to prevent hydration mismatch errors with Zustand persist
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    
    // Auto purge stale/invalid database products from local cart on startup
    const state = useCartStore.getState();
    if (state.items.length > 0) {
      fetch('/api/products/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: state.items.map(i => i.id) })
      })
      .then(res => res.json())
      .then(data => {
         if (data.validIds !== undefined && Array.isArray(data.validIds)) {
           state.items.forEach(item => {
             if (!data.validIds.includes(item.id)) {
                console.warn(`[Cart Validation] Auto-removing invalid stale product ID: ${item.id}`);
                useCartStore.getState().removeItem(item.id);
             }
           });
         }
      })
      .catch((e) => console.error("Validation error:", e));
    }
  }, []);

  return (
    <Link href="/cart" className="flex items-center gap-2 group cursor-pointer relative">
      <ShoppingCart className="w-[20px] h-[20px] text-black group-hover:text-[#2874F0] transition-colors" />
      <span className="font-medium text-[16px] text-black group-hover:text-[#2874F0] transition-colors hidden md:block">Cart</span>
      
      {/* Dynamic Cart Badge */}
      {mounted && totalItems > 0 && (
        <span className="absolute -top-[8px] left-[10px] w-[18px] h-[18px] bg-[#ff6161] text-white text-[11px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm z-10">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
