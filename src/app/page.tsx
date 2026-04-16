export const dynamic = "force-dynamic";
import { HeroBanner } from "@/components/home/HeroBanner";
import { RecommendationSection } from "@/components/home/RecommendationSection";
import { ProductGrid } from "@/components/home/ProductGrid";

import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/layout/PageContainer";

// Render on server, validate DB state
export default async function Home() {
  let products: any[] = [];
  try {
    const dbProducts = await prisma.product.findMany({ take: 24 });
    if (dbProducts) products = dbProducts;
  } catch (error) {
    console.error("Database fetch failed on Home page:", error);
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
