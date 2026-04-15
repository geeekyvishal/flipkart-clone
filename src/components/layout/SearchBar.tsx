"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Keep internal state completely synced with URL (if the user navigates back, etc.)
  useEffect(() => {
    setQuery(searchParams.get('search') || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="flex-1 w-full relative group">
      <form onSubmit={handleSearch} className="relative flex items-center w-full z-10 bg-white border-2 border-[#2874F0] rounded-2xl overflow-hidden h-[52px] shadow-sm">
        
        <button type="submit" aria-label="Search" className="pl-4 pr-3 text-gray-500 hover:text-[#2874F0] transition-colors h-full flex items-center">
           <Search className="w-[20px] h-[20px]" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, Brands and More"
          className="w-full bg-transparent outline-none border-none text-[16px] font-normal placeholder-gray-500 h-full pb-[2px]"
        />
        
      </form>
    </div>
  );
}
