"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BUSINESS, DELIVERY_WINDOWS, PAYMENT_METHODS, formatCOP, type PaymentMethodId } from "@/lib/config";
import { saveOrder } from "@/lib/orders";
import { useCart } from "./CartProvider";
import { WhatsAppIcon, supportLink } from "./WhatsAppButton";

type Confirmed = { id: string; total: number; payment: PaymentMethodId; window: string };

const EMPTY_FORM = { name: "", phone: "", email: "", city: "", address: "", notes: "" };

export function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove, clear, toast } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [deliveryWindow, setDeliveryWindow] = useState("");
  const [payment, setPayment] = useState<PaymentMethodId | "">("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // al cerrar después de confirmar, la canasta vuelve a su estado normal
  useEffect(() => {
    if (!open && confirmed) setConfirmed(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /** Pedido directo en la página: datos, ventana de entrega y método de pago */
  const submit = async () => {
    if (!items.length || sending) return;
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      setError("Completa nombre, teléfono, ciudad y dirección.");
      return;
    }
    if (!deliveryWindow) return setError("Elige una ventana de entrega.");
    if (!payment) return setError("Elige un método de pago.");
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: form, deliveryWindow, payment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      saveOrder({ id: data.id, date: new Date().toISOString(), products: items.map((i) => i.name) });
      setConfirmed({ id: data.id, total: data.total, payment, window: deliveryWindow });
      clear();
      setForm(EMPTY_FORM);
      setDeliveryWindow("");
      setPayment("");
    } catch {
      setError("No pudimos registrar tu pedido. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof typeof form, placeholder: string, type = "text") => (
    <input
      className="input-line"
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
    />
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-[460px] flex-col bg-walnut"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              role="dialog"
              aria-label="Canasta"
            >
              <div className="flex items-center justify-between border-b dashed px-6 py-5">
                <h2 className="display text-[32px]">Canasta</h2>
                <button onClick={() => setOpen(false)} aria-label="Cerrar">
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                {confirmed ? (
                  <Confirmation order={confirmed} />
                ) : items.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="label text-[14px] text-cream/60">Tu canasta está vacía</p>
                    <a href="#paquetes" onClick={() => setOpen(false)} className="btn-ghost mt-6">
                      Ver paquetes
                    </a>
                  </div>
                ) : (
                  <>
                    <ul>
                      {items.map((i) => (
                        <li key={i.id} className="border-b dashed py-5">
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="label text-[15px]">{i.name}</p>
                              <p className="mt-1 text-[13px] text-cream/60">{i.detail}</p>
                            </div>
                            <button onClick={() => remove(i.id)} aria-label={`Quitar ${i.name}`} className="text-cream/50 hover:text-cream">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center gap-4 rounded-[22.5px] border border-cork px-3 py-1.5">
                              <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Restar">
                                <Minus size={13} />
                              </button>
                              <span className="label w-5 text-center text-[13px] tabular-nums">{i.qty}</span>
                              <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Sumar">
                                <Plus size={13} />
                              </button>
                            </div>
                            <p className="label text-[15px] tabular-nums">{formatCOP(i.price * i.qty)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4 py-6">
                      <p className="label text-[12px] text-gold">1 · Tus datos</p>
                      {field("name", "Nombre completo *")}
                      {field("phone", "Celular *", "tel")}
                      {field("email", "Correo (opcional)", "email")}
                      {field("city", "Ciudad *")}
                      {field("address", "Dirección *")}
                      {field("notes", "Notas para la entrega (opcional)")}
                    </div>

                    <fieldset className="space-y-2 pb-6">
                      <legend className="label mb-3 text-[12px] text-gold">2 · Ventana de entrega *</legend>
                      {DELIVERY_WINDOWS.map((w) => (
                        <Option key={w} checked={deliveryWindow === w} onSelect={() => setDeliveryWindow(w)} name="ventana" title={w} />
                      ))}
                    </fieldset>

                    <fieldset className="space-y-2 pb-6">
                      <legend className="label mb-3 text-[12px] text-gold">3 · Método de pago *</legend>
                      {PAYMENT_METHODS.map((m) => (
                        <Option
                          key={m.id}
                          checked={payment === m.id}
                          onSelect={() => setPayment(m.id)}
                          name="pago"
                          title={m.name}
                          note={m.note}
                        />
                      ))}
                    </fieldset>
                  </>
                )}
              </div>

              {!confirmed && items.length > 0 && (
                <div className="border-t dashed px-6 py-5">
                  <div className="flex items-end justify-between">
                    <span className="label text-[13px] text-cream/70">Total a pagar</span>
                    <span className="display text-[36px] tabular-nums">{formatCOP(total)}</span>
                  </div>
                  {error && <p className="mt-3 text-[13px] text-[#ff8a45]">{error}</p>}
                  <button onClick={submit} disabled={sending} className="btn-fill mt-4 w-full disabled:opacity-60">
                    {sending ? "Confirmando…" : "Confirmar pedido"}
                  </button>
                  <div className="mt-3 flex items-center justify-between">
                    <button onClick={clear} className="label text-[11px] text-cream/50 hover:text-cream">
                      Vaciar canasta
                    </button>
                    <a href={supportLink("¡Hola Raíces Vivas! 🌱 Tengo una duda con mi pedido.")} target="_blank" rel="noreferrer" className="label inline-flex items-center gap-1.5 text-[11px] text-cream/60 hover:text-cream">
                      <WhatsAppIcon size={13} /> ¿Dudas? Te ayudamos
                    </a>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* aviso de producto agregado */}
      <AnimatePresence>
        {toast && !open && (
          <motion.button
            onClick={() => setOpen(true)}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="label fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-cream px-5 py-3 text-[12px] text-walnut"
          >
            {toast} · Ver canasta
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function Option({
  checked,
  onSelect,
  name,
  title,
  note,
}: {
  checked: boolean;
  onSelect: () => void;
  name: string;
  title: string;
  note?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-[12px] border px-4 py-3 transition-colors ${
        checked ? "border-cream bg-bark" : "border-cork hover:border-cream/50"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="mt-1 accent-[#d6a943]" />
      <span>
        <span className="block text-[14px]">{title}</span>
        {note && <span className="block text-[12px] text-cream/55">{note}</span>}
      </span>
    </label>
  );
}

/** Confirmación del pedido con las instrucciones de pago */
function Confirmation({ order }: { order: Confirmed }) {
  const method = PAYMENT_METHODS.find((m) => m.id === order.payment)!;
  return (
    <div className="py-10">
      <CheckCircle2 size={40} strokeWidth={1.3} className="text-gold" />
      <h3 className="display mt-6 text-[34px]">¡Pedido confirmado!</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
        Tu número de pedido es <span className="label text-cream">{order.id}</span>. Te contactaremos al celular que
        registraste para coordinar la entrega.
      </p>

      <dl className="mt-8 space-y-4 rounded-[12px] border border-cork p-5 text-[14px]">
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Total</dt>
          <dd className="label tabular-nums">{formatCOP(order.total)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Entrega</dt>
          <dd className="text-right">{order.window}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Pago</dt>
          <dd className="text-right">{method.name}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-[12px] bg-bark p-5">
        <p className="label text-[12px] text-gold">Cómo pagar</p>
        {order.payment === "transferencia" && (
          <p className="mt-3 text-[14px] leading-relaxed text-cream/85">
            {BUSINESS.transfer.bank} {BUSINESS.transfer.accountType} {BUSINESS.transfer.accountNumber}
            <br />
            Titular: {BUSINESS.transfer.holder}
            <br />
            Referencia: {order.id}
          </p>
        )}
        {order.payment === "nequi" && (
          <p className="mt-3 text-[14px] leading-relaxed text-cream/85">
            Nequi: {BUSINESS.transfer.nequi}
            <br />
            Referencia: {order.id}
          </p>
        )}
        {order.payment === "contraentrega" && (
          <p className="mt-3 text-[14px] leading-relaxed text-cream/85">
            Pagas {formatCOP(order.total)} en efectivo cuando recibas tu pedido.
          </p>
        )}
      </div>

      <p className="mt-6 text-[13px] text-cream/60">
        Después de recibirlo, cuéntanos cómo te fue en la sección{" "}
        <a href="#opiniones" className="underline">
          Opiniones
        </a>
        .
      </p>
      <a
        href={supportLink(`¡Hola Raíces Vivas! 🌱 Tengo una duda sobre mi pedido ${order.id}.`)}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost mt-6"
      >
        <WhatsAppIcon /> ¿Dudas? Escríbenos
      </a>
    </div>
  );
}
