# MIS XV · Preinvitación

Experiencia web mobile-first en Next.js (App Router), TypeScript, Tailwind CSS y Framer Motion. Fecha: **19 de diciembre de 2026**. Concepto 4: editorial nocturno, terraza, ciudad, velas, bokeh y colores navy/plum/blush/ivory/champagne.

## Ejecutar localmente

Usa **Node.js 24 LTS** (incluye npm). Con nvm: `nvm use`.

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. No necesitas cuenta, claves ni servicios externos. Fotos y audio están incluidos; no hay descargas de fuentes durante el build.

El arranque de desarrollo usa Webpack y comprueba cambios cada segundo para evitar límites de observadores de archivos (`EMFILE`) en este entorno. Producción no usa esta comprobación.

## Comprobar y ejecutar producción

```sh
npm run lint
npm run test
npm run build
npm start
```

`npm run typecheck` permite comprobar TypeScript por separado. Se incluye el lockfile para instalaciones reproducibles. Lint se ejecuta por separado del build, siguiendo la [configuración de Next.js](https://nextjs.org/docs/app/getting-started/installation).

## Personalizar

- `src/lib/event.ts`: nombre, fecha con zona horaria, rutas de fotos y música.
- `public/images/`: coloca aquí las fotos reales; asigna las rutas a `hero`, `portrait`, `detail` y `atmosphere`. La versión provisional reutiliza un retrato ficticio generado por IA con diferentes encuadres. No representa a la festejada ni el lugar del evento. Actualiza también los textos alternativos en `src/components/invitation.tsx` y elimina los recortes `.dress-crop`/`.candle-crop` cuando uses fotos de detalle propias.
- `public/audio/twilight.wav`: pieza ambiental sintetizada original de 48 segundos, provisional y en bucle. Sustituye por tu canción autorizada (por ejemplo `.mp3`) y cambia la ruta en `event.ts`.
- `src/app/globals.css`: paleta, tipografía, encuadres y composiciones responsivas. Usa serif del sistema; el aspecto de las letras puede variar según el dispositivo.
- `src/app/layout.tsx`: título, descripción y metadatos. Esta maqueta tiene `noindex`; revisarlo al preparar una publicación real.

La cuenta regresiva apunta a **00:00 del 19/12/2026, UTC−06:00 (Ciudad de México)**. Es el inicio de la fecha, no una hora confirmada de celebración. Es independiente de la zona del visitante, usa el reloj de su dispositivo y se detiene en cero al llegar la fecha.

## Estructura

```text
src/app/                 Página, layout y estilos
src/components/          Experiencia, countdown y controles de música
src/lib/                 Configuración y cálculo de tiempo con pruebas
public/images/           Imagen editorial provisional local
public/audio/            Música provisional local
docs/                    Dirección visual y procedencia de recursos
```

## Comportamiento

«Descubrir» inicia la música con entrada gradual y desplaza el foco y la vista a la historia. Los controles permiten reproducir, pausar y silenciar. Si falla el audio, la invitación sigue siendo navegable. Al ocultar la pestaña, la música se pausa; se reanuda manualmente. No hay autoplay al cargar.

Hay parallax suave, revelaciones de texto e imagen, galería editorial asimétrica, fecha, countdown y cierre. `prefers-reduced-motion` desactiva desplazamientos animados y ondas. Hay navegación por teclado, enlace para saltar la apertura y botones con etiquetas accesibles. El contenido permanece visible sin JavaScript; los controles, countdown y animaciones lo requieren.

No se implementan RSVP, venue, itinerario, QR/NFC, mesas ni dashboard. No se recopilan datos y no se ha publicado el sitio.
