"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SuccessView } from "@/components/checkout/SuccessView";
import { PageContainer } from "@/components/layout/PageContainer";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="bg-white min-h-[calc(100vh-64px)] py-8 flex items-start justify-center">
       <PageContainer>
         <SuccessView orderId={orderId || "UNKNOWN"} />
       </PageContainer>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen animate-pulse" />}>
       <OrderSuccessContent />
    </Suspense>
  );
}
