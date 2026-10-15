"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ROW_A = ["Limón", "Jengibre", "Remolacha", "Cúrcuma", "Zanahoria", "Limón", "Jengibre", "Remolacha"];
const ROW_B = ["Prensado en frío", "Sin azúcar", "Sin conservantes", "100% natural", "Prensado en frío", "Sin azúcar"];

/** Banda de "estaciones" que se desplaza en direcciones opuestas al hacer scroll */
export function StationsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <div ref={ref} className="overflow-hidden border-y dashed py-8" aria-hidden="true">
      <motion.div style={{ x: xA }} className="flex gap-10 whitespace-nowrap">
        {ROW_A.map((w, i) => (
          <span key={i} className="display flex items-center gap-10 text-[clamp(44px,8vw,110px)]">
            {w}
            <span className="inline-block h-4 w-4 rounded-full bg-gold" />
          </span>
        ))}
      </motion.div>
      <motion.div style={{ x: xB }} className="mt-4 flex gap-10 whitespace-nowrap">
        {ROW_B.map((w, i) => (
          <span
            key={i}
            className="display flex items-center gap-10 text-[clamp(44px,8vw,110px)] text-transparent [-webkit-text-stroke:1px_#ffedd7]"
          >
            {w}
            <span className="inline-block h-4 w-4 rounded-full border border-cream" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
