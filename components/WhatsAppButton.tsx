"use client";

import { BUSINESS } from "@/lib/config";
import { useCart } from "./CartProvider";

const SUPPORT_TEXT = "¡Hola Raíces Vivas! 🌱 Tengo una duda sobre sus productos.";

export const supportLink = (text = SUPPORT_TEXT) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;

/** Botón flotante de WhatsApp: canal de SOPORTE para dudas y acompañamiento en la compra */
export function WhatsAppButton() {
  const { open } = useCart();
  if (open) return null;
  return (
    <a
      href={supportLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="¿Dudas? Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-[55] flex items-center gap-3 rounded-full bg-[#1f7a43] py-3 pl-3.5 pr-3.5 text-cream shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#239150] md:bottom-7 md:right-7 md:pr-5"
    >
      <WhatsAppIcon size={22} />
      <span className="label hidden text-[11px] md:inline">¿Dudas? Escríbenos</span>
    </a>
  );
}

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
    </svg>
  );
}
