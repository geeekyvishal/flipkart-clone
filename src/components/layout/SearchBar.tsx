"use client";

import { Search, Clock, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keep internal state completely synced with URL (if the user navigates back, etc.)
  useEffect(() => {
    setQuery(searchParams.get('search') || "");
  }, [searchParams]);

  // Load history exactly once on mount securely
  useEffect(() => {
    const saved = localStorage.getItem("flipkart_search_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Globally track mouse down to close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToHistory = (term: string) => {
    if (!term) return;
    // Push new term to origin, filter out duplicates, slice at 5 items
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("flipkart_search_history", JSON.stringify(newHistory));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    if (query.trim()) {
      saveToHistory(query.trim());
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    setIsFocused(false);
    saveToHistory(term);
    router.push(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="flex-1 w-full relative z-40" ref={dropdownRef}>
      <form onSubmit={handleSearch} className={`relative flex items-center w-full z-10 bg-[#f0f5ff] transition-all border-2 rounded-2xl overflow-hidden h-[44px] md:h-[52px] shadow-sm ${isFocused ? 'border-[#2f75ed] bg-white' : 'border-transparent md:bg-white md:border-[#2f75ed]'}`}>
        
        <button type="submit" aria-label="Search" className="pl-4 pr-3 text-gray-500 hover:text-[#2f75ed] transition-colors h-full flex items-center bg-transparent">
           <Search className="w-[20px] h-[20px]" />
        </button>

        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, Brands and More"
          className="w-full bg-transparent outline-none border-none text-[15px] md:text-[16px] font-normal placeholder-gray-500 h-full pb-[2px]"
        />
        
      </form>

      {/* History Dropdown */}
      {isFocused && history.length > 0 && (
        <div className="absolute top-[100%] left-0 w-full bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-50 py-2 mt-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {history.map((term, i) => (
            <div 
              key={i}
              onClick={() => handleHistoryClick(term)}
              className="flex items-center px-5 py-3 hover:bg-[#F5F8FF] cursor-pointer text-gray-700 transition-colors group"
            >
              <Clock className="w-[18px] h-[18px] text-gray-400 group-hover:text-[#2f75ed] transition-colors mr-3" />
              <span className="text-[15px] font-medium flex-1 text-gray-800">{term}</span>
              <button 
                title="Remove from history"
                onClick={(e) => {
                  e.stopPropagation();
                  const newHistory = history.filter(h => h !== term);
                  setHistory(newHistory);
                  localStorage.setItem("flipkart_search_history", JSON.stringify(newHistory));
                }}
                className="text-gray-300 hover:text-red-500 p-1 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all font-medium"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
