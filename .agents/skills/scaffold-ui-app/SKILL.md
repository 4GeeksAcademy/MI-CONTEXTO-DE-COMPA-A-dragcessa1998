---
name: scaffold-ui-app
description: Crea una nueva app Next.js dentro de uis/ siguiendo las convenciones del monorepo de Nexova.
inputs:
  - app_name: nombre en kebab-case de la app (carpeta bajo uis/), p. ej. "backoffice"
  - purpose: una frase con el propósito de la app (web pública, dashboard interno, etc.)
  - shares_business_logic: boolean — ¿necesita importar la lógica de negocio de /src?
---

# Skill: scaffold-ui-app

## Objetivo (único)

Crear una nueva aplicación **Next.js (App Router) + TypeScript + Tailwind** dentro de
`uis/<app_name>/`, lista para desarrollar, **coherente con las convenciones del
monorepo** y sin duplicar lógica compartida.

## Inputs

| Input | Tipo | Descripción |
| --- | --- | --- |
| `app_name` | string (kebab-case) | Carpeta de la app bajo `uis/`. |
| `purpose` | string | Para qué es la app; define el contenido de la ruta `/`. |
| `shares_business_logic` | boolean | Si `true`, configura el alias de importación a `/src` (no copia código). |

## Pasos

1. Leer `memory-bank/techContext.md` y `.agents/rules/monorepo-conventions.md`.
2. Crear `uis/<app_name>/` con: `package.json`, `tsconfig.json`, `next.config.mjs`,
   `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.env.example`, `README.md`.
3. Crear `src/app/layout.tsx` (layout **propio** de la app), `src/app/globals.css` y
   `src/app/page.tsx` con una vista de entrada acorde a `purpose`.
4. Si `shares_business_logic`: añadir en `tsconfig.json` el alias
   `"@logic/*": ["../../src/*"]` y **importar** desde ahí (nunca copiar `/src`).
5. `npm install` y `npm run build`; corregir hasta que compile sin errores.
6. Actualizar `memory-bank/progress.md` con la nueva app.

## Criterios de aceptación (verificables)

- [ ] Existe `uis/<app_name>/` con su propia config Next.js + Tailwind.
- [ ] `npm run build` termina **sin errores** de tipos ni de compilación.
- [ ] La ruta `/` renderiza una vista de entrada (no una página 404 por defecto).
- [ ] La app tiene **layout propio**, distinto del de las demás apps de `uis/`.
- [ ] Si `shares_business_logic`: el código de `/src` se **importa** (búsqueda de
      `from "@logic/` da resultados) y **no** existe copia de esos archivos dentro de la app.
- [ ] Existe `.env.example` y `.gitignore` ignora `node_modules`, `.next` y `.env*.local`.
- [ ] `memory-bank/progress.md` menciona la nueva app.

## Cómo verificar

```bash
cd uis/<app_name> && npm install && npm run build   # debe terminar en "Compiled successfully"
grep -r "from \"@logic/" uis/<app_name>/src || echo "no importa lógica compartida"
test -d uis/<app_name>/src/lib/business-logic && echo "FALLO: lógica copiada" || echo "OK: sin copia"
```
