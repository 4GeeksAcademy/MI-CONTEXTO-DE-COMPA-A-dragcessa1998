# Nexova — Guía profesional de 0 a Experto

Esta carpeta contiene el **libro-guía** del proyecto Nexova: una explicación completa, de
nivel principiante a experto, de todo el monorepo, escrita con la estructura editorial de los
libros técnicos de O'Reilly.

## El entregable

- **[`Nexova-Guia-De-0-a-Experto.pdf`](./Nexova-Guia-De-0-a-Experto.pdf)** — el libro completo
  en PDF (111 páginas): portada con el logo de 4Geeks y el banner de Nexova, índice navegable,
  tres partes, 13 capítulos, 3 apéndices, recuadros *Tip / Nota / Aviso / Importante*, código
  real del repositorio con resaltado de sintaxis y numeración de páginas.

## Contenido del libro

| Parte | Capítulos |
| --- | --- |
| **I — Fundamentos** | 1. El panorama · 2. Conceptos esenciales · 3. Prepara tu entorno |
| **II — Construyendo Nexova hito a hito** | 4. Hitos 0 y 1 (web pública) · 5. Hito 2 (lógica TS de scoring) · 6. Hito 3 (Talent Pipeline Tracker) · 7. Hito 4 (infra AI-ready) · 8. La Talent API · 9. Supplier Directory (FastAPI) |
| **III — De usuario a experto** | 10. Operación y troubleshooting · 11. Arquitectura · 12. Calidad profesional · 13. Git y entrega |
| **Apéndices** | A. Comandos · B. Glosario · C. Mapa del repositorio |

## Estructura de la carpeta

```
docs/guia/
├── Nexova-Guia-De-0-a-Experto.pdf   # el libro (entregable)
├── README.md                        # este archivo
├── src/                             # fuentes en Markdown, una por sección
│   ├── 00-prefacio.md
│   ├── 01-que-es.md
│   └── …  (17 secciones)
├── assets/                          # imágenes de portada
│   ├── 4geeks-logo.png
│   └── nexova.png
├── template.html                    # plantilla pandoc con el CSS estilo O'Reilly
└── build.py                         # ensambla las secciones → HTML
```

## Cómo se generó

1. **Redacción**: cada sección se escribió leyendo el código real del repositorio (no hay
   ejemplos inventados; todas las rutas y fragmentos son verificables).
2. **Revisión ortográfica**: cada sección pasó por una corrección de español (normas de la RAE).
3. **Ensamblado** con [pandoc](https://pandoc.org): `python3 build.py` toma `src/*.md`, inserta
   los divisores de parte y la portada, y produce `guide.html` con `template.html`.
4. **PDF** con Google Chrome en modo *headless* (la numeración de páginas se añade vía DevTools).

## Cómo regenerarlo

Requisitos: `pandoc` y Google Chrome.

```bash
# 1) Edita las secciones que quieras en src/*.md
# 2) Ensambla el HTML
python3 build.py
# 3) Genera el PDF (versión portátil, sin numeración de pie):
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --print-to-pdf=Nexova-Guia-De-0-a-Experto.pdf \
  guide.html
```

> La versión publicada se renderizó con un script que usa el protocolo DevTools de Chrome para
> añadir el pie de página con numeración; el comando de arriba produce el mismo libro sin ese pie.
