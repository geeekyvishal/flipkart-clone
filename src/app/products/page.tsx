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
     const dbProducts = await prisma.product.findMany();
     if (dbProducts) products = dbProducts;
  } catch (error) {
     console.error("Database fetch failed on Products page:", error);
  }

  return (
    <Suspense fallback={<ProductListingSkeleton />}>
       <div className="bg-white min-h-screen">
          <ProductListingClient initialProducts={products} />
       </div>
    </Suspense>
  );
}
