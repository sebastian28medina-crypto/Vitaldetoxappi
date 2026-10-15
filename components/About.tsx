"use client";

import { motion } from "framer-motion";
import { Droplets, Leaf, ShieldCheck, Snowflake } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function About() {
  return (
    <section id="quienes-somos" className="px-5 py-28 md:px-8 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <motion.div {...fade} className="md:col-span-5">
          <p className="label text-[12px] text-gold">Quiénes somos</p>
          <h2 className="display mt-4 text-[clamp(40px,5.2vw,72px)]">
            No es solo
            <br />
            un jugo.
          </h2>
        </motion.div>
        <motion.div {...fade} className="md:col-span-7">
          <p className="text-[clamp(20px,2.2vw,29px)] leading-[1.26]">
            Vital Detox es un emprendimiento colombiano 100% digital. Prensamos en frío limón, jengibre y raíces
            de temporada para crear extractos funcionales ultraconcentrados: los pides por WhatsApp y llegan a tu
            nevera, sin intermediarios ni punto físico.
          </p>
          <div className="my-8 border-t dashed" />
          <p className="max-w-xl text-[16px] leading-relaxed text-cream/70">
            Creemos en las rutinas simples: una dosis al día, ingredientes que puedes pronunciar y un formato que
            rinde toda la semana. Por eso trabajamos con botellas familiares de 450 ml, shots de 60 ml y planes de
            suscripción con guías para acompañar tu proceso.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: Leaf, title: "100% natural", text: "Solo fruta, raíz y limón. Nada que no puedas leer en voz alta." },
  { icon: Snowflake, title: "Prensado en frío", text: "Sin calor que destruya vitaminas, enzimas ni sabor." },
  { icon: Droplets, title: "Sin azúcar añadida", text: "El dulzor viene de la zanahoria y la remolacha, no de un saco." },
  { icon: ShieldCheck, title: "Sin conservantes", text: "Producción por lotes cortos para que siempre llegue fresco." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="px-5 pb-28 md:px-8 md:pb-40">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(36px,4.2vw,56px)]">Beneficios</h2>
        <p className="label hidden text-[12px] text-driftwood md:block">Lo que sí lleva · lo que nunca lleva</p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[12px] border border-cork bg-cork sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="bg-walnut p-6 md:p-8"
          >
            <b.icon size={22} strokeWidth={1.4} className="text-gold" />
            <h3 className="label mt-10 text-[18px]">{b.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
