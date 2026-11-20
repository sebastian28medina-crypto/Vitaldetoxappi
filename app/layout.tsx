import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter alojada localmente (sustituto de Halyard Display según DESIGN.md)
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raíces Vivas — Shots naturales prensados en frío",
  description:
    "Shots naturales prensados en frío de remolacha, cúrcuma, zanahoria, jengibre y limón. Paquetes temáticos, plan quincenal y pedido directo en línea.",
  openGraph: {
    title: "Raíces Vivas",
    description: "Lo bueno viene de la raíz.",
    images: ["/img/ingredientes.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#100904" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
