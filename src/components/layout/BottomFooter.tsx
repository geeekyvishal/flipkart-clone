import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";
import { Briefcase, Gift, HelpCircle, Star } from "lucide-react";

export function BottomFooter() {
  return (
    <footer className="bg-[#212121] w-full text-white p-0">
      <PageContainer>
        <div className="flex flex-col md:flex-row pt-[30px] pb-[16px] border-b border-[#3d4f5f]">
          
          <div className="flex flex-col flex-1 px-0 md:px-6 md:pl-0 mb-6 md:mb-0">
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">About</h4>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Contact Us</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">About Us</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Careers</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Flipkart Stories</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Press</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Corporate Information</Link>
          </div>

          <div className="flex flex-col flex-1 px-0 md:px-6 mb-6 md:mb-0">
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">Group Companies</h4>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Myntra</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Cleartrip</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Shopsy</Link>
          </div>

          <div className="flex flex-col flex-1 px-0 md:px-6 mb-6 md:mb-0">
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">Help</h4>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Payments</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Shipping</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Cancellation & Returns</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">FAQ</Link>
          </div>
          
          <div className="flex flex-col flex-1 px-0 md:px-6 md:border-r border-[#3d4f5f] mb-6 md:mb-0">
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">Consumer Policy</h4>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Cancellation & Returns</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Terms Of Use</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Security</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Privacy</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Sitemap</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">Grievance Redressal</Link>
             <Link href="#" style={{fontFamily:'Inter, Arial, sans-serif', fontSize:'12px', fontWeight:400, lineHeight:'18px', color:'rgb(255,255,255)'}} className="hover:underline">EPR Compliance</Link>
          </div>

          <div className="flex flex-col px-0 md:px-6 mb-6 md:mb-0" style={{ flex: 1.4 }}>
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">Mail Us:</h4>
             <p className="text-[12px] leading-[1.8] text-white font-normal m-0">
               Flipkart Internet Private Limited,<br/>
               Buildings Alyssa, Begonia &<br/>
               Clove Embassy Tech Village,<br/>
               Outer Ring Road, Devarabeesanahalli Village,<br/>
               Bengaluru, 560103,<br/>
               Karnataka, India
             </p>
          </div>

          <div className="flex flex-col px-0 md:pl-6 md:pr-0 mb-6 md:mb-0" style={{ flex: 1.4 }}>
             <h4 className="text-[#878787] text-[12px] font-semibold uppercase mb-[10px]">Registered Office Address:</h4>
             <p className="text-[12px] leading-[1.8] text-white font-normal m-0">
               Flipkart Internet Private Limited,<br/>
               Buildings Alyssa, Begonia &<br/>
               Clove Embassy Tech Village,<br/>
               Outer Ring Road, Devarabeesanahalli Village,<br/>
               Bengaluru, 560103,<br/>
               Karnataka, India<br/>
               CIN : U51109KA2012PTC066107<br/>
               Telephone: <a href="tel:044-45614700" className="text-[#2874F0] hover:underline">044-45614700</a> / <a href="tel:044-67415800" className="text-[#2874F0] hover:underline">044-67415800</a>
             </p>
          </div>
        </div>
        
        {/* Yellow/White Utility Bar (Bottom Row) */}
        <div className="py-[14px] flex flex-col lg:flex-row items-center justify-between gap-[32px] lg:gap-8">
           <div className="flex flex-wrap items-center gap-[32px]">
              <Link href="#" className="flex items-center gap-[8px] group hover:underline text-white font-medium text-[12px] whitespace-nowrap">
                 <Briefcase className="w-4 h-4 text-[#FFE500]" />
                 <span>Become a Seller</span>
              </Link>
              <Link href="#" className="flex items-center gap-[8px] group hover:underline text-white font-medium text-[12px] whitespace-nowrap">
                 <Star className="w-4 h-4 text-[#FFE500] fill-[#FFE500]" />
                 <span>Advertise</span>
              </Link>
              <Link href="#" className="flex items-center gap-[8px] group hover:underline text-white font-medium text-[12px] whitespace-nowrap">
                 <Gift className="w-4 h-4 text-[#FFE500]" />
                 <span>Gift Cards</span>
              </Link>
              <Link href="#" className="flex items-center gap-[8px] group hover:underline text-white font-medium text-[12px] whitespace-nowrap">
                 <HelpCircle className="w-4 h-4 text-[#FFE500]" />
                 <span>Help Center</span>
              </Link>
           </div>
           
           <div className="text-[12px] text-[#878787] whitespace-nowrap lg:mr-auto lg:ml-[32px]">
             © 2007-2026 Flipkart.com
           </div>

           <div className="flex items-center ml-0 lg:ml-[16px]">
              <img 
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" 
                alt="Payment Methods" 
                className="h-[20px] object-contain"
              />
           </div>
        </div>
      </PageContainer>
    </footer>
  );
}
