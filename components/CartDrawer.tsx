"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BUSINESS, formatCOP } from "@/lib/config";
import { useCart } from "./CartProvider";

/** Arma el mensaje de WhatsApp con el pedido y el total a pagar */
function buildMessage(
  items: ReturnType<typeof useCart>["items"],
  total: number,
  form: { name: string; phone: string; city: string; address: string; notes: string }
) {
  const lines = items.map(
    (i) => `• ${i.qty} × ${i.name} (${i.detail}) — ${formatCOP(i.price * i.qty)}`
  );
  return [
    "¡Hola Vital Detox! 🌿 Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `*TOTAL A PAGAR: ${formatCOP(total)}*`,
    "",
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    `Ciudad: ${form.city}`,
    `Dirección: ${form.address}`,
    form.notes ? `Notas: ${form.notes}` : "",
    "",
    "Enviaré el comprobante de la transferencia por este chat.",
  ]
    .filter((l, idx, arr) => !(l === "" && arr[idx - 1] === ""))
    .join("\n");
}

export function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove, clear, toast } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const send = () => {
    if (!items.length) return;
    if (!form.name.trim() || !form.address.trim() || !form.city.trim()) {
      setError("Completa nombre, ciudad y dirección para enviar tu pedido.");
      return;
    }
    setError("");
    const text = buildMessage(items, total, form);
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
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
                {items.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="label text-[14px] text-cream/60">Tu canasta está vacía</p>
                    <a href="#productos" onClick={() => setOpen(false)} className="btn-ghost mt-6">
                      Ver productos
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
                      <p className="label text-[12px] text-gold">Datos de entrega</p>
                      {field("name", "Nombre completo *")}
                      {field("phone", "Teléfono", "tel")}
                      {field("city", "Ciudad *")}
                      {field("address", "Dirección *")}
                      {field("notes", "Notas (opcional)")}
                    </div>

                    <div className="mb-6 rounded-[12px] border border-cork p-5">
                      <p className="label text-[12px] text-gold">Pago por transferencia</p>
                      <p className="mt-3 text-[14px] leading-relaxed text-cream/80">
                        {BUSINESS.transfer.bank} {BUSINESS.transfer.accountType} {BUSINESS.transfer.accountNumber}
                        <br />
                        Titular: {BUSINESS.transfer.holder}
                        <br />
                        Nequi: {BUSINESS.transfer.nequi}
                      </p>
                      <p className="mt-3 text-[13px] text-cream/60">
                        Envía tu pedido por WhatsApp y comparte el comprobante en el mismo chat.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t dashed px-6 py-5">
                  <div className="flex items-end justify-between">
                    <span className="label text-[13px] text-cream/70">Total a pagar</span>
                    <span className="display text-[36px] tabular-nums">{formatCOP(total)}</span>
                  </div>
                  {error && <p className="mt-3 text-[13px] text-[#ff8a45]">{error}</p>}
                  <button onClick={send} className="btn-fill mt-4 w-full !bg-[#1f7a43] hover:!bg-[#239150]">
                    <WhatsAppIcon /> Enviar pedido por WhatsApp
                  </button>
                  <button onClick={clear} className="label mt-3 w-full text-[11px] text-cream/50 hover:text-cream">
                    Vaciar canasta
                  </button>
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
    </svg>
  );
}
