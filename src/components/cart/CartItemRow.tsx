import { useCartStore, CartItem } from "@/store/useCartStore";
import Link from "next/link";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
       {/* Image Box */}
       <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] shrink-0 mx-auto sm:mx-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
          
          {/* Mobile Stepper (optional, Flipkart places it below image often) */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:hidden">
             <button 
               onClick={() => updateQuantity(item.id, item.quantity - 1)}
               className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-lg disabled:opacity-30"
               disabled={item.quantity <= 1}
             >
               -
             </button>
             <div className="w-10 h-7 border border-gray-300 flex items-center justify-center text-sm font-medium">
               {item.quantity}
             </div>
             <button 
               onClick={() => updateQuantity(item.id, item.quantity + 1)}
               className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-lg"
             >
               +
             </button>
          </div>
       </div>

       {/* Details */}
       <div className="flex-1 flex flex-col justify-between ml-0 sm:ml-4">
          <div>
            <Link href={`/product/${item.id}`} className="hover:text-[var(--color-brand)] transition-colors">
               <h3 className="text-[16px] md:text-[18px] font-medium text-[var(--color-text-primary)] mb-1">{item.title}</h3>
            </Link>
            <p className="text-[14px] text-[var(--color-muted)] mb-3">Seller: RetailNet</p>
            
            <div className="flex items-end gap-2 mb-4 sm:mb-0">
              <span className="text-[18px] md:text-[20px] font-medium text-[var(--color-text-primary)] leading-none pb-px">₹{(item.numericPrice * item.quantity).toLocaleString()}</span>
              {/* Calculating theoretical old price back from out static logic */}
              <span className="text-[14px] text-[var(--color-muted)] line-through leading-none pb-px">₹{Math.floor(item.numericPrice * item.quantity * 1.15).toLocaleString()}</span>
              <span className="text-[14px] font-medium text-[var(--color-success)] leading-none pb-px">15% Off</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 sm:mt-6 border-t sm:border-none border-gray-100 pt-4 sm:pt-0">
             {/* Desktop Stepper */}
             <div className="hidden sm:flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-lg disabled:opacity-30 hover:bg-gray-50 cursor-pointer"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <div className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center text-sm font-medium">
                  {item.quantity}
                </div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-lg hover:bg-gray-50 cursor-pointer"
                >
                  +
                </button>
             </div>

             <button className="text-[16px] font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand)] uppercase">
                Save for later
             </button>
             <button 
               onClick={() => removeItem(item.id)}
               className="text-[16px] font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand)] uppercase"
             >
                Remove
             </button>
          </div>
       </div>

    </div>
  );
}
