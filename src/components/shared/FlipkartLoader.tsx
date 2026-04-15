export function FlipkartLoader() {
  return (
    <div className="flex items-center gap-1.5 justify-center py-6">
      <div 
         className="w-3.5 h-3.5 bg-[var(--color-brand)] rounded-full animate-bounce" 
         style={{ animationDelay: '0ms' }}
         aria-hidden="true"
      ></div>
      <div 
         className="w-3.5 h-3.5 bg-[var(--color-brand-yellow)] rounded-full animate-bounce" 
         style={{ animationDelay: '150ms' }}
         aria-hidden="true"
      ></div>
      <div 
         className="w-3.5 h-3.5 bg-[var(--color-brand)] rounded-full animate-bounce" 
         style={{ animationDelay: '300ms' }}
         aria-hidden="true"
      ></div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
}
