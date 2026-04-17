"use client";

import Link from "next/link";
import { Home, Grip, UserCircle, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore(state => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalCartQuantity = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] flex items-center justify-between px-6 py-2 pb-safe">
      
      <Link href="/" className="flex flex-col items-center gap-1 cursor-pointer">
        <Home className={`w-6 h-6 ${pathname === '/' ? 'text-[#2874F0]' : 'text-gray-600'}`} fill={pathname === '/' ? '#2874F0' : 'none'} strokeWidth={pathname === '/' ? 2 : 1.5} />
        <span className={`text-[11px] font-medium ${pathname === '/' ? 'text-[#2874F0]' : 'text-gray-600'}`}>Home</span>
      </Link>

      <div className="flex flex-col items-center gap-1 cursor-pointer">
        <Grip className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-gray-600">Categories</span>
      </div>

      <div className="flex flex-col items-center gap-1 cursor-pointer">
        <UserCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-gray-600">Account</span>
      </div>

      <Link href="/cart" className="flex flex-col items-center gap-1 cursor-pointer relative">
        <ShoppingCart className={`w-6 h-6 ${pathname?.startsWith('/cart') ? 'text-[#2874F0]' : 'text-gray-600'}`} fill={pathname?.startsWith('/cart') ? '#2874F0' : 'none'} strokeWidth={pathname?.startsWith('/cart') ? 2 : 1.5} />
        
        {totalCartQuantity > 0 && (
          <div className="absolute -top-1 -right-2 bg-[#ff6161] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
            {totalCartQuantity}
          </div>
        )}
        
        <span className={`text-[11px] font-medium ${pathname?.startsWith('/cart') ? 'text-[#2874F0]' : 'text-gray-600'}`}>Cart</span>
      </Link>

    </div>
  );
}
