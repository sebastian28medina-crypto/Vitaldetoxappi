/** Pedidos confirmados en este navegador: habilitan el formulario de opiniones */
export type SavedOrder = { id: string; date: string; products: string[] };

const KEY = "raices-vivas-orders";

export function getSavedOrders(): SavedOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...getSavedOrders()].slice(0, 20)));
    window.dispatchEvent(new Event("raices-vivas-order"));
  } catch {}
}
