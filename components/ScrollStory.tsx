"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PRICES, formatCOP } from "@/lib/config";
import { FLAVORS, type Flavor } from "@/lib/products";
import { Bottle } from "./Bottle";
import { useCart } from "./CartProvider";
import { LogoMark } from "./Logo";

/**
 * Línea de tiempo del scroll (0 → 1):
 *  0.00–0.12  logo → se transforma en el primer frasco
 *  0.12–0.36  sabor 1: el frasco va a la izquierda, aparecen ingredientes
 *  0.36       el frasco gira y se transforma en el sabor 2 (la página cambia de color)
 *  0.36–0.60  sabor 2
 *  0.60–0.80  sabor 3
 *  0.80–1.00  salen los tres frascos, se juntan y se presenta el pack familiar con precios
 */
const STARTS = [0.12, 0.36, 0.6];
const ENDS = [0.36, 0.6, 0.8];
const SWITCH = [0.36, 0.6]; // momentos de transformación entre sabores
const PACK_BG = "#15110a";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return mobile;
}

const useVisible = (o: MotionValue<number>) => useTransform(o, (v) => (v > 0.5 ? "auto" : "none"));

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // ---------- color de página y líquido ----------
  const bg = useTransform(
    p,
    [0, 0.1, 0.34, 0.38, 0.58, 0.62, 0.8, 0.85, 1],
    ["#100904", FLAVORS[0].bg, FLAVORS[0].bg, FLAVORS[1].bg, FLAVORS[1].bg, FLAVORS[2].bg, FLAVORS[2].bg, PACK_BG, PACK_BG]
  );
  const liquid = useTransform(
    p,
    [0, 0.352, 0.368, 0.592, 0.608, 1],
    [FLAVORS[0].liquid, FLAVORS[0].liquid, FLAVORS[1].liquid, FLAVORS[1].liquid, FLAVORS[2].liquid, FLAVORS[2].liquid]
  );

  // ---------- intro: logo ----------
  const logoOpacity = useTransform(p, [0, 0.06, 0.1], [1, 1, 0]);
  const logoScale = useTransform(p, [0, 0.1], [1, 0.25]);
  const introTextOpacity = useTransform(p, [0, 0.04], [1, 0]);

  // ---------- frasco principal ----------
  const KEYS = [0, 0.12, 0.16, 0.32, 0.36, 0.4, 0.56, 0.6, 0.64, 0.76, 0.8, 1];
  const AWAY = [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0]; // 1 = frasco a un lado con ingredientes
  const bottleX = useTransform(p, KEYS, AWAY.map((a) => `${-a * 24}vw`));
  const bottleY = useTransform(p, KEYS, AWAY.map((a) => `${-a * 17}vh`));
  const bottleMobileScale = useTransform(p, KEYS, AWAY.map((a) => 1 - a * 0.3));
  const rotate = useTransform(p, KEYS, AWAY.map((a) => -a * 5));
  const introScale = useTransform(p, [0.05, 0.12], [0.2, 1]);
  const introOpacity = useTransform(p, [0.05, 0.1, 0.8, 0.83], [0, 1, 1, 0]);
  // giro (transformación) entre sabores
  const flip = useTransform(
    p,
    [0.33, SWITCH[0], 0.39, 0.57, SWITCH[1], 0.63],
    [1, 0.08, 1, 1, 0.08, 1]
  );
  const labelOpacities = [
    useTransform(p, [0.355, 0.365], [1, 0]),
    useTransform(p, [0.355, 0.365, 0.595, 0.605], [0, 1, 1, 0]),
    useTransform(p, [0.595, 0.605], [0, 1]),
  ];

  // ---------- pack familiar ----------
  const packIn = useTransform(p, [0.8, 0.88], [0, 1]);
  const packGroupX = useTransform(p, [0.88, 0.93], ["0vw", "-22vw"]);
  const packGroupY = useTransform(p, [0.88, 0.93], ["0vh", "-20vh"]);
  const packGroupScale = useTransform(p, [0.88, 0.93], [1, mobile ? 0.62 : 0.9]);
  const packPanelOpacity = useTransform(p, [0.91, 0.95], [0, 1]);
  const packPanelY = useTransform(p, [0.91, 0.95], [40, 0]);
  const packPointer = useVisible(packPanelOpacity);

  return (
    <section id="productos" ref={ref} className="relative" style={{ height: "900vh" }}>
      {/* ancla para el menú: inicio del pack familiar */}
      <div id="pack-familiar" className="absolute left-0" style={{ top: "740vh" }} />

      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-[100svh] overflow-hidden">
        {/* resplandor del color del frasco */}
        <motion.div
          style={{ backgroundColor: liquid }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        />

        {/* nombres gigantes de fondo */}
        {FLAVORS.map((f, i) => (
          <Watermark key={f.id} p={p} index={i} text={f.name} />
        ))}

        {/* ---------- INTRO: LOGO ---------- */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-cream"
        >
          <LogoMark className="h-[28vh] w-[28vh]" />
        </motion.div>
        <motion.div
          style={{ opacity: introTextOpacity }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 px-5 text-center"
        >
          <p className="display text-[clamp(28px,4vw,51px)]">Tres raíces. Una rutina.</p>
          <p className="label text-[12px] text-driftwood">Sigue bajando</p>
        </motion.div>

        {/* ---------- FRASCO PRINCIPAL ---------- */}
        <motion.div
          style={{
            x: mobile ? 0 : bottleX,
            y: mobile ? bottleY : 0,
            scale: mobile ? bottleMobileScale : 1,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <motion.div style={{ scale: introScale, opacity: introOpacity, rotate, scaleX: flip }}>
            <Bottle
              liquid={liquid}
              labels={FLAVORS.map((f, i) => ({ text: f.label, opacity: labelOpacities[i] }))}
              className="h-[56vh] w-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] md:h-[64vh]"
            />
          </motion.div>
        </motion.div>

        {/* ---------- PANELES DE INGREDIENTES ---------- */}
        {FLAVORS.map((f, i) => (
          <FlavorPanel key={f.id} flavor={f} index={i} p={p} mobile={mobile} />
        ))}

        {/* ---------- PACK FAMILIAR ---------- */}
        <motion.div
          style={{
            x: mobile ? 0 : packGroupX,
            y: mobile ? packGroupY : 0,
            scale: packGroupScale,
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {FLAVORS.map((f, i) => (
            <PackBottle key={f.id} flavor={f} index={i} progress={packIn} />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: packPanelOpacity, y: packPanelY, pointerEvents: packPointer }}
          className="absolute inset-x-0 bottom-0 p-5 md:inset-x-auto md:bottom-auto md:right-[5vw] md:top-1/2 md:w-[40vw] md:-translate-y-1/2 md:p-0"
        >
          <PackPanel />
        </motion.div>

        {/* indicador de progreso */}
        <Progress p={p} />
      </motion.div>
    </section>
  );
}

function Watermark({ p, index, text }: { p: MotionValue<number>; index: number; text: string }) {
  const s = STARTS[index];
  const e = ENDS[index];
  const opacity = useTransform(p, [s, s + 0.05, e - 0.04, e], [0, 1, 1, 0]);
  const x = useTransform(p, [s, e], ["8%", "-8%"]);
  return (
    <motion.p
      style={{ opacity, x }}
      className="display pointer-events-none absolute inset-x-0 bottom-[4vh] select-none whitespace-nowrap text-center text-[22vw] text-transparent [-webkit-text-stroke:1px_rgba(255,237,215,0.07)]"
      aria-hidden="true"
    >
      {text}
    </motion.p>
  );
}

function FlavorPanel({
  flavor,
  index,
  p,
  mobile,
}: {
  flavor: Flavor;
  index: number;
  p: MotionValue<number>;
  mobile: boolean;
}) {
  const { add } = useCart();
  const s = STARTS[index];
  const e = ENDS[index];
  const range = [s + 0.04, s + 0.07, e - 0.06, e - 0.03];
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [40, 0, 0, -40]);
  const pointerEvents = useVisible(opacity);

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-x-0 bottom-0 max-h-[50svh] overflow-y-auto px-5 pb-6 pt-4 md:inset-x-auto md:bottom-auto md:right-[5vw] md:top-1/2 md:max-h-none md:w-[42vw] md:-translate-y-1/2 md:overflow-visible md:p-0"
    >
      <div className="flex items-center gap-3">
        <span className="label whitespace-nowrap text-[12px]" style={{ color: flavor.accent }}>
          {String(index + 1).padStart(2, "0")} / 03
        </span>
        <span className="h-px flex-1 border-t dashed" />
        <span className="label text-[12px] text-cream/70">{flavor.use}</span>
      </div>

      <h3 className="display mt-4 text-[clamp(30px,3.6vw,51px)]">{flavor.combo}</h3>
      {!mobile && <p className="mt-4 text-[clamp(16px,1.5vw,20px)] leading-[1.26] text-cream/80">{flavor.value}</p>}

      <ul className="mt-6 space-y-4 md:mt-8 md:space-y-5">
        {flavor.ingredients.map((ing) => (
          <li key={ing.name} className="flex gap-4">
            <span
              className="mt-1 h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: ing.color, boxShadow: `0 0 18px ${ing.color}` }}
            />
            <div>
              <p className="label text-[14px] md:text-[15px]">{ing.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-cream/70 md:text-[15px]">{ing.benefit}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4 border-t dashed pt-5 md:mt-8">
        <div>
          <p className="label text-[11px] text-cream/60">Botella 450 ml</p>
          <p className="display text-[28px] md:text-[34px]">{formatCOP(PRICES.bottle450)}</p>
        </div>
        <button
          className="btn-ghost"
          onClick={() =>
            add({
              id: `botella-${flavor.id}`,
              name: `Botella ${flavor.name}`,
              detail: `450 ml · ${flavor.combo}`,
              price: PRICES.bottle450,
            })
          }
        >
          <Plus size={14} /> Agregar
        </button>
      </div>
    </motion.div>
  );
}

function PackBottle({ flavor, index, progress }: { flavor: Flavor; index: number; progress: MotionValue<number> }) {
  // cada frasco entra desde un lado distinto y se junta al centro
  const from = [
    { x: "-60vw", y: "10vh", r: -30 },
    { x: "0vw", y: "80vh", r: 0 },
    { x: "60vw", y: "10vh", r: 30 },
  ][index];
  const x = useTransform(progress, [0, 1], [from.x, "0vw"]);
  const y = useTransform(progress, [0, 1], [from.y, "0vh"]);
  const rotate = useTransform(progress, [0, 1], [from.r, 0]);
  const opacity = useTransform(progress, [0, 0.25], [0, 1]);
  const offset = (index - 1) * 21; // separación en vh entre frascos

  return (
    <div className="absolute" style={{ transform: `translateX(${offset}vh)` }}>
      <motion.div style={{ x, y, rotate, opacity }}>
        <Bottle
          liquid={flavor.liquid}
          labels={[{ text: flavor.label }]}
          className="h-[48vh] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] md:h-[54vh]"
        />
      </motion.div>
    </div>
  );
}

function PackPanel() {
  const { add } = useCart();
  const regular = PRICES.bottle450 * 3;
  const saving = regular - PRICES.familyPack;
  return (
    <div className="rounded-[12px] bg-walnut/60 p-5 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
      <p className="label text-[12px] text-gold">Pack familiar · 3 × 450 ml</p>
      <h3 className="display mt-3 text-[clamp(34px,4vw,56px)]">Tu semana completa.</h3>
      <p className="mt-3 hidden text-[clamp(16px,1.5vw,20px)] leading-[1.26] text-cream/80 md:block">
        Remolacha para la energía, cúrcuma para las defensas y zanahoria para la piel. Un sabor para cada objetivo,
        todos en tu nevera.
      </p>
      <div className="mt-5 flex items-end gap-4 border-t dashed pt-5 md:mt-8">
        <p className="display text-[40px] md:text-[51px]">{formatCOP(PRICES.familyPack)}</p>
        <div className="pb-1">
          <p className="text-[14px] text-cream/50 line-through">{formatCOP(regular)}</p>
          <p className="label text-[11px] text-gold">Ahorras {formatCOP(saving)}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="btn-fill"
          onClick={() =>
            add({
              id: "pack-familiar",
              name: "Pack familiar",
              detail: "3 × 450 ml · Remolacha, Cúrcuma y Zanahoria",
              price: PRICES.familyPack,
            })
          }
        >
          <Plus size={14} /> Agregar pack familiar
        </button>
        <a href="#suscripciones" className="btn-ghost">
          Ver suscripciones
        </a>
      </div>
    </div>
  );
}

function Progress({ p }: { p: MotionValue<number> }) {
  const steps = [...FLAVORS.map((f) => f.name), "Pack"];
  const ranges: [number, number][] = [
    [STARTS[0], ENDS[0]],
    [STARTS[1], ENDS[1]],
    [STARTS[2], ENDS[2]],
    [0.8, 1.01],
  ];
  return (
    <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:left-8 md:flex">
      {steps.map((s, i) => (
        <ProgressDot key={s} p={p} range={ranges[i]} label={s} />
      ))}
    </div>
  );
}

function ProgressDot({ p, range, label }: { p: MotionValue<number>; range: [number, number]; label: string }) {
  const active = useTransform(p, (v) => (v >= range[0] && v < range[1] ? 1 : 0.3));
  return (
    <motion.span style={{ opacity: active }} className="label flex items-center gap-2 text-[10px]">
      <span className="h-1.5 w-1.5 rounded-full bg-cream" /> {label}
    </motion.span>
  );
}
