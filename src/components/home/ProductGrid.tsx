import { ProductCard } from "@/components/shared/ProductCard";

export function ProductGrid({ title = "Suggested For You", products }: { title?: string, products: any[] }) {
  return (
    <section className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-[var(--color-divider)]">
       <div className="flex items-center justify-between mb-6">
         <h2 className="text-[20px] md:text-[24px] font-bold text-[var(--color-text-primary)]">{title}</h2>
         <button className="bg-[var(--color-brand)] text-white w-8 h-8 md:w-auto md:h-9 md:px-5 rounded-full md:rounded-lg font-semibold flex items-center justify-center text-sm hover:bg-blue-700 transition-colors">
            <span className="hidden md:inline">View All</span>
            <span className="md:hidden">→</span>
         </button>
       </div>
       
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
             <ProductCard key={product.id} {...product} />
          ))}
       </div>
    </section>
  );
}
