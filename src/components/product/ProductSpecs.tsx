type ProductSpecsProps = {
  description?: string;
  specs?: Record<string, string>;
};

export function ProductSpecs({ description, specs }: ProductSpecsProps) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-sm p-5 md:p-6 mb-6">
       
       {description && (
         <div className="mb-8">
            <h3 className="text-[20px] font-medium text-[var(--color-text-primary)] mb-4">Description</h3>
            <p className="text-[14px] text-[var(--color-text-primary)] leading-relaxed">
              {description}
            </p>
         </div>
       )}

       {specs && Object.keys(specs).length > 0 && (
         <div>
            <h3 className="text-[20px] font-medium text-[var(--color-text-primary)] mb-4">Specifications</h3>
            
            <div className="border border-gray-100 rounded-sm overflow-hidden">
               <h4 className="bg-gray-50 text-[16px] font-medium px-4 py-3 border-b border-gray-100 uppercase text-gray-800">
                  General
               </h4>
               <ul className="divide-y divide-gray-100">
                  {Object.entries(specs).map(([key, value]) => (
                    <li key={key} className="flex flex-col sm:flex-row px-4 py-3">
                       <span className="w-full sm:w-[30%] text-[14px] text-[var(--color-text-secondary)] mb-1 sm:mb-0">
                         {key}
                       </span>
                       <span className="w-full sm:w-[70%] text-[14px] text-[var(--color-text-primary)] font-medium">
                         {value}
                       </span>
                    </li>
                  ))}
               </ul>
            </div>
         </div>
       )}

    </div>
  );
}
