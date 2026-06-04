# Nexova — Web pública (Hito 4)

Versión en **Next.js (App Router) + TypeScript + Tailwind** de la web corporativa de
Nexova, migrada y mejorada desde el Hito 1 con **componentes React reutilizables**.

- `/` — landing corporativa (hero, servicios, por qué Nexova, contacto).
- `/apply` — formulario de registro de talento con validación en cliente.

## Ejecutar

```bash
cd uis/website
npm install
npm run dev      # http://localhost:3000
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx        # layout público (header + footer)
│   ├── page.tsx          # landing (compone las secciones)
│   └── apply/page.tsx    # formulario de talento
├── components/website/   # Hero, Services, WhyNexova, Contact, ApplyForm, …
├── data/company.ts       # datos de la empresa tipados (servicios, stats, contacto)
└── lib/validation.ts     # validación del formulario (mensajes del CONTEXT del Hito 1)
```

Las secciones y textos provienen del contexto de Nexova; el contenido del Hito 1 se
reorganiza en componentes tipados sin perder ninguna sección.
