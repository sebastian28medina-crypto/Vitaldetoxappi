export type Ingredient = { name: string; benefit: string; color: string };

export type Flavor = {
  id: string;
  /** Nombre corto que va en la etiqueta del frasco */
  label: string;
  name: string;
  combo: string;
  use: string;
  value: string;
  ingredients: Ingredient[];
  /** Color del líquido */
  liquid: string;
  /** Fondo de la página cuando este sabor está en escena */
  bg: string;
  /** Color de acento (títulos, números) */
  accent: string;
};

const LIMON: Ingredient = {
  name: "Limón",
  benefit: "Vitamina C que refuerza las defensas y aporta un efecto refrescante y depurativo.",
  color: "#f2d24b",
};

export const FLAVORS: Flavor[] = [
  {
    id: "remolacha",
    label: "BEET",
    name: "Remolacha",
    combo: "Limón, Jengibre y Remolacha",
    use: "Energía, circulación y rendimiento deportivo",
    value:
      "Economía de rutina y dosis personalizable: tienes el extracto semanal en casa y reduces el costo por dosis.",
    ingredients: [
      {
        name: "Remolacha",
        benefit: "Nitratos naturales que favorecen la circulación y la oxigenación de los músculos.",
        color: "#a3243f",
      },
      {
        name: "Jengibre",
        benefit: "Activa el metabolismo, apoya la digestión y da energía sin cafeína.",
        color: "#d9b77a",
      },
      LIMON,
    ],
    liquid: "#6e1527",
    bg: "#1a0609",
    accent: "#e0586f",
  },
  {
    id: "curcuma",
    label: "CÚRCUMA",
    name: "Cúrcuma",
    combo: "Limón, Jengibre y Cúrcuma",
    use: "Inmunidad y acción antiinflamatoria",
    value: "Concentración garantizada para la salud preventiva, todos los días.",
    ingredients: [
      {
        name: "Cúrcuma",
        benefit: "Curcumina: antioxidante con acción antiinflamatoria natural.",
        color: "#e8a21c",
      },
      {
        name: "Jengibre",
        benefit: "Gingerol que apoya las defensas y alivia la pesadez estomacal.",
        color: "#d9b77a",
      },
      LIMON,
    ],
    liquid: "#e3a01f",
    bg: "#1b1203",
    accent: "#f1bd4d",
  },
  {
    id: "zanahoria",
    label: "CARROT",
    name: "Zanahoria",
    combo: "Limón, Jengibre y Zanahoria",
    use: "Antioxidante, piel y visión",
    value: "Concentrado antioxidante, ideal para el cuidado de la piel y la visión.",
    ingredients: [
      {
        name: "Zanahoria",
        benefit: "Betacaroteno (provitamina A) que cuida la piel y la salud visual.",
        color: "#ef6c1f",
      },
      {
        name: "Jengibre",
        benefit: "Antioxidante y digestivo, potencia la absorción de nutrientes.",
        color: "#d9b77a",
      },
      {
        name: "Limón",
        benefit: "Vitamina C que ayuda a producir colágeno para una piel firme.",
        color: "#f2d24b",
      },
    ],
    liquid: "#e5631b",
    bg: "#1d0b03",
    accent: "#ff8a45",
  },
];
