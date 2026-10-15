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
  title: "Vital Detox — Extractos funcionales de jengibre",
  description:
    "Extractos funcionales prensados en frío: limón, jengibre, remolacha, cúrcuma y zanahoria. Botellas de 450 ml, Pack Shot y suscripciones. Pide por WhatsApp.",
  openGraph: {
    title: "Vital Detox",
    description: "Tu dosis diaria de vitalidad natural.",
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
