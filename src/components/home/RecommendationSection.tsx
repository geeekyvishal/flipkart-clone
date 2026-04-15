type RecommendationProps = {
  products: any[];
};

export function RecommendationSection({ products }: RecommendationProps) {
  return (
    <section className="bg-gradient-to-br from-[#EAF5FF] to-[#F8E9FF] rounded-[18px] p-4 md:p-5 shadow-sm">
      <h2 className="text-[24px] md:text-[28px] font-bold text-[var(--color-text-primary)] mb-4 md:mb-5">
        Still looking for these?
      </h2>
      
      <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="w-[200px] md:w-[220px] shrink-0 bg-white/70 backdrop-blur-sm rounded-2xl p-2 cursor-pointer hover:-translate-y-1 transition-transform border border-white/50 shadow-sm group"
          >
            <div className="bg-white w-full h-[160px] md:h-[180px] rounded-xl overflow-hidden p-3 relative">
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
               />
            </div>
            
            <div className="px-2 pt-3 pb-1 text-center">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
              <p className="text-sm font-bold text-gray-900 mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
