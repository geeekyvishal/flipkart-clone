export const revalidate = 3600;
import { HeroBanner } from "@/components/home/HeroBanner";
import { RecommendationSection } from "@/components/home/RecommendationSection";
import { ProductGrid } from "@/components/home/ProductGrid";

import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/layout/PageContainer";

// Render on server, validate DB state
export default async function Home() {
  let products: any[] = [];
  let dbError = "";
  try {
    console.log("[Home] Fetching products. DATABASE_URL is defined:", !!process.env.DATABASE_URL);
    if (process.env.DATABASE_URL) {
      console.log("[Home] Connection string length:", process.env.DATABASE_URL.length);
    }
    const dbProducts = await prisma.product.findMany({ take: 24 });
    console.log(`[Home] Prisma query returned ${dbProducts?.length} products.`);
    if (dbProducts) products = dbProducts;
  } catch (error: any) {
    dbError = error?.message || String(error);
    console.error("Database fetch failed on Home page:", error);
  }

  if (products.length === 0) {
    return (
      <main className="bg-white min-h-[calc(100vh-64px)] flex items-center justify-center">
         <div className="text-center p-8 bg-gray-50 rounded-lg max-w-2xl border border-red-200 shadow-sm mt-10">
            <h2 className="text-[20px] font-bold text-red-800 mb-2">No Products Available</h2>
            <p className="text-[14px] text-gray-700 font-mono text-left bg-gray-200 p-2 rounded mb-4 overflow-auto max-h-[300px]">
               {dbError ? `Error: ${dbError}` : "The database query explicitly returned 0 products."}
            </p>
            <p className="text-[14px] text-gray-600">Please verify your Vercel Database Connection and ensure `DATABASE_URL` matches your seeded Supabase project.</p>
         </div>
      </main>
    );
  }

  // Segment payload
  const recommendedProducts = products.slice(0, 6);
  const suggestedProducts = products.slice(6, 18);

  return (
    <main className="bg-white min-h-[calc(100vh-64px)] pb-10">
      <PageContainer className="py-4 flex flex-col gap-4">
        <HeroBanner />
        <RecommendationSection products={recommendedProducts} />
        <ProductGrid products={suggestedProducts} />
      </PageContainer>
    </main>
  );
}
