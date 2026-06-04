---
name: Convenciones del monorepo de Nexova
scope: always            # Alcance: SIEMPRE ACTIVA (aplica en cada sesión y cada archivo)
appliesTo: "**/*"
---

# Regla: Convenciones del monorepo (siempre activa)

**Alcance de aplicación:** _siempre activa_ — esta regla rige para cualquier archivo
del repositorio y en todas las sesiones del agente.

## Ubicación del código (no crear carpetas nuevas a ciegas)

- Frontend público → `uis/website`. App interna/dashboards → `uis/backoffice`.
  Cada nueva UI es una app Next.js bajo `uis/` con **layout propio**.
- Lógica de negocio compartida (TS) → **una sola vez en `/src`**; las apps la
  **importan** (alias de TS), nunca la copian.
- APIs/workers → `/services`. Tipos/utilidades comunes → `packages/shared`.
- Config de agentes → `.agents/` (NO confundir con `/agents` y `/skills`, que son
  producto de la empresa).
- Antes de crear una carpeta, revisa el `README.md` de la carpeta destino.

## Estilo y tipado

- TypeScript `strict`, sin `any`. Tipos explícitos en funciones exportadas.
- `camelCase` (variables/funciones), `PascalCase` (componentes/tipos/interfaces).
- Componentes React reutilizables y tipados; estado con hooks (sin Redux/Zustand).
- Tailwind CSS para estilos; mantener la identidad visual establecida.

## Dominio

- Mostrar **siempre etiquetas legibles**; nunca valores crudos de la API
  (p. ej. `in_progress` → "En proceso").
- Respetar nombres de campos, estados y valores definidos en `CONTEXT.md`.

## Seguridad y entrega

- Nunca commitear `.env*.local` ni secretos; cada app incluye `.env.example`.
- Trabajar en rama de hito y entregar por **Pull Request** hacia `main`.
- Antes de commitear, ejecutar el flujo de `AGENTS.md` (build + actualizar memory-bank).
