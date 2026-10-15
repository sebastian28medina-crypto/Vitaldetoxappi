/** Isotipo: hoja de jengibre dentro de un círculo — y wordmark tipográfico */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 50 C32 38 32 28 32 16" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M32 30 C24 28 19 22 18 14 C26 15 31 21 32 30 Z" fill="currentColor" opacity="0.9" />
      <path d="M32 26 C40 24 45 18 46 10 C38 11 33 17 32 26 Z" fill="currentColor" opacity="0.75" />
      <path d="M32 40 C25 39 20 34 19 27 C26 28 31 33 32 40 Z" fill="currentColor" opacity="0.6" />
      <circle cx="42" cy="44" r="5" fill="#d6a943" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-6 w-6" />
      <span className="label text-[13px] tracking-normal">Vital Detox</span>
    </span>
  );
}
