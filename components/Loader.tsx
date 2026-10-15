"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/** Estaciones del proceso que se van "cargando" mientras la web está lista */
const STATIONS = ["Selección", "Limón", "Jengibre", "Prensado en frío", "Embotellado"];
const DURATION = 2600;

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    let pageLoaded = document.readyState === "complete";
    const onLoad = () => (pageLoaded = true);
    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // se detiene en 92% hasta que la página termine de cargar
      const eased = 1 - Math.pow(1 - t, 3);
      const value = pageLoaded ? eased * 100 : Math.min(eased * 100, 92);
      setProgress(value);
      if (t >= 1 && pageLoaded) {
        setTimeout(() => setDone(true), 350);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  const active = Math.min(STATIONS.length - 1, Math.floor((progress / 100) * STATIONS.length));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-walnut px-6 py-6 md:px-10 md:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="label text-[12px]">Vital Detox</span>
            <span className="label text-[12px] text-driftwood">Cargando estaciones</span>
          </div>

          <div className="mx-auto w-full max-w-5xl">
            <motion.div
              className="mb-12 flex justify-center text-cream"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <LogoMark className="h-16 w-16" />
            </motion.div>

            {/* línea de estaciones */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-[7px] border-t dashed" />
              <motion.div
                className="absolute left-0 top-[7px] h-px bg-gold"
                style={{ width: `${progress}%` }}
              />
              {/* gota que viaja */}
              <motion.div
                className="absolute top-0 h-[15px] w-[15px] -translate-x-1/2 rounded-full bg-gold shadow-[0_0_24px_#d6a943]"
                style={{ left: `${progress}%` }}
              />
              <div className="relative flex justify-between">
                {STATIONS.map((s, i) => (
                  <div key={s} className="flex w-0 flex-col items-center">
                    <span
                      className={`block h-[15px] w-[15px] rounded-full border transition-colors duration-300 ${
                        i <= active ? "border-gold bg-gold" : "border-driftwood bg-walnut"
                      }`}
                    />
                    <span
                      className={`label mt-4 whitespace-nowrap text-[10px] transition-colors duration-300 md:text-[12px] ${
                        i <= active ? "text-cream" : "text-driftwood"
                      } ${i % 2 === 1 ? "max-md:mt-10" : ""}`}
                    >
                      {String(i + 1).padStart(2, "0")} · {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <span className="label max-w-[60%] text-[12px] text-driftwood">
              Extractos funcionales de jengibre · prensados en frío
            </span>
            <span className="display text-[64px] tabular-nums md:text-[96px]">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
