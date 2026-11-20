"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FLAVORS } from "@/lib/products";

/* ------------------------------------------------------------------ */
/*  INFORMACIÓN DE CONFIANZA — ingredientes, procedencia, composición, */
/*  conservación y trazabilidad de cada producto                       */
/* ------------------------------------------------------------------ */
export function Trust() {
  const [active, setActive] = useState(0);
  const f = FLAVORS[active];
  const rows = [
    { k: "Ingredientes", v: f.ingredients.map((i) => i.name).join(" · ") },
    { k: "Composición", v: f.trust.composicion },
    { k: "Procedencia", v: f.trust.procedencia },
    { k: "Conservación", v: f.trust.conservacion },
    { k: "Trazabilidad", v: f.trust.trazabilidad },
  ];

  return (
    <section id="confianza" className="px-5 pb-28 md:px-8 md:pb-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label text-[12px] text-gold">Información de confianza</p>
          <h2 className="display mt-4 text-[clamp(36px,4.2vw,56px)]">
            Sabes lo que
            <br />
            tomas.
          </h2>
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-cream/70">
            De dónde viene cada ingrediente, qué lleva cada frasco y cómo cuidarlo en casa.
          </p>

          <div role="tablist" aria-label="Producto" className="mt-8 flex flex-wrap gap-2">
            {FLAVORS.map((fl, i) => (
              <button
                key={fl.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`label rounded-[22.5px] border px-4 py-2 text-[11px] transition-colors ${
                  i === active ? "border-cream bg-cream text-walnut" : "border-cork text-cream/80 hover:border-cream/60"
                }`}
              >
                {fl.name}
              </button>
            ))}
          </div>
        </div>

        <motion.dl
          key={f.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="md:col-span-7 md:col-start-6"
        >
          {rows.map((r) => (
            <div key={r.k} className="grid gap-2 border-b dashed py-5 md:grid-cols-[180px_1fr] md:gap-8">
              <dt className="label text-[12px]" style={{ color: f.accent }}>
                {r.k}
              </dt>
              <dd className="text-[15px] leading-relaxed text-cream/85 md:text-[16px]">{r.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
