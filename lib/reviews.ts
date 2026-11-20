/**
 * ============================================================
 *  COMENTARIOS PUBLICADOS
 * ============================================================
 * Aquí van SOLO opiniones reales de clientes que ya hicieron su
 * pedido. Las opiniones nuevas llegan por el formulario de la
 * sección "Opiniones" (ver /app/api/comentarios). Revísalas y,
 * cuando las apruebes, cópialas en esta lista para publicarlas.
 *
 * Ejemplo de formato:
 * { name: "Nombre A.", city: "Palmira", product: "Paquete Bienestar General",
 *   rating: 5, text: "Opinión del cliente", date: "2026-11-20" },
 */

export type Review = {
  name: string;
  city: string;
  product: string;
  rating: number;
  text: string;
  date: string;
};

export const PUBLISHED_REVIEWS: Review[] = [];
