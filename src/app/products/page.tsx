import { Suspense } from "react";
import { ProductListingClient } from "@/components/products/ProductListingClient";
import { ProductListingSkeleton } from "@/components/products/ProductListingSkeleton";
import { allProducts } from "@/lib/dummy-data";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Products | Flipkart Clone",
  description: "Browse all items",
};

export default async function ProductsPage() {
  
  let products = [];
  try {
     const dbProducts = await prisma.product.findMany();
     if (dbProducts.length > 0) {
        products = dbProducts;
     } else {
        products = allProducts;
     }
  } catch (error) {
     console.warn("Postgres logic skipped! Using Dummy Data fallback.");
     products = allProducts;
  }

  return (
    <Suspense fallback={<ProductListingSkeleton />}>
       <div className="bg-white min-h-screen">
          <ProductListingClient initialProducts={products} />
       </div>
    </Suspense>
  );
}
