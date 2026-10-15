# Vital Detox — Landing e-commerce

Next.js 16 (App Router, React 19, TypeScript) · Tailwind CSS 4 · Framer Motion · Lucide.
Estilo basado en `DESIGN.md` (lienzo cálido oscuro, tipografía crema en mayúsculas, divisores punteados).

## Correr en tu computador

```bash
npm install
npm run dev        # http://localhost:3000
```

## Antes de publicar: edita `lib/config.ts`

| Qué | Dónde |
|---|---|
| Número de WhatsApp (solo dígitos, con 57) | `BUSINESS.whatsapp` |
| Datos de transferencia / Nequi | `BUSINESS.transfer` |
| Precio botella 450 ml, pack familiar, pack shot | `PRICES` |
| Planes de suscripción (descuento, entregas, beneficios) | `SUBSCRIPTIONS` |

Los sabores, ingredientes, beneficios y colores de cada frasco están en `lib/products.ts`.

## Cómo funciona la página

1. **Pantalla de carga** (`components/Loader.tsx`): estaciones Selección → Limón → Jengibre → Prensado en frío → Embotellado.
2. **Hero** con foto, parallax y banda de estaciones que se mueve con el scroll.
3. **Historia por scroll** (`components/ScrollStory.tsx`): el logo se transforma en el frasco → el frasco va a la izquierda y aparecen ingredientes, beneficios y precio → gira y se transforma en el siguiente sabor (la página toma su color) → los tres frascos se juntan en el **Pack familiar** con precio.
4. Pack Shot, Suscripciones, FAQ y footer.
5. **Canasta** (`components/CartDrawer.tsx`): se guarda en el navegador; el botón arma un mensaje de WhatsApp con el pedido, el total a pagar y los datos de entrega. El cliente envía la transferencia por ese chat.

## Publicar en Vercel

1. Sube la carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New Project* → importa el repositorio → *Deploy*. No requiere variables de entorno.

## Imágenes

Las fotos en `public/img/` se recortaron de las capturas de la presentación. Reemplázalas por fotos en alta resolución con el mismo nombre de archivo.
