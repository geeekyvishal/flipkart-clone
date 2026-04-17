"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export function CheckoutForm() {
  const clearCart = useCartStore(state => state.clearCart);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    address: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Valid 10-digit phone number required";
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = "Valid 6-digit pincode required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const state = useCartStore.getState();
      const items = state.items;

      // Final sanity validation guard
      const validationResponse = await fetch('/api/products/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: items.map(i => i.id) })
      });
      const validCheck = await validationResponse.json();

      if (validCheck.validIds) {
        const invalidIds = items.filter(i => !validCheck.validIds.includes(i.id));
        if (invalidIds.length > 0) {
          invalidIds.forEach(badItem => state.removeItem(badItem.id));
          setIsSubmitting(false);
          alert("Your cart contained outdated or unavailable products which have been auto-removed. Please review your cart and checkout again.");
          return;
        }
      }

      const totalAmount = state.getTotalPrice() - state.getTotalDiscount();

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: formData,
          items: items,
          totalAmount: totalAmount
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      router.push(`/order-success?id=${data.order.id}`);

    } catch (error: any) {
      console.error(error);
      alert(`Checkout Error: ${error.message || 'Make sure Prisma is configured correctly.'}`);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm border border-gray-100 rounded-sm">
      <div className="bg-[var(--color-brand)] p-3 rounded-sm mb-6 flex items-center gap-3">
         <span className="bg-white text-[var(--color-brand)] font-bold w-6 h-6 flex items-center justify-center rounded-sm text-sm">2</span>
         <h2 className="text-white font-medium uppercase text-sm">Delivery Address</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         {/* Name */}
         <div>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Name" 
                 value={formData.fullName}
                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                 className={`w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 outline-none focus:border-[var(--color-brand)] text-sm`} 
               />
               {errors.fullName && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.fullName}</span>}
            </div>
         </div>
         
         {/* Phone */}
         <div>
            <div className="relative">
               <input 
                 type="tel" 
                 placeholder="10-digit mobile number" 
                 value={formData.phone}
                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 outline-none focus:border-[var(--color-brand)] text-sm`} 
               />
               {errors.phone && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.phone}</span>}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         {/* Pincode */}
         <div>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Pincode" 
                 value={formData.pincode}
                 onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                 className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 outline-none focus:border-[var(--color-brand)] text-sm`} 
               />
               {errors.pincode && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.pincode}</span>}
            </div>
         </div>

         {/* City */}
         <div>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="City/District/Town" 
                 value={formData.city}
                 onChange={(e) => setFormData({...formData, city: e.target.value})}
                 className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 outline-none focus:border-[var(--color-brand)] text-sm`} 
               />
               {errors.city && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.city}</span>}
            </div>
         </div>
      </div>

      <div className="mb-8">
         <div className="relative">
            <textarea 
              placeholder="Address (Area and Street)" 
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 outline-none focus:border-[var(--color-brand)] text-sm resize-none`} 
            />
            {errors.address && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{errors.address}</span>}
         </div>
      </div>

      <button 
         type="submit" 
         disabled={isSubmitting}
         className="w-full md:w-[250px] bg-[var(--color-orange-btn)] hover:bg-[#F25A12] disabled:opacity-75 text-white py-3 md:py-4 rounded-sm font-medium text-[16px] uppercase shadow-sm transition-colors"
      >
         {isSubmitting ? "Processing..." : "Deliver Here & Checkout"}
      </button>
    </form>
  );
}
