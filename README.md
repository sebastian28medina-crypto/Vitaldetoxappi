# Raíces Vivas — Landing e-commerce

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
| WhatsApp de soporte (solo dígitos, con 57) | `BUSINESS.whatsapp` |
| Datos de transferencia / Nequi | `BUSINESS.transfer` |
| Precio botella 450 ml, pack familiar, pack shot y kit de paquete (7 shots) | `PRICES` |
| Planes de los paquetes (individual, quincenal destacado, semanal) | `PLANS` |
| Suscripciones del pack familiar | `SUBSCRIPTIONS` |
| Ventanas de entrega | `DELIVERY_WINDOWS` |
| Métodos de pago | `PAYMENT_METHODS` |

En `lib/products.ts` están los sabores, los mensajes por formulación, la información de confianza
(composición, **procedencia**, conservación, trazabilidad) y los **paquetes temáticos**.
Los textos de procedencia son provisionales: reemplázalos por los proveedores reales.

## Cómo funciona la página

1. **Pantalla de carga** (`components/Loader.tsx`): estaciones Selección → Limón → Jengibre → Prensado en frío → Embotellado.
2. **Hero** con foto, parallax y banda de estaciones que se mueve con el scroll.
3. **Historia por scroll** (`components/ScrollStory.tsx`): logo → frasco → ingredientes, beneficios, perfil del consumidor y precio por sabor → **Pack familiar**.
4. **Paquetes temáticos** (`components/Packages.tsx`): Bienestar General, Inmunidad y Energía y Recuperación. Cada uno con selector de plan; el **plan quincenal** viene preseleccionado y marcado como “Más elegido”.
5. Pack Shot y Suscripciones (quincenal destacado).
6. **Información de confianza** (`components/Trust.tsx`) por producto.
7. **Comentarios de clientes** (`components/Reviews.tsx`): el formulario solo aparece después de que la persona hace un pedido.
8. FAQ y footer.
9. **Pedido directo en la página** (`components/CartDrawer.tsx`): la persona completa sus datos, ventana de entrega y método de pago, y recibe su número de pedido (RV-…) con las instrucciones de pago.
10. **Botón flotante de WhatsApp** (`components/WhatsAppButton.tsx`): solo para soporte y dudas.

## Dónde llegan los pedidos y las opiniones

Los pedidos se envían a `/api/pedidos` y las opiniones a `/api/comentarios`. Para recibirlos, configura en
Vercel → *Settings* → *Environment Variables*:

| Variable | Para qué |
|---|---|
| `ORDERS_WEBHOOK_URL` | URL que recibe cada pedido en JSON (Google Apps Script que escribe en una hoja, Make, Zapier o Formspree) |
| `REVIEWS_WEBHOOK_URL` | URL que recibe cada opinión |

Sin estas variables, los pedidos y opiniones quedan en Vercel → *Logs*.
Para publicar una opinión, revísala y agrégala a `lib/reviews.ts`.

## Publicar en Vercel

1. Sube la carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New Project* → importa el repositorio → agrega las variables de arriba → *Deploy*.

## Imágenes

Las fotos en `public/img/` se recortaron de los visuales de Raíces Vivas. Reemplázalas por fotos en alta resolución con el mismo nombre de archivo.
