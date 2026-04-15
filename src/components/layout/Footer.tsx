import { PageContainer } from "@/components/layout/PageContainer";

export function Footer() {
  return (
    <footer className="bg-[#172337] w-full mt-auto">
      <PageContainer className="py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
             <h4 className="text-[#878787] text-[12px] font-normal uppercase mb-1">About</h4>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Contact Us</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">About Us</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Careers</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Flipkart Stories</a>
          </div>

          <div className="flex flex-col gap-3">
             <h4 className="text-[#878787] text-[12px] font-normal uppercase mb-1">Help</h4>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Payments</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Shipping</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">Cancellation & Returns</a>
             <a href="#" className="text-white text-[12px] font-medium hover:underline">FAQ</a>
          </div>

           <div>
            <h6 className="text-[var(--color-muted)] font-medium mb-4 text-sm">CONSUMER POLICY</h6>
             <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
           <div>
            <h6 className="text-[var(--color-muted)] font-medium mb-4 text-sm">SOCIAL</h6>
             <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2007-2026 Flipkart.com</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payments" />
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
