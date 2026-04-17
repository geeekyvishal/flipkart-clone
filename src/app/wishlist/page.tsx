"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCard } from "@/components/shared/ProductCard";
import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FlipkartLoader } from "@/components/shared/FlipkartLoader";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="bg-white min-h-[calc(100vh-64px)] flex justify-center items-center">
        <FlipkartLoader />
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-[calc(100vh-64px)] py-4">
      <PageContainer>
        <div className="bg-white min-h-[60vh] rounded-sm shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-xl font-medium text-gray-800">My Wishlist</h1>
            <span className="text-gray-500">({items.length})</span>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-32 h-32 mb-6 opacity-30">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">Empty Wishlist</h2>
              <p className="text-gray-500 text-sm mb-6">You have no items in your wishlist. Start adding!</p>
              <Link href="/products" className="bg-[var(--color-brand)] text-white px-8 py-3 rounded-sm shadow hover:shadow-md font-medium">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {items.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard 
                     id={product.id} 
                     title={product.title} 
                     price={product.price}
                     numericPrice={product.numericPrice}
                     rating={product.rating}
                     reviews={product.reviews}
                     image={product.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </main>
  );
}
