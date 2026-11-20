import { NextResponse } from "next/server";
import { forward } from "@/lib/forward";

/** Recibe la opinión de un cliente que ya hizo su pedido (queda para revisión antes de publicarse) */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
  const text = String(b.text ?? "").trim().slice(0, 1000);
  const name = String(b.name ?? "").trim().slice(0, 80);
  const orderId = String(b.orderId ?? "").trim();
  const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));
  if (!text || !name || !/^RV-\d{6}-[A-Z0-9]{4}$/.test(orderId)) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  try {
    await forward("comentario", {
      pedido: orderId,
      nombre: name,
      ciudad: String(b.city ?? "").slice(0, 80),
      producto: String(b.product ?? "").slice(0, 200),
      calificacion: rating,
      opinion: text,
      fecha: new Date().toISOString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No pudimos registrar la opinión" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
