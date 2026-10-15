"use client";

import { motion, type MotionValue } from "framer-motion";
import { useId } from "react";

type Label = { text: string; opacity?: MotionValue<number> | number };

type Props = {
  liquid: MotionValue<string> | string;
  labels: Label[];
  size?: string;
  volume?: string;
  className?: string;
};

const BODY =
  "M72 58 L72 96 C72 128 32 140 32 192 L32 438 Q32 468 62 468 L138 468 Q168 468 168 438 L168 192 C168 140 128 128 128 96 L128 58 Z";

/** Frasco de vidrio tipo "family pack" dibujado en SVG, con líquido de color animable. */
export function Bottle({ liquid, labels, size = "450 ml", volume = "FAMILY PACK", className }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 480" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`body-${uid}`}>
          <path d={BODY} />
        </clipPath>
        <linearGradient id={`cap-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a2a" />
          <stop offset="0.35" stopColor="#e8c879" />
          <stop offset="0.6" stopColor="#c9a24a" />
          <stop offset="1" stopColor="#6e521d" />
        </linearGradient>
        <linearGradient id={`shade-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="0.3" stopColor="#000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sombra al piso */}
      <ellipse cx="100" cy="472" rx="70" ry="6" fill="#000" opacity="0.45" />

      {/* líquido */}
      <g clipPath={`url(#body-${uid})`}>
        <motion.rect x="0" y="112" width="200" height="370" style={{ fill: liquid }} />
        <rect x="0" y="0" width="200" height="480" fill={`url(#shade-${uid})`} />
        <ellipse cx="100" cy="300" rx="80" ry="140" fill={`url(#glow-${uid})`} />
      </g>

      {/* vidrio */}
      <path d={BODY} fill="rgba(255,237,215,0.04)" stroke="rgba(255,237,215,0.35)" strokeWidth="1.5" />
      <path
        d="M46 200 C46 170 62 150 80 140"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="44" y="214" width="6" height="210" rx="3" fill="rgba(255,255,255,0.22)" />

      {/* tapa dorada */}
      <rect x="64" y="10" width="72" height="50" rx="6" fill={`url(#cap-${uid})`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={70 + i * 7.5} y1="14" x2={70 + i * 7.5} y2="56" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      ))}

      {/* etiqueta */}
      <rect x="46" y="236" width="108" height="168" rx="4" fill="rgba(16,9,4,0.22)" stroke="rgba(255,237,215,0.28)" />
      <text x="100" y="258" textAnchor="middle" fill="#ffedd7" fontSize="8" letterSpacing="1" opacity="0.85">
        {volume}
      </text>
      {labels.map((l, i) => (
        <motion.g key={i} style={{ opacity: l.opacity ?? 1 }}>
          <text
            x="100"
            y="306"
            textAnchor="middle"
            fill="#ffedd7"
            fontSize={l.text.length > 6 ? 20 : 26}
            fontWeight="600"
          >
            {l.text}
          </text>
          <text x="100" y="334" textAnchor="middle" fill="#ffedd7" fontSize="26" fontWeight="600">
            SHOT
          </text>
        </motion.g>
      ))}
      <text x="100" y="356" textAnchor="middle" fill="#ffedd7" fontSize="8" opacity="0.8">
        {size}
      </text>
      <line x1="62" y1="372" x2="138" y2="372" stroke="rgba(255,237,215,0.35)" strokeDasharray="2 3" />
      <text x="100" y="390" textAnchor="middle" fill="#ffedd7" fontSize="11" fontWeight="500" letterSpacing="1">
        VITAL DETOX
      </text>
    </svg>
  );
}
