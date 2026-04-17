import { SearchBar } from "./SearchBar";
import { CategoryNav } from "./CategoryNav";
import { 
  User, MoreVertical, Menu, MapPin, 
  ChevronDown, Package, Ticket, Zap, 
  Sparkles, Wallet, Heart, Gift, 
  Bell, LogOut, UserCircle, Store, Headphones, Presentation
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CartAction } from "@/components/cart/CartAction";
import { PageContainer } from "@/components/layout/PageContainer";

export function Navbar() {
  return (
    <header className="flex flex-col w-full sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="bg-white w-full hidden md:block">
        <PageContainer>
          <div className="flex flex-col w-full py-4 gap-4">
            
            {/* ================================================== */}
            {/* ROW 1: Logo, Sub-Pills, Address, Coins             */}
            {/* ================================================== */}
            <div className="flex items-center justify-between w-full h-[32px]">
              
              {/* Left Group: Logo & Actions */}
              <div className="flex items-center gap-3 md:gap-4">
                <button className="md:hidden p-1 text-black">
                  <Menu className="w-6 h-6" />
                </button>
                
                {/* 1. Flipkart Logo Pill */}
                <Link href="/" className="flex items-center justify-center bg-[#FFE500] rounded-xl h-[36px] px-4 cursor-pointer hover:bg-[#FFD54F] transition-colors">
                  <div className="flex items-center gap-1.5">
                     <span className="font-bold text-black italic text-[17px] tracking-tight">Flipkart</span>
                     {/* Authentic plus icon mock */}
                     <span className="text-[12px] font-medium text-gray-700 italic">Explore <span className="text-[#2874F0] font-bold">Plus</span></span>
                  </div>
                </Link>

                {/* 2. EMI Pill */}
                <div className="hidden lg:flex items-center bg-[#F1F2F4] rounded-xl h-[36px] px-3 cursor-pointer hover:bg-gray-200 transition-colors gap-1.5">
                   <div className="w-5 h-5 bg-[#2874F0] rounded-full flex items-center justify-center text-[10px] text-white">₹</div>
                   <span className="text-[14px] font-medium text-black">EMI</span>
                </div>

                {/* 3. Travel Pill */}
                <div className="hidden lg:flex items-center bg-[#F1F2F4] rounded-xl h-[36px] px-3 cursor-pointer hover:bg-gray-200 transition-colors gap-1.5">
                   <span className="text-[14px]">✈️</span>
                   <span className="text-[14px] font-medium text-black">Travel</span>
                </div>
              </div>

              {/* Right Group: Address & Coins */}
              <div className="hidden md:flex items-center gap-6">
                 {/* 4. Address Section */}
                 <div className="flex items-center gap-1.5 cursor-pointer group">
                    <MapPin className="w-4 h-4 text-gray-500 group-hover:text-[#2874F0] transition-colors" />
                    <span className="text-[14px] font-medium text-black truncate max-w-[200px]">Nagpur, Maharashtra, India</span>
                 </div>
                 
                 {/* 5. Reward Coin Pill */}
                 <div className="flex items-center bg-[#F1F2F4] rounded-full h-[28px] px-2.5 gap-1.5 cursor-pointer border border-gray-200 shadow-sm">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold border border-yellow-500 text-yellow-900">⚡</div>
                    <span className="text-[13px] font-bold text-black">28</span>
                 </div>
              </div>

            </div>

            {/* ================================================== */}
            {/* ROW 2: Primary Search Bar & Major Actions          */}
            {/* ================================================== */}
            <div className="flex items-center justify-between w-full h-[52px] gap-4 lg:gap-6">
               
               {/* 1. Large Search Bar */}
               <div className="flex-1 w-full relative z-40">
                 <Suspense fallback={<div className="flex-1 w-full bg-gray-100 h-[52px] rounded-2xl animate-pulse" />}>
                    <SearchBar />
                 </Suspense>
               </div>

               {/* 2. Specific Nav Actions */}
               <div className="hidden md:flex items-center gap-2 lg:gap-5 shrink-0 pr-0 h-full z-50">
                 
                 {/* User Profile Dropdown */}
                 <div className="relative group h-full flex items-center cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl group-hover:bg-[#2874f0]/10 transition-colors h-[40px] group-hover:text-[#2874F0]">
                      <UserCircle className="w-[20px] h-[20px] text-black group-hover:text-[#2874F0] transition-colors" />
                      <span className="font-medium text-[16px] text-black group-hover:text-[#2874F0] transition-colors">Vishal</span>
                      <ChevronDown className="w-[16px] h-[16px] text-black group-hover:text-[#2874F0] group-hover:-rotate-180 transition-transform duration-300" />
                    </div>

                    {/* Highly detailed massive dropdown box mimicking native Flipkart */}
                    <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-b-xl rounded-t-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-[100]">
                       <div className="px-5 py-2 font-bold text-[14px] text-gray-800">Your Account</div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <UserCircle className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">My Profile</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Package className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Orders</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Heart className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Wishlist</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Ticket className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Coupons</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Gift className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Gift Cards</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item border-t border-gray-50">
                          <LogOut className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Logout</span>
                       </div>
                       
                    </div>
                 </div>

                 {/* More Option */}
                 <div className="relative group h-full flex items-center cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl group-hover:bg-[#2874f0]/10 transition-colors h-[40px] group-hover:text-[#2874F0]">
                       <span className="font-medium text-[16px] text-black group-hover:text-[#2874F0] transition-colors">More</span>
                       <ChevronDown className="w-[16px] h-[16px] text-black group-hover:text-[#2874F0] group-hover:-rotate-180 transition-transform duration-300" />
                    </div>

                    <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-b-xl rounded-t-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-3 z-[100]">
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] transition-colors cursor-pointer group/item">
                          <Store className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0]" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Become a Seller</span>
                       </div>
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Bell className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0]" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Notification Settings</span>
                       </div>
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Headphones className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0]" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">24x7 Customer Care</span>
                       </div>
                       <div className="flex items-center gap-4 px-5 py-[14px] hover:bg-[#F0F5FF] transition-colors cursor-pointer group/item border-t border-gray-50">
                          <Presentation className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0]" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Advertise on Flipkart</span>
                       </div>
                    </div>
                 </div>

                 {/* Cart Component logic */}
                 <CartAction />

               </div>

            </div>

          </div>
        </PageContainer>
      </div>

      {/* Mobile Navigation Header */}
      <div className="md:hidden flex flex-col bg-gradient-to-b from-[#e3f2fd] to-[#f4faff] w-full px-3 pt-3 pb-4">
         {/* Row 1: App Pillars */}
         <div className="flex items-center gap-2 w-full mb-3">
            <Link href="/" className="flex-1 bg-[#FFE500] rounded-xl flex items-center justify-center h-[44px] shadow-sm cursor-pointer">
               <span className="text-[#2874F0] text-[22px] font-black italic mr-1 mt-1 leading-none shadow-yellow-200">f</span>
               <span className="text-black font-bold italic text-[16px]">Flipkart</span>
            </Link>
            <div className="flex-1 bg-white/90 rounded-xl flex items-center justify-center h-[44px] shadow-sm cursor-pointer border border-[#E0E0E0] gap-1.5">
               <span className="text-[16px] leading-none mb-0.5">✈️</span>
               <span className="text-black font-bold italic text-[16px]">Travel</span>
            </div>
         </div>

         {/* Row 2: Location */}
         <div className="flex items-center mb-3 px-1">
            <MapPin className="w-4 h-4 text-black mr-1.5" />
            <span className="text-[13px] font-medium text-black">Location not set</span>
            <span className="text-[13px] font-medium text-[#2874F0] ml-1.5">Select delivery location &gt;</span>
         </div>

         {/* Row 3: Search Bar */}
         <div className="w-full relative z-40">
            <Suspense fallback={<div className="w-full bg-white h-[44px] rounded-xl border border-[#2874F0]" />}>
               <SearchBar />
            </Suspense>
         </div>
      </div>

      {/* Category Navigation Row */}
      <CategoryNav />
    </header>
  );
}
