"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getSavedOrders, type SavedOrder } from "@/lib/orders";
import { PUBLISHED_REVIEWS, type Review } from "@/lib/reviews";

const MY_REVIEWS_KEY = "raices-vivas-my-reviews";

/* ------------------------------------------------------------------ */
/*  COMENTARIOS DE CLIENTES — se habilitan después de hacer un pedido  */
/* ------------------------------------------------------------------ */
export function Reviews() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [mine, setMine] = useState<Review[]>([]);

  useEffect(() => {
    const load = () => {
      setOrders(getSavedOrders());
      try {
        setMine(JSON.parse(localStorage.getItem(MY_REVIEWS_KEY) || "[]"));
      } catch {}
    };
    load();
    window.addEventListener("raices-vivas-order", load);
    return () => window.removeEventListener("raices-vivas-order", load);
  }, []);

  const reviews = [...mine, ...PUBLISHED_REVIEWS];

  return (
    <section id="opiniones" className="px-5 pb-28 md:px-8 md:pb-40">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="label text-[12px] text-gold">Comentarios de clientes</p>
          <h2 className="display mt-4 text-[clamp(40px,5.2vw,72px)]">
            Lo que dicen
            <br />
            quienes ya probaron.
          </h2>
        </div>
        <p className="text-[clamp(16px,1.6vw,20px)] leading-[1.26] text-cream/75 md:col-span-5 md:col-start-8 md:self-end">
          Aquí publicamos las opiniones de las personas después de recibir su pedido. Solo pueden opinar quienes ya
          compraron en Raíces Vivas.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.length === 0 && (
          <div className="rounded-[12px] border border-dashed border-cork p-8 md:col-span-2 lg:col-span-3">
            <p className="label text-[14px]">Aún no hay opiniones publicadas</p>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-cream/60">
              Haz tu pedido y sé de las primeras personas en contarnos cómo te fue con tu rutina.
            </p>
          </div>
        )}
        {reviews.map((r, i) => (
          <motion.article
            key={`${r.name}-${r.date}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="flex flex-col rounded-[12px] border border-cork p-6"
          >
            <Stars value={r.rating} />
            <p className="mt-4 flex-1 text-[16px] leading-relaxed text-cream/85">“{r.text}”</p>
            <div className="mt-6 border-t dashed pt-4">
              <p className="label text-[12px]">
                {r.name} · {r.city}
              </p>
              <p className="mt-1 text-[12px] text-cream/50">
                {r.product}
                {i < mine.length && " · Tu opinión (en revisión para publicarse)"}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {orders.length > 0 && <ReviewForm orders={orders} onSaved={(r) => setMine((m) => [r, ...m])} />}
    </section>
  );
}

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={onChange ? `${n} estrellas` : undefined}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star size={16} className={n <= value ? "fill-gold text-gold" : "text-driftwood"} />
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ orders, onSaved }: { orders: SavedOrder[]; onSaved: (r: Review) => void }) {
  const [orderId, setOrderId] = useState(orders[0].id);
  const [form, setForm] = useState({ name: "", city: "", text: "", rating: 5 });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const order = orders.find((o) => o.id === orderId) ?? orders[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setState("sending");
    const review: Review = {
      name: form.name.trim(),
      city: form.city.trim() || "Colombia",
      product: order.products.join(", "),
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, orderId: order.id }),
      });
      if (!res.ok) throw new Error();
      try {
        const saved = JSON.parse(localStorage.getItem(MY_REVIEWS_KEY) || "[]");
        localStorage.setItem(MY_REVIEWS_KEY, JSON.stringify([review, ...saved]));
      } catch {}
      onSaved(review);
      setState("done");
      setForm({ name: "", city: "", text: "", rating: 5 });
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} className="mt-12 rounded-[12px] bg-bark p-6 md:p-10">
      <p className="label text-[12px] text-gold">Cuéntanos cómo te fue</p>
      <h3 className="display mt-3 text-[clamp(26px,2.6vw,36px)]">Deja tu opinión</h3>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="label text-[11px] text-cream/60">Pedido</span>
          <select className="input-line mt-1" value={orderId} onChange={(e) => setOrderId(e.target.value)}>
            {orders.map((o) => (
              <option key={o.id} value={o.id} className="bg-walnut">
                {o.id} · {o.products.join(", ")}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span className="label text-[11px] text-cream/60">Calificación</span>
          <div className="mt-3">
            <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
          </div>
        </div>
        <input className="input-line" placeholder="Tu nombre *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-line" placeholder="Ciudad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <textarea
          className="input-line min-h-[90px] resize-y md:col-span-2"
          placeholder="Tu opinión *"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn-ghost">
          {state === "sending" ? "Enviando…" : "Publicar opinión"}
        </button>
        {state === "done" && <p className="text-[14px] text-gold">¡Gracias! Tu opinión quedó registrada.</p>}
        {state === "error" && <p className="text-[14px] text-[#ff8a45]">No pudimos enviarla. Intenta de nuevo.</p>}
      </div>
    </form>
  );
}
