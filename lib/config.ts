/**
 * ============================================================
 *  CONFIGURACIÓN DEL NEGOCIO — edita aquí precios y contacto
 * ============================================================
 * Todos los precios están en pesos colombianos (COP).
 * Los valores actuales son PROVISIONALES: cámbialos por los
 * definitivos antes de publicar.
 */

export const BUSINESS = {
  name: "Raíces Vivas",
  /**
   * WhatsApp de SOPORTE (dudas sobre productos y acompañamiento en la compra).
   * Formato internacional, SOLO dígitos (57 + número).
   */
  whatsapp: "573000000000",
  instagram: "https://instagram.com/raicesvivas",
  email: "hola@raicesvivas.co",
  /** Datos para pagos por transferencia / Nequi (se muestran al confirmar el pedido). */
  transfer: {
    bank: "Bancolombia",
    accountType: "Ahorros",
    accountNumber: "000-000000-00",
    holder: "Raíces Vivas",
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
  /** Kit de un paquete temático: 7 shots de 60 ml (una semana de rutina) */
  packageKit: 39000,
};

/**
 * Planes de compra para los paquetes temáticos.
 * kits = kits de 7 shots que llegan en cada entrega.
 * El plan quincenal es el DESTACADO (fue el que más interés despertó en las entrevistas).
 */
export const PLANS = [
  {
    id: "individual",
    name: "Compra individual",
    short: "Individual",
    cadence: "Una sola entrega",
    kits: 1,
    deliveries: 1,
    discount: 0,
    featured: false,
  },
  {
    id: "quincenal",
    name: "Plan quincenal",
    short: "Quincenal",
    cadence: "Cada 15 días",
    kits: 2,
    deliveries: 2,
    discount: 0.1,
    featured: true,
  },
  {
    id: "semanal",
    name: "Plan semanal",
    short: "Semanal",
    cadence: "Cada semana",
    kits: 1,
    deliveries: 4,
    discount: 0.15,
    featured: false,
  },
] as const;

export type Plan = (typeof PLANS)[number];

/** Precio por entrega de un paquete según el plan elegido */
export const planPrice = (plan: Plan) =>
  Math.round((PRICES.packageKit * plan.kits * (1 - plan.discount)) / 100) * 100;

/** Planes de suscripción del pack familiar: el precio se calcula sobre el pack familiar por entrega. */
export const SUBSCRIPTIONS = [
  {
    id: "sub-semanal",
    name: "Semanal",
    cadence: "Cada semana",
    deliveries: 4,
    discount: 0.15,
    perks: ["Pack familiar cada semana", "Guía de rutina de bienestar", "Envío prioritario"],
    featured: false,
  },
  {
    id: "sub-quincenal",
    name: "Quincenal",
    cadence: "Cada 15 días",
    deliveries: 2,
    discount: 0.1,
    perks: ["Pack familiar cada 15 días", "Guía de rutina de bienestar", "Cambia sabores cuando quieras"],
    featured: true,
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

/** Ventanas de entrega que el cliente elige al hacer su pedido en la página */
export const DELIVERY_WINDOWS = [
  "Lunes a viernes · 8:00 a. m. – 12:00 m.",
  "Lunes a viernes · 2:00 p. m. – 6:00 p. m.",
  "Sábados · 9:00 a. m. – 1:00 p. m.",
];

/** Métodos de pago disponibles en el checkout de la página */
export const PAYMENT_METHODS = [
  { id: "transferencia", name: "Transferencia bancaria", note: "Te mostramos los datos al confirmar." },
  { id: "nequi", name: "Nequi", note: "Te mostramos el número al confirmar." },
  { id: "contraentrega", name: "Pago contra entrega", note: "Pagas en efectivo al recibir." },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
