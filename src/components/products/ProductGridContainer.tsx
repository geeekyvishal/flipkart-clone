import { ProductCard } from "@/components/shared/ProductCard";

type ProductGridContainerProps = {
  products: any[];
  sortOption: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
};

export function ProductGridContainer({ products, sortOption, onSortChange, searchQuery }: ProductGridContainerProps) {
  return (
    <div className="flex-1 bg-white border border-[var(--color-divider)] rounded-sm p-4 shadow-sm min-h-[500px] flex flex-col">
       
       {/* Top Result Bar */}
       <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-3 mb-4 gap-4">
          <h1 className="text-[16px] md:text-[18px] font-medium text-[var(--color-text-primary)]">
             {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"} 
             <span className="text-[var(--color-muted)] text-[14px] ml-2">
                (Showing {products.length} products)
             </span>
          </h1>

          <div className="flex items-center gap-2">
             <span className="text-[14px] font-medium text-[var(--color-text-primary)]">Sort By</span>
             <select 
               value={sortOption}
               onChange={(e) => onSortChange(e.target.value)}
               className="border-none text-[14px] font-medium text-[var(--color-text-primary)] outline-none bg-transparent cursor-pointer 
                          hover:text-[var(--color-brand)] focus:ring-0"
             >
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price -- Low to High</option>
                <option value="price-high-low">Price -- High to Low</option>
             </select>
          </div>
       </div>

       {/* Grid or Empty State */}
       {products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
             <img 
               src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" 
               alt="No results" 
               className="w-[200px] md:w-[250px] mb-6 object-contain"
             />
             <h3 className="text-[20px] md:text-[24px] font-semibold text-[var(--color-text-primary)] mb-2">Sorry, no results found!</h3>
             <p className="text-[var(--color-text-secondary)] text-[14px]">Please check the spelling or try searching for something else.</p>
          </div>
       ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
             {products.map(p => (
                <ProductCard key={p.id} {...p} />
             ))}
          </div>
       )}

    </div>
  );
}
