import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function SuccessView({ orderId }: { orderId: string }) {
  return (
    <div className="bg-white m-4 md:m-8 rounded-sm shadow-sm py-16 px-4 flex flex-col items-center justify-center text-center">
      
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
         <CheckCircle className="w-12 h-12 text-[var(--color-success)]" />
      </div>

      <h1 className="text-[24px] md:text-[28px] font-bold text-[var(--color-text-primary)] mb-4">
         Order placed successfully!
      </h1>
      
      <p className="text-[16px] text-[var(--color-text-secondary)] mb-2">
         Thank you for your purchase. Your order has been received and is currently being processed.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded px-6 py-3 mb-8 mt-2">
        <span className="text-[14px] text-[var(--color-text-secondary)] uppercase font-medium">Order ID:</span>
        <span className="text-[16px] text-gray-900 font-bold ml-2 tracking-wide">{orderId}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
         <Link href="/products" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[var(--color-brand)] hover:shadow-md transition-shadow text-white px-10 py-3.5 rounded-sm font-medium shadow-sm uppercase">
               Continue Shopping
            </button>
         </Link>
      </div>

    </div>
  );
}
