"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function SuccessView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || orderId === "UNKNOWN") {
      setLoading(false);
      return;
    }
    
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.order) setOrder(data.order);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch order", err);
        setLoading(false);
      });
  }, [orderId]);
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

      <div className="bg-gray-50 border border-gray-200 rounded px-6 py-3 mb-6 mt-2">
        <span className="text-[14px] text-[var(--color-text-secondary)] uppercase font-medium">Order ID:</span>
        <span className="text-[16px] text-gray-900 font-bold ml-2 tracking-wide">{orderId}</span>
      </div>

      {loading ? (
         <div className="w-full text-center py-4 text-gray-500 mb-6">Loading order details...</div>
      ) : order && order.items ? (
         <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-sm mb-8 text-left shadow-sm">
           <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-sm flex justify-between items-center">
             <h3 className="font-medium text-gray-800">Order Summary</h3>
             <span className="text-[var(--color-brand)] font-bold">₹{order.totalAmount?.toLocaleString()}</span>
           </div>
           <div className="flex flex-col divide-y divide-gray-100">
             {order.items.map((item: any, idx: number) => (
               <div key={idx} className="p-4 flex gap-4">
                  <div className="w-16 h-16 shrink-0 bg-white border border-gray-100 rounded-sm">
                     <img src={item.product?.image || item.product?.images?.[0]} alt={item.product?.title} className="w-full h-full object-contain p-1 mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.product?.title || "Product"}</h4>
                     <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                       <span>Qty: {item.quantity}</span>
                       <span className="font-medium text-gray-800">₹{(item.pricePaid * item.quantity).toLocaleString()}</span>
                     </div>
                  </div>
               </div>
             ))}
           </div>
           <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-sm flex flex-col gap-1 text-sm">
             <p><span className="text-gray-500">Delivering to:</span> <span className="font-medium text-gray-800">{order.fullName}</span></p>
             <p className="text-gray-600 truncate">{order.address}, {order.city} - {order.pincode}</p>
           </div>
         </div>
      ) : null}

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
