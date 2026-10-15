/**
 * ============================================================
 *  CONFIGURACIÓN DEL NEGOCIO — edita aquí precios y contacto
 * ============================================================
 * Todos los precios están en pesos colombianos (COP).
 * Los valores actuales son PROVISIONALES: cámbialos por los
 * definitivos antes de publicar.
 */

export const BUSINESS = {
  name: "Vital Detox",
  /** Número de WhatsApp en formato internacional, SOLO dígitos (57 + número). */
  whatsapp: "573000000000",
  instagram: "https://instagram.com/vitaldetox",
  email: "hola@vitaldetox.co",
  /** Datos para la transferencia (se muestran en la canasta). */
  transfer: {
    bank: "Bancolombia",
    accountType: "Ahorros",
    accountNumber: "000-000000-00",
    holder: "Vital Detox",
    nequi: "300 000 0000",
  },
};

export const PRICES = {
  /** Botella 450 ml, cualquier sabor */
  bottle450: 32000,
  /** Pack familiar: 3 botellas de 450 ml (una de cada sabor) */
  familyPack: 85000,
  /** Pack Shot: 3 shots de 60 ml (uno de cada sabor) */
  shotPack: 18000,
};

/** Planes de suscripción: el precio se calcula sobre el pack familiar por entrega. */
export const SUBSCRIPTIONS = [
  {
    id: "sub-semanal",
    name: "Semanal",
    cadence: "Cada semana",
    deliveries: 4,
    discount: 0.15,
    perks: ["Pack familiar cada semana", "Guía de rutina detox", "Envío prioritario"],
    featured: true,
  },
  {
    id: "sub-quincenal",
    name: "Quincenal",
    cadence: "Cada 15 días",
    deliveries: 2,
    discount: 0.1,
    perks: ["Pack familiar cada 15 días", "Guía de rutina detox", "Cambia sabores cuando quieras"],
    featured: false,
  },
  {
    id: "sub-mensual",
    name: "Mensual",
    cadence: "Una vez al mes",
    deliveries: 1,
    discount: 0.05,
    perks: ["Pack familiar + Pack Shot", "Plan antioxidante en PDF", "Sin permanencia"],
    featured: false,
  },
] as const;

export const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
