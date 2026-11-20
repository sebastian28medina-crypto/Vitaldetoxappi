/**
 * Reenvía un registro (pedido u opinión) al destino configurado.
 * Configura en Vercel → Settings → Environment Variables:
 *   ORDERS_WEBHOOK_URL   → URL que recibe los pedidos (p. ej. Google Apps Script que escribe en una hoja,
 *                          Make/Zapier, o tu correo vía Formspree).
 *   REVIEWS_WEBHOOK_URL  → URL que recibe las opiniones de clientes.
 * Si la variable no existe, el registro queda en los logs del servidor (Vercel → Logs).
 */
export async function forward(kind: "pedido" | "comentario", data: unknown) {
  const url = kind === "pedido" ? process.env.ORDERS_WEBHOOK_URL : process.env.REVIEWS_WEBHOOK_URL;
  console.log(`[raices-vivas] nuevo ${kind}:`, JSON.stringify(data));
  if (!url) return;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: kind, ...(data as object) }),
  });
  if (!res.ok) throw new Error(`Webhook ${kind} respondió ${res.status}`);
}
