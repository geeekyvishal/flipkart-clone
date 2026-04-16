import { Suspense } from "react";
import { ProductListingClient } from "@/components/products/ProductListingClient";
import { ProductListingSkeleton } from "@/components/products/ProductListingSkeleton";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Products | Flipkart Clone",
  description: "Browse all items",
};

export default async function ProductsPage() {
  
  const products = await prisma.product.findMany();

  return (
    <Suspense fallback={<ProductListingSkeleton />}>
       <div className="bg-white min-h-screen">
          <ProductListingClient initialProducts={products} />
       </div>
    </Suspense>
  );
}
