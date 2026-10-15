"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#productos", label: "Productos" },
  { href: "#pack-familiar", label: "Pack familiar" },
  { href: "#suscripciones", label: "Suscripciones" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b dashed bg-walnut/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-5 md:px-8">
        <a href="#inicio" aria-label="Vital Detox, inicio">
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label text-[12px] underline-offset-4 decoration-dashed hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="btn-ghost relative !px-4"
            aria-label={`Abrir canasta, ${count} productos`}
          >
            <ShoppingBag size={15} strokeWidth={1.6} />
            <span className="hidden sm:inline">Canasta</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-walnut">
                {count}
              </span>
            )}
          </button>
          <button className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Menú">
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menu && (
        <ul className="flex flex-col gap-5 border-t dashed bg-walnut px-5 py-6 lg:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenu(false)} className="display text-[28px]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
