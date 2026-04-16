
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductActions } from "@/components/product/ProductActions";
import { prisma } from "@/lib/prisma";
import { PageContainer } from "@/components/layout/PageContainer";

type PageProps = {
  params: Promise<{ id: string }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  
  const product = await prisma.product.findUnique({ where: { id: productId }});

  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.title} | Flipkart Clone`,
    description: product.description || `Buy ${product.title} online`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  
  const product = await prisma.product.findUnique({ where: { id: productId }});

  if (!product) {
    notFound(); 
  }

  const p = product as any;

  return (
    <main className="bg-[var(--color-page-bg)] py-4 flex-1">
      <PageContainer>
        
        <div className="bg-white rounded-sm shadow-sm flex flex-col lg:flex-row shadow-sm">
          
          <div className="w-full lg:w-[45%] flex flex-col p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
             <div className="sticky top-[80px]">
                <ProductGallery images={p.images || []} />
                <ProductActions inStock={p.inStock} productData={p} />
             </div>
          </div>
          
          <div className="w-full lg:w-[55%] flex flex-col p-4 md:p-6 lg:p-8">
             <ProductInfo 
                title={p.title}
                rating={p.rating}
                reviews={p.reviews}
                price={p.price}
                oldPrice={p.oldPrice}
                discount={p.discount}
                inStock={p.inStock}
             />
             <ProductSpecs 
                description={p.description || undefined}
                specs={typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs}
             />
          </div>

        </div>

      </PageContainer>
    </main>
  );
}
