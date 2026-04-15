import { SearchBar } from "./SearchBar";
import { CategoryNav } from "./CategoryNav";
import { 
  User, MoreVertical, Menu, MapPin, 
  ChevronDown, Package, Ticket, Zap, 
  Sparkles, Wallet, Heart, Gift, 
  Bell, LogOut, UserCircle 
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CartAction } from "@/components/cart/CartAction";
import { PageContainer } from "@/components/layout/PageContainer";

export function Navbar() {
  return (
    <header className="flex flex-col w-full sticky top-0 z-50">
      <div className="bg-white w-full">
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
            <div className="flex items-center justify-between w-full h-[52px] gap-8">
               
               {/* 1. Large Search Bar */}
               <div className="flex-1 w-full">
                 <Suspense fallback={<div className="flex-1 w-full bg-gray-100 h-[52px] rounded-2xl animate-pulse" />}>
                    <SearchBar />
                 </Suspense>
               </div>

               {/* 2. Specific Nav Actions */}
               <div className="hidden md:flex items-center gap-8 shrink-0 pr-2 h-full z-50">
                 
                 {/* User Profile Dropdown */}
                 <div className="relative group h-full flex items-center cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl group-hover:bg-[#2874f0]/10 transition-colors h-[40px] group-hover:text-[#2874F0]">
                      <User className="w-[20px] h-[20px] text-black group-hover:text-[#2874F0] transition-colors" />
                      <span className="font-medium text-[16px] text-black group-hover:text-[#2874F0] transition-colors">Vishal</span>
                      <ChevronDown className="w-[16px] h-[16px] text-black group-hover:text-[#2874F0] group-hover:-rotate-180 transition-transform duration-300" />
                    </div>

                    {/* Highly detailed massive dropdown box mimicking native Flipkart */}
                    <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-b-xl rounded-t-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-3 z-[100]">
                       <div className="px-5 py-2 font-bold text-[14px] text-gray-800">Your Account</div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <UserCircle className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">My Profile</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Package className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Orders</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Ticket className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Coupons</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Zap className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Supercoin</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Sparkles className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Flipkart Plus Zone</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Wallet className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Saved Cards & Wallet</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <MapPin className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Saved Addresses</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Heart className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Wishlist</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Gift className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Gift Cards</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <Bell className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Notifications</span>
                       </div>
                       
                       <div className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0F5FF] hover:font-medium transition-colors cursor-pointer group/item">
                          <LogOut className="w-[18px] h-[18px] text-gray-500 group-hover/item:text-[#2874F0] transition-colors" />
                          <span className="text-[14px] text-gray-700 group-hover/item:text-[#2874F0]">Logout</span>
                       </div>
                       
                    </div>
                 </div>

                 {/* More Option */}
                 <button aria-label="More options" className="flex items-center gap-2 group cursor-pointer">
                    <MoreVertical className="w-[20px] h-[20px] text-black group-hover:text-[#2874F0] transition-colors" />
                    <span className="font-medium text-[16px] text-black group-hover:text-[#2874F0] transition-colors">More</span>
                 </button>

                 {/* Cart Component logic */}
                 <CartAction />

               </div>

            </div>

          </div>
        </PageContainer>
      </div>

      {/* Category Navigation Row */}
      <CategoryNav />
    </header>
  );
}
