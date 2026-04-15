type ProductInfoProps = {
  title: string;
  rating?: number;
  reviews?: number;
  price: string;
  oldPrice?: string;
  discount?: string;
  inStock?: boolean;
};

export function ProductInfo({ title, rating, reviews, price, oldPrice, discount, inStock }: ProductInfoProps) {
  return (
    <div className="flex flex-col border-b border-gray-200 pb-5 mb-5">
       <h1 className="text-[18px] md:text-[22px] font-medium text-[var(--color-text-primary)] leading-tight mb-2">
         {title}
       </h1>

       {rating && (
         <div className="flex items-center gap-2 mb-3">
           <div className="flex items-center gap-1 bg-[var(--color-success)] text-white px-2 py-0.5 rounded font-bold text-[13px]">
             <span>{rating}</span>
             <span className="text-[10px]">★</span>
           </div>
           <span className="text-gray-500 font-medium text-[14px]">
             {reviews?.toLocaleString()} Ratings & Reviews
           </span>
           <img 
             src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
             alt="assured" 
             className="h-[20px] object-contain ml-2" 
           />
         </div>
       )}

       <div className="flex items-end gap-3 mb-1">
         <span className="text-[28px] font-medium text-[var(--color-text-primary)] leading-none">{price}</span>
         {oldPrice && (
           <span className="text-[16px] text-[#878787] line-through leading-none pb-0.5">{oldPrice}</span>
         )}
         {discount && (
           <span className="text-[16px] font-medium text-[var(--color-success)] leading-none pb-0.5">{discount}</span>
         )}
       </div>

       {inStock !== undefined && (
          <div className="mt-3">
             <span className={`text-[14px] font-bold ${inStock ? "text-[var(--color-success)]" : "text-red-500"}`}>
               {inStock ? "In Stock" : "Out of Stock"}
             </span>
          </div>
       )}

       {/* Offers mock */}
       <div className="mt-6">
         <h4 className="text-[15px] font-medium mb-3">Available offers</h4>
         <ul className="flex flex-col gap-2 text-[14px]">
           <li className="flex items-start gap-2">
             <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-[18px] h-[18px] object-contain mt-0.5" />
             <span><span className="font-bold">Bank Offer:</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <a className="text-[#2874F0] font-medium cursor-pointer">T&C</a></span>
           </li>
           <li className="flex items-start gap-2">
             <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-[18px] h-[18px] object-contain mt-0.5" />
             <span><span className="font-bold">Partner Offer:</span> Make a purchase and enjoy a surprise cashback/ coupon that you can redeem later! <a className="text-[#2874F0] font-medium cursor-pointer">Know More</a></span>
           </li>
         </ul>
       </div>
    </div>
  );
}
