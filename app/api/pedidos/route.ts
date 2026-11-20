import { NextResponse } from "next/server";
import { PAYMENT_METHODS } from "@/lib/config";
import { forward } from "@/lib/forward";

type Item = { id: string; name: string; detail: string; price: number; qty: number };

/** Recibe el pedido hecho directamente en la página y devuelve su número */
export async function POST(req: Request) {
  let body: {
    items?: Item[];
    customer?: Record<string, string>;
    deliveryWindow?: string;
    payment?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.filter((i) => i && i.qty > 0 && i.price > 0) : [];
  const c = body.customer ?? {};
  const payment = PAYMENT_METHODS.find((m) => m.id === body.payment);
  if (!items.length || !c.name?.trim() || !c.phone?.trim() || !c.city?.trim() || !c.address?.trim() || !body.deliveryWindow || !payment) {
    return NextResponse.json({ error: "Faltan datos del pedido" }, { status: 400 });
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const now = new Date();
  const id = `RV-${now.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  try {
    await forward("pedido", {
      id,
      fecha: now.toISOString(),
      cliente: c,
      ventanaEntrega: body.deliveryWindow,
      metodoPago: payment.name,
      productos: items.map((i) => ({ producto: i.name, detalle: i.detail, cantidad: i.qty, subtotal: i.price * i.qty })),
      total,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "No pudimos registrar el pedido" }, { status: 502 });
  }

  return NextResponse.json({ id, total });
}
