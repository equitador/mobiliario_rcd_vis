# Mobiliario RCD para viviendas VIS

Landing page de la propuesta académica de investigación-creación sobre diseño y
fabricación de mobiliario con **residuos de construcción y demolición (RCD)** para
los espacios de apartamentos de **vivienda de interés social (VIS)** en Colombia.

> Transformamos residuos en nuevas formas de habitar.

## Stack técnico

Sitio **estático, sin build ni dependencias**: HTML semántico + CSS (utilidades
Tailwind compiladas en `assets/css/styles.css`) + JavaScript vanilla
(`assets/js/app.js`). No requiere Node.js, npm ni bundler: basta un servidor
de archivos estático.

| Pieza | Detalle |
|---|---|
| Maquetación | Tailwind CSS (salida compilada incluida en el repo) |
| Tipografías | Sora (titulares), Manrope (texto y etiquetas) — vía Google Fonts |
| Iconos | Remix Icon + Font Awesome (CDN) |
| Paleta | Tokens OKLCH en `:root` (`--background-*`, `--primary-*`, `--secondary-*`, `--accent-*`, `--foreground-*`) |
| Imágenes | 16 fotografías/renders locales en `assets/img/` |
| Interacciones | Header fijo que cambia con el scroll, menú móvil a pantalla completa, reveal on-scroll con `IntersectionObserver`, scroll suave entre anclas |

## Estructura

```
├── index.html              # Página única con las 9 secciones
├── assets/
│   ├── css/styles.css      # Tailwind compilado + tokens de tema (OKLCH)
│   ├── js/app.js           # Header, menú móvil y reveal on-scroll
│   ├── img/                # Imágenes locales (rcd-vis-*.jpg)
│   └── favicon.svg
└── README.md
```

## Secciones

1. **Inicio** — hero a pantalla completa con imagen de fondo, badge "Propuesta
   académica", CTA y indicador de scroll animado.
2. **Origen** — "Del residuo al hogar": narrativa de la segunda vida de los RCD.
3. **Diseño** — tres decisiones clave: origen visible, calidez material y diseño
   para cada espacio.
4. **Espacios** — piezas por ambiente (sala-comedor, habitaciones, cocina, baño,
   balcón) en grid asimétrico sobre fondo oscuro.
5. **Materiales** — RCD recuperado, madera recuperada, textiles reciclados y
   metal recuperado.
6. **Proceso** — línea de tiempo de 5 pasos (recuperación → integración).
7. **Historia** — sello de procedencia con espacio reservado para código QR.
8. **Cuidado** — 5 tarjetas de mantenimiento.
9. **Cierre** — cita final sobre imagen de fondo + footer.

## Ejecutar en local

Cualquier servidor estático sirve. Por ejemplo con Python:

```bash
cd mobiliario-rcd-vis
python3 -m http.server 8000
# → http://localhost:8000
```

O con Node:

```bash
npx serve .
```

## Despliegue

Al ser estático funciona en cualquier hosting: GitHub Pages, Netlify, Vercel,
Cloudflare Pages, S3… En GitHub Pages basta con activar *Settings → Pages →
Deploy from a branch* apuntando a `main` (raíz).

## Interacciones implementadas (parity con el diseño original)

- **Header**: transparente sobre el hero; al superar 60 px de scroll pasa a
  `bg-background-50/95` con blur, borde inferior y compacta el padding.
- **Menú móvil**: overlay `fixed inset-0` con navegación completa y CTA.
- **Reveal on-scroll**: elementos con `opacity-0 translate-y-8` que entran con
  `transition-all duration-700 ease-out` y `transition-delay` escalonado
  (threshold 0.12, `rootMargin: 0px 0px -60px 0px`, se ejecuta una sola vez).
- **Scroll suave**: `scroll-behavior: smooth` + `scroll-padding-top: 5rem` para
  compensar el header fijo al navegar por anclas.
- **Hover en tarjetas**: zoom sutil de imagen (`group-hover:scale-105`) y cambio
  de borde.

## Notas

- Las imágenes son renders/ilustraciones del proyecto; se sirven como assets
  locales (sin dependencia de servicios externos).
- El bloque "Espacio reservado para el código QR" es un placeholder intencional
  del diseño: allí se insertará el QR definitivo por pieza.
