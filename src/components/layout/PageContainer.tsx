import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`max-w-[1280px] mx-auto px-4 md:px-8 w-full ${className}`}>
      {children}
    </div>
  );
}
