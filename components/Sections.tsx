"use client";

import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BUSINESS, PRICES, SUBSCRIPTIONS, formatCOP } from "@/lib/config";
import { useCart } from "./CartProvider";

/* ------------------------------------------------------------------ */
/*  PACK SHOT 3 × 60 ml                                                */
/* ------------------------------------------------------------------ */
export function ShotPack() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <section id="pack-shot" className="grid min-h-[100svh] items-center gap-10 px-5 py-28 md:grid-cols-12 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="relative aspect-[4/5] overflow-hidden md:col-span-5"
      >
        <Image src="/img/shotpack.jpg" alt="Pack Shot Vital Detox x3" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      </motion.div>
      <div className="md:col-span-6 md:col-start-7">
        <p className="label text-[12px] text-gold">Pack Shot · 3 × 60 ml</p>
        <h2 className="display mt-4 text-[clamp(40px,5.2vw,72px)]">
          Tu dosis
          <br />
          on-the-go.
        </h2>
        <p className="mt-6 text-[clamp(18px,2vw,29px)] leading-[1.26]">
          Los tres sabores en shots de 60 ml. Dosis precisa para llevar al gimnasio o al trabajo, y la forma ideal
          de probarlos antes de pasarte a la botella familiar.
        </p>
        <div className="my-8 border-t dashed" />
        <div className="flex flex-wrap items-center gap-6">
          <p className="display text-[51px]">{formatCOP(PRICES.shotPack)}</p>
          <Stepper qty={qty} setQty={setQty} />
          <button
            className="btn-ghost"
            onClick={() =>
              add(
                {
                  id: "pack-shot",
                  name: "Pack Shot",
                  detail: "3 × 60 ml · Remolacha, Cúrcuma y Zanahoria",
                  price: PRICES.shotPack,
                },
                qty
              )
            }
          >
            <Plus size={14} /> Agregar a la canasta
          </button>
        </div>
      </div>
    </section>
  );
}

export function Stepper({ qty, setQty }: { qty: number; setQty: (n: number) => void }) {
  return (
    <div className="inline-flex items-center gap-4 rounded-[22.5px] border border-cork px-3 py-2">
      <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Restar">
        <Minus size={14} />
      </button>
      <span className="label w-5 text-center text-[14px] tabular-nums">{qty}</span>
      <button onClick={() => setQty(qty + 1)} aria-label="Sumar">
        <Plus size={14} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUSCRIPCIONES                                                      */
/* ------------------------------------------------------------------ */
export function Subscriptions() {
  const { add } = useCart();
  return (
    <section id="suscripciones" className="px-5 py-28 md:px-8 md:py-40">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label text-[12px] text-gold">Suscripciones</p>
          <h2 className="display mt-4 text-[clamp(40px,5.2vw,72px)]">
            Nunca te
            <br />
            quedes sin tu dosis.
          </h2>
        </div>
        <p className="text-[clamp(18px,2vw,24px)] leading-[1.26] text-cream/80 md:col-span-6 md:col-start-7 md:self-end">
          Recibe el pack familiar en casa con descuento. Pagas cada mes por transferencia y coordinamos las entregas
          por WhatsApp. Sin permanencia: pausas o cancelas cuando quieras.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {SUBSCRIPTIONS.map((s, i) => {
          const perDelivery = Math.round((PRICES.familyPack * (1 - s.discount)) / 100) * 100;
          const monthly = perDelivery * s.deliveries;
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`flex flex-col rounded-[12px] border p-6 md:p-8 ${
                s.featured ? "border-gold bg-bark" : "border-cork"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="label text-[18px]">{s.name}</h3>
                <span className="label rounded-full border border-cream/40 px-3 py-1 text-[11px]">
                  −{Math.round(s.discount * 100)}%
                </span>
              </div>
              <p className="label mt-1 text-[12px] text-cream/60">{s.cadence}</p>
              <p className="display mt-10 text-[44px]">{formatCOP(perDelivery)}</p>
              <p className="text-[13px] text-cream/60">
                por entrega · {formatCOP(monthly)} al mes ({s.deliveries} {s.deliveries === 1 ? "entrega" : "entregas"})
              </p>
              <div className="my-6 border-t dashed" />
              <ul className="flex-1 space-y-3">
                {s.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-[15px]">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" /> {perk}
                  </li>
                ))}
              </ul>
              <button
                className={`${s.featured ? "btn-fill" : "btn-ghost"} mt-8 w-full`}
                onClick={() =>
                  add({
                    id: s.id,
                    name: `Suscripción ${s.name}`,
                    detail: `Pack familiar ${s.cadence.toLowerCase()} · ${s.deliveries} ${
                      s.deliveries === 1 ? "entrega" : "entregas"
                    } al mes`,
                    price: monthly,
                  })
                }
              >
                Suscribirme
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const FAQS = [
  {
    q: "¿Cómo se conservan?",
    a: "Siempre refrigerados, entre 2 °C y 6 °C. Agita el frasco antes de servir: al ser natural, los ingredientes se asientan.",
  },
  {
    q: "¿Cuánto duran?",
    a: "Al ser prensados en frío y sin conservantes, duran entre 5 y 7 días refrigerados. Revisa siempre la fecha de la etiqueta.",
  },
  {
    q: "¿Cómo se toman?",
    a: "Una dosis de 60 ml al día, idealmente en ayunas. Puedes tomarla sola o diluida en agua. La botella de 450 ml rinde unas 7 dosis.",
  },
  {
    q: "¿Cómo pago?",
    a: "Agregas tus productos a la canasta y envías el pedido por WhatsApp. Te confirmamos el total y nos envías el comprobante de transferencia por el mismo chat.",
  },
  {
    q: "¿Hacen envíos?",
    a: "Sí. Coordinamos la entrega por WhatsApp según tu ciudad y dirección. El costo de envío se confirma al momento del pedido.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 pb-28 md:px-8 md:pb-40">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="display text-[clamp(40px,5.2vw,72px)] md:col-span-4">Preguntas frecuentes</h2>
        <ul className="md:col-span-7 md:col-start-6">
          {FAQS.map((f, i) => (
            <li key={f.q} className="border-b dashed">
              <button
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="label text-[16px] md:text-[18px]">{f.q}</span>
                <Plus size={18} className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-cream/75">{f.a}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <footer className="border-t dashed px-5 pb-8 pt-16 md:px-8">
      <p className="display text-[clamp(64px,16vw,240px)]">Vital Detox</p>
      <div className="mt-10 flex flex-col justify-between gap-6 border-t dashed pt-6 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-6">
          <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="label text-[12px] hover:underline">
            WhatsApp
          </a>
          <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="label text-[12px] hover:underline">
            Instagram
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="label text-[12px] hover:underline">
            {BUSINESS.email}
          </a>
        </div>
        <p className="label text-[11px] text-driftwood">
          © {new Date().getFullYear()} Vital Detox · Hecho en Colombia ·{" "}
          <span className="text-ember">Política de privacidad</span>
        </p>
      </div>
    </footer>
  );
}
