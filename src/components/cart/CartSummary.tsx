import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export function CartSummary({ hideButton = false }: { hideButton?: boolean }) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalDiscount = useCartStore((state) => state.getTotalDiscount);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const discount = getTotalDiscount();
  const finalAmount = totalPrice - discount;

  return (
    <div className="flex flex-col bg-white border-t md:border border-gray-200 mt-4 md:mt-0 md:rounded-sm shadow-sm sticky top-[140px]">
      <div className="px-5 py-3 border-b border-gray-100 hidden md:block">
         <h3 className="text-[16px] font-medium text-[var(--color-text-secondary)] uppercase">Price Details</h3>
      </div>
      
      <div className="p-5 flex flex-col gap-4">
         <div className="flex justify-between text-[16px] text-gray-800">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalPrice.toLocaleString()}</span>
         </div>
         <div className="flex justify-between text-[16px] text-gray-800">
            <span>Discount</span>
            <span className="text-[var(--color-success)] font-medium">- ₹{discount.toLocaleString()}</span>
         </div>
         <div className="flex justify-between text-[16px] text-gray-800">
            <span>Delivery Charges</span>
            <span className="text-[var(--color-success)] font-medium">Free</span>
         </div>
         
         <div className="border-t border-dashed border-gray-300 my-1"></div>
         
         <div className="flex justify-between text-[18px] font-bold text-gray-900">
            <span>Total Amount</span>
            <span>₹{finalAmount.toLocaleString()}</span>
         </div>
         
         <div className="border-t border-dashed border-gray-300 my-1"></div>

         <div className="text-[16px] font-medium text-[var(--color-success)]">
            You will save ₹{discount.toLocaleString()} on this order
         </div>
      </div>

      {!hideButton && (
        <div className="p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none flex items-center justify-between md:block sticky bottom-0 z-50">
           <div className="md:hidden flex flex-col">
              <span className="text-[18px] font-bold text-gray-900">₹{finalAmount.toLocaleString()}</span>
              <span className="text-[12px] text-[var(--color-brand)] font-medium">View price details</span>
           </div>
           <Link href="/checkout" className="w-[180px] md:w-full block">
              <button className="w-full bg-[var(--color-orange-btn)] hover:bg-[#F25A12] text-white py-3 md:py-4 rounded-sm font-medium text-[16px] uppercase shadow-sm transition-colors">
                 Place Order
              </button>
           </Link>
        </div>
      )}

    </div>
  );
}
