"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section id="inicio" ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <Image
          src="/img/ingredientes.jpg"
          alt="Frascos Vital Detox con jengibre, limón, cúrcuma y remolacha"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* gradación cálida tipo cuarto oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-walnut/85 via-walnut/35 to-walnut" />
      <div className="absolute inset-0 bg-[#574a23] mix-blend-multiply opacity-40" />

      <motion.div style={{ y: titleY }} className="relative z-10 px-5 pt-28 md:px-8 md:pt-32">
        <p className="label text-[12px]">Extractos funcionales de jengibre — prensados en frío</p>
        <h1 className="display mt-3 text-[clamp(64px,15vw,220px)]">
          Vital
          <br />
          Detox
        </h1>
        <p className="mt-6 max-w-md text-[clamp(18px,2vw,24px)] leading-[1.26] font-normal">
          Tu dosis diaria de vitalidad natural. Limón, jengibre y la raíz que tu cuerpo pida hoy.
        </p>
      </motion.div>

      {/* tarjeta de información (DESIGN: hero overlay info card) */}
      <div className="absolute bottom-6 left-5 z-10 max-w-[300px] rounded-[12px] bg-walnut/55 p-5 backdrop-blur-md md:left-8">
        <p className="label text-[12px]">100% natural · sin azúcar añadida · sin conservantes</p>
        <div className="my-3 border-t dashed" />
        <p className="text-[14px] leading-snug text-cream/80">
          Botellas de 450 ml para tu semana y shots de 60 ml para llevar.
        </p>
      </div>

      <a
        href="#quienes-somos"
        className="absolute bottom-6 right-5 z-10 flex items-center gap-3 rounded-[12px] border border-cream/30 bg-walnut/40 px-4 py-3 backdrop-blur-md md:right-8"
      >
        <span className="label text-[12px]">Descubre los sabores</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={16} />
        </motion.span>
      </a>

      {/* etiqueta vertical lateral */}
      <span className="label absolute right-3 top-1/2 z-10 hidden origin-center -translate-y-1/2 rotate-90 text-[11px] md:block">
        Vital Detox · 450 ml / 60 ml
      </span>
    </section>
  );
}
