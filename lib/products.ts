export type Ingredient = { name: string; benefit: string; color: string };

/** Información de confianza que se muestra para cada producto */
export type TrustInfo = {
  composicion: string;
  procedencia: string;
  conservacion: string;
  trazabilidad: string;
};

export type Flavor = {
  id: string;
  /** Nombre corto que va en la etiqueta del frasco */
  label: string;
  name: string;
  combo: string;
  use: string;
  /** Mensaje por formulación, escrito para el perfil de consumidor al que va dirigido */
  value: string;
  /** Para quién es esta formulación */
  profile: string;
  ingredients: Ingredient[];
  trust: TrustInfo;
  /** Color del líquido */
  liquid: string;
  /** Fondo de la página cuando este sabor está en escena */
  bg: string;
  /** Color de acento (títulos, números) */
  accent: string;
};

/*
 * PROCEDENCIA: textos provisionales. Reemplázalos por los proveedores
 * y municipios reales antes de publicar.
 */
const CONSERVACION =
  "Refrigerado entre 2 °C y 6 °C. Dura de 5 a 7 días desde la fecha de prensado. Agita antes de tomar.";
const TRAZABILIDAD =
  "Cada frasco lleva número de lote y fecha de prensado. Con ese lote te contamos de qué cosecha y proveedor viene cada ingrediente.";

const LIMON: Ingredient = {
  name: "Limón",
  benefit: "Aporta vitamina C, que contribuye a la función normal del sistema inmune.",
  color: "#f2d24b",
};

const JENGIBRE: Ingredient = {
  name: "Jengibre",
  benefit: "Se asocia tradicionalmente con la digestión y la sensación de bienestar; suma sabor y calidez.",
  color: "#d9b77a",
};

export const FLAVORS: Flavor[] = [
  {
    id: "remolacha",
    label: "REMOLACHA",
    name: "Remolacha",
    combo: "Remolacha, Jengibre y Limón",
    use: "Energía y recuperación",
    value: "Energía que viene de la raíz: un shot rápido antes o después de entrenar, sin preparar nada.",
    profile: "Para quienes entrenan con frecuencia y buscan un adicional natural en su rutina.",
    ingredients: [
      {
        name: "Remolacha",
        benefit:
          "Aporta nitratos naturales y antioxidantes; se estudia por su relación con la circulación y el rendimiento en el ejercicio.",
        color: "#a3243f",
      },
      JENGIBRE,
      LIMON,
    ],
    trust: {
      composicion: "Jugo de remolacha, jengibre y limón prensados en frío. Sin agua, azúcar ni conservantes añadidos.",
      procedencia: "Remolacha y limón de productores del Valle del Cauca; jengibre seleccionado en plaza de mercado.",
      conservacion: CONSERVACION,
      trazabilidad: TRAZABILIDAD,
    },
    liquid: "#6e1527",
    bg: "#1a0609",
    accent: "#e0586f",
  },
  {
    id: "curcuma",
    label: "CÚRCUMA",
    name: "Cúrcuma",
    combo: "Cúrcuma, Jengibre y Limón",
    use: "Inmunidad y bienestar general",
    value: "Raíces que te cuidan: limón, jengibre y cúrcuma, ingredientes tradicionalmente usados en épocas de cambios de clima o de cansancio.",
    profile: "Para consumidores naturistas que se interesan por la inmunidad y las propiedades de cada ingrediente.",
    ingredients: [
      {
        name: "Cúrcuma",
        benefit: "Aporta curcumina, un antioxidante natural ampliamente estudiado.",
        color: "#e8a21c",
      },
      JENGIBRE,
      LIMON,
    ],
    trust: {
      composicion: "Jugo de cúrcuma, jengibre y limón prensados en frío. Sin agua, azúcar ni conservantes añadidos.",
      procedencia: "Cúrcuma y jengibre frescos de cultivos del Valle del Cauca; limón de productores locales.",
      conservacion: CONSERVACION,
      trazabilidad: TRAZABILIDAD,
    },
    liquid: "#e3a01f",
    bg: "#1b1203",
    accent: "#f1bd4d",
  },
  {
    id: "zanahoria",
    label: "ZANAHORIA",
    name: "Zanahoria",
    combo: "Zanahoria, Jengibre y Limón",
    use: "Antioxidantes naturales",
    value: "Tu equilibrio, un día a la vez: antioxidantes naturales y un sabor suave para empezar la rutina.",
    profile: "Para quienes se inician en los productos naturistas y quieren un sabor suave y diario.",
    ingredients: [
      {
        name: "Zanahoria",
        benefit: "Aporta betacaroteno (provitamina A), un antioxidante natural.",
        color: "#ef6c1f",
      },
      JENGIBRE,
      LIMON,
    ],
    trust: {
      composicion: "Jugo de zanahoria, jengibre y limón prensados en frío. Sin agua, azúcar ni conservantes añadidos.",
      procedencia: "Zanahoria y limón de productores del Valle del Cauca; jengibre seleccionado en plaza de mercado.",
      conservacion: CONSERVACION,
      trazabilidad: TRAZABILIDAD,
    },
    liquid: "#e5631b",
    bg: "#1d0b03",
    accent: "#ff8a45",
  },
];

