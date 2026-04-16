export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { ProductListingClient } from "@/components/products/ProductListingClient";
import { ProductListingSkeleton } from "@/components/products/ProductListingSkeleton";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Products | Flipkart Clone",
  description: "Browse all items",
};

export default async function ProductsPage() {
  let products: any[] = [];
  try {
     console.log("[Products] Fetching products. DATABASE_URL is defined:", !!process.env.DATABASE_URL);
     const dbProducts = await prisma.product.findMany();
     console.log(`[Products] Prisma query returned ${dbProducts?.length} products.`);
     if (dbProducts) products = dbProducts;
  } catch (error) {
     console.error("Database fetch failed on Products page:", error);
  }

  if (products.length === 0) {
    return (
      <main className="bg-white min-h-[calc(100vh-64px)] flex items-center justify-center">
         <div className="text-center p-8 bg-gray-50 rounded-lg max-w-md border border-gray-200 shadow-sm mt-10">
            <h2 className="text-[20px] font-bold text-gray-800 mb-2">No Products Available</h2>
            <p className="text-[14px] text-gray-600">The database query returned 0 products. Please verify your Vercel Database Connection and ensure `DATABASE_URL` matches your seeded Supabase project.</p>
         </div>
      </main>
    );
  }

  return (
    <Suspense fallback={<ProductListingSkeleton />}>
       <div className="bg-white min-h-screen">
          <ProductListingClient initialProducts={products} />
       </div>
    </Suspense>
  );
}
