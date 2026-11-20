"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PLANS, PRICES, formatCOP, planPrice, type Plan } from "@/lib/config";
import { PACKAGES, type ThematicPackage } from "@/lib/products";
import { useCart } from "./CartProvider";

/* ------------------------------------------------------------------ */
/*  PAQUETES TEMÁTICOS — eliges paquete y plan y lo agregas al pedido  */
/* ------------------------------------------------------------------ */
export function Packages() {
  return (
    <section id="paquetes" className="px-5 py-28 md:px-8 md:py-40">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="label text-[12px] text-gold">Paquetes temáticos</p>
          <h2 className="display mt-4 text-[clamp(40px,5.2vw,72px)]">
            Elige tu paquete
            <br />y tu plan.
          </h2>
        </div>
        <p className="text-[clamp(18px,2vw,24px)] leading-[1.26] text-cream/80 md:col-span-5 md:col-start-8 md:self-end">
          Cada kit trae 7 shots de 60 ml, una semana de rutina. Pruébalo con una compra individual o recíbelo en casa
          con el plan quincenal, el preferido de nuestros clientes.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  );
}

function PackageCard({ pkg, index }: { pkg: ThematicPackage; index: number }) {
  const { add } = useCart();
  // el plan quincenal viene preseleccionado por ser el destacado
  const [planId, setPlanId] = useState<Plan["id"]>("quincenal");
  const plan = PLANS.find((p) => p.id === planId)!;
  const perDelivery = planPrice(plan);
  const monthly = perDelivery * plan.deliveries;
  const regular = PRICES.packageKit * plan.kits;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="flex flex-col overflow-hidden rounded-[12px] border border-cork"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={pkg.image} alt={`Paquete ${pkg.name} Raíces Vivas`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/10 to-transparent" />
        <p className="label absolute bottom-4 left-5 text-[11px]" style={{ color: pkg.accent }}>
          Paquete {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="display text-[clamp(28px,2.6vw,38px)]">{pkg.name}</h3>
        <p className="mt-3 text-[18px] leading-snug" style={{ color: pkg.accent }}>
          “{pkg.keyMessage}”
        </p>

        <dl className="mt-6 space-y-4 text-[14px] leading-relaxed">
          <div>
            <dt className="label text-[11px] text-cream/50">Para quién</dt>
            <dd className="mt-1 text-cream/80">{pkg.forWho}</dd>
          </div>
          <div>
            <dt className="label text-[11px] text-cream/50">Qué incluye</dt>
            <dd className="mt-1 text-cream/80">
              {pkg.includes} <span className="text-cream">Cada kit: {pkg.kitDetail}.</span>
            </dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-2.5">
          {pkg.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[14px] leading-snug">
              <Check size={15} className="mt-0.5 shrink-0" style={{ color: pkg.accent }} /> {b}
            </li>
          ))}
        </ul>

        <p className="label mt-6 text-[11px] text-cream/50">
          Mejor encaje: <span className="text-cream">{pkg.bestFit}</span>
        </p>

        <div className="my-6 border-t dashed" />

        {/* selector de plan */}
        <div role="radiogroup" aria-label={`Plan para el paquete ${pkg.name}`} className="grid grid-cols-3 gap-2">
          {PLANS.map((p) => (
            <button
              key={p.id}
              role="radio"
              aria-checked={p.id === planId}
              onClick={() => setPlanId(p.id)}
              className={`label relative rounded-[22.5px] border px-2 py-2.5 text-[11px] transition-colors ${
                p.id === planId ? "border-cream bg-cream text-walnut" : "border-cork text-cream/80 hover:border-cream/60"
              }`}
            >
              {p.short}
              {p.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2 py-0.5 text-[9px] text-walnut">
                  Más elegido
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="display text-[36px] tabular-nums">{formatCOP(perDelivery)}</p>
            <p className="text-[12px] text-cream/60">
              {plan.deliveries === 1
                ? `${plan.kits * 7} shots · una entrega`
                : `por entrega (${plan.kits * 7} shots) · ${formatCOP(monthly)} al mes`}
            </p>
          </div>
          {plan.discount > 0 && (
            <div className="pb-1 text-right">
              <p className="text-[13px] text-cream/50 line-through">{formatCOP(regular)}</p>
              <p className="label text-[11px] text-gold">−{Math.round(plan.discount * 100)}%</p>
            </div>
          )}
        </div>

        <button
          className={`${plan.featured ? "btn-fill" : "btn-ghost"} mt-6 w-full`}
          onClick={() =>
            add({
              id: `paquete-${pkg.id}-${plan.id}`,
              name: `Paquete ${pkg.name} · ${plan.name}`,
              detail: `${plan.cadence} · ${plan.kits} ${plan.kits === 1 ? "kit" : "kits"} (${pkg.kitDetail}${
                plan.kits > 1 ? " por kit" : ""
              })${plan.deliveries > 1 ? ` · ${plan.deliveries} entregas al mes` : ""}`,
              price: plan.deliveries > 1 ? monthly : perDelivery,
            })
          }
        >
          <Plus size={14} /> Agregar al pedido
        </button>
        {plan.deliveries > 1 && (
          <p className="mt-2 text-center text-[11px] text-cream/50">Se paga el mes completo · sin permanencia</p>
        )}
      </div>
    </motion.article>
  );
}
