export const revalidate = 3600;
import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  let product = null;
  if (!isNaN(productId)) {
    try {
       product = await prisma.product.findUnique({ where: { id: productId }});
    } catch (error) {
       console.error("Metadata fetch failed:", error);
    }
  }

  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.title} | Flipkart Clone`,
    description: product.description || `Buy ${product.title} online`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  let product = null;
  if (!isNaN(productId)) {
    try {
       product = await prisma.product.findUnique({ where: { id: productId }});
    } catch (error) {
       console.error("Database fetch failed on Product page:", error);
    }
  }

  if (!product) {
    notFound(); 
  }

  const p = product as any;

  return <ProductPageClient productData={p} />;
}
