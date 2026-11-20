/** Isotipo Raíces Vivas: brote con hojas sobre una raíz, dentro de un círculo — y wordmark tipográfico */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* hojas */}
      <path d="M32 30 C25 28 21 22 20 15 C27 16 31 22 32 30 Z" fill="currentColor" opacity="0.9" />
      <path d="M32 27 C39 25 43 19 44 12 C37 13 33 19 32 27 Z" fill="currentColor" opacity="0.75" />
      {/* tallo */}
      <path d="M32 34 L32 18" stroke="currentColor" strokeWidth="1.6" fill="none" />
      {/* raíz */}
      <path
        d="M32 34 C32 42 32 48 32 54 M32 40 C28 42 25 46 23 50 M32 40 C36 42 39 46 41 50 M32 46 C30 48 28 51 27 54 M32 46 C34 48 36 51 37 54"
        stroke="#d6a943"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="16" y1="34" x2="48" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-6 w-6" />
      <span className="label text-[13px] tracking-normal">Raíces Vivas</span>
    </span>
  );
}