/* ------------------------------------------------------------------ */
/*  PAQUETES TEMÁTICOS                                                 */
/*  Cada kit trae 7 shots de 60 ml (una semana de rutina).             */
/* ------------------------------------------------------------------ */
export type ThematicPackage = {
  id: string;
  name: string;
  keyMessage: string;
  forWho: string;
  includes: string;
  /** Detalle de los shots que trae cada kit */
  kitDetail: string;
  benefits: string[];
  bestFit: string;
  image: string;
  accent: string;
};

export const PACKAGES: ThematicPackage[] = [
  {
    id: "bienestar-general",
    name: "Bienestar General",
    keyMessage: "Tu bienestar diario, sin preparar nada.",
    forWho:
      "Personas que consumen productos naturistas, tienen poco tiempo y quieren cuidar su bienestar a diario sin preparar nada.",
    includes:
      "Una combinación equilibrada de los cuatro ingredientes (jengibre, limón, remolacha y cúrcuma) para variar sabores a lo largo de la quincena.",
    kitDetail: "4 shots de Cúrcuma + 3 shots de Remolacha",
    benefits: [
      "Rutina diaria práctica, lista para tomar y entregada en casa.",
      "Aporte de antioxidantes naturales de la cúrcuma y la remolacha.",
      "Vitamina C del limón, que contribuye a la función normal del sistema inmune.",
      "El jengibre se asocia tradicionalmente con la digestión y la sensación de bienestar.",
    ],
    bestFit: "Plan quincenal",
    image: "/img/paquete-bienestar.jpg",
    accent: "#d6a943",
  },
  {
    id: "inmunidad",
    name: "Inmunidad",
    keyMessage: "Raíces que te cuidan.",
    forWho: "Consumidores naturistas que se interesan por la inmunidad y las propiedades de los ingredientes.",
    includes: "El protagonismo de limón, jengibre y cúrcuma.",
    kitDetail: "7 shots de Cúrcuma, Jengibre y Limón",
    benefits: [
      "Vitamina C del limón.",
      "Ingredientes tradicionalmente usados en épocas de cambios de clima o de cansancio.",
      "La cúrcuma aporta curcumina, un antioxidante estudiado, y el jengibre suma sabor y calidez.",
    ],
    bestFit: "Compra individual de prueba y luego plan quincenal",
    image: "/img/paquete-inmunidad.jpg",
    accent: "#f1bd4d",
  },
  {
    id: "energia-recuperacion",
    name: "Energía y Recuperación",
    keyMessage: "Energía que viene de la raíz.",
    forWho: "Quienes entrenan con frecuencia y buscan un adicional natural para su rutina.",
    includes: "Remolacha y jengibre como protagonistas, con limón para equilibrar el sabor.",
    kitDetail: "7 shots de Remolacha, Jengibre y Limón",
    benefits: [
      "La remolacha aporta nitratos naturales y se estudia por su relación con la circulación y el rendimiento en ejercicio.",
      "El jengibre y la cúrcuma se asocian con el cuidado del cuerpo después del esfuerzo.",
      "Formato de consumo rápido, antes o después de entrenar.",
    ],
    bestFit: "Compra individual o plan semanal para quienes entrenan a diario",
    image: "/img/paquete-energia.jpg",
    accent: "#e0586f",
  },
];
