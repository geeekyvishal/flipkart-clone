import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="bg-white m-4 md:m-8 rounded-sm shadow-sm py-16 flex flex-col items-center justify-center">
      <img 
        src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
        alt="Empty Cart" 
        className="w-[200px] h-auto object-contain mb-6"
      />
      <h2 className="text-[18px] font-medium text-[var(--color-text-primary)] mb-2">
         Your cart is empty!
      </h2>
      <p className="text-[14px] text-[var(--color-text-secondary)] mb-6">
         Add items to it now.
      </p>
      <Link href="/">
         <button className="bg-[var(--color-brand)] hover:shadow-lg transition-shadow text-white px-16 py-3 rounded-sm font-medium shadow-sm">
            Shop now
         </button>
      </Link>
    </div>
  );
}
