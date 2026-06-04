# Progress — Estado del desarrollo

> Banco de memoria · **estado actual y próximos pasos**. Es el archivo que más
> cambia: actualízalo en cada sesión (qué se completó, qué decisiones se tomaron,
> qué sigue). Un banco de memoria desactualizado deja de ser útil en días.

## Completado

- **Hito 0 — Elige tu empresa** ✅ — `company-choice.md` + `CONTEXT.md` (Nexova). Empresa bloqueada: **Nexova**. Departamentos foco: Operaciones de Selección y Soporte externalizado. _Entregado a `main`._
- **Hito 1 — Web pública** ✅ — `index.html`, `application.html`, `validation.js` (HTML5 + Tailwind + Schema.org + validación JS). _Entregado a `main`._
- **Hito 2 — Lógica de negocio (TS)** ✅ — `src/` con interfaces (Candidate/Vacancy/SelectionProcess), filtros, búsqueda lineal/binaria, **motor de scoring 0-100**, agregaciones y validaciones. `tsc --noEmit` limpio; demo correcta (scores 100/82/10). _Rama `hito-2-fundamentos-programacion` + PR._
- **Hito 3 — Talent Pipeline Tracker** ✅ — `uis/talent-pipeline-tracker` (Next.js 14) sobre la API del curso: listado con filtros/búsqueda, detalle con PATCH, notas CRUD, alta/edición. `next build` OK. _Rama `hito-3-talent-pipeline-tracker` + PR._
- **Hito 4 — Ingeniería impulsada por IA** ✅ — `memory-bank/` + `AGENTS.md` + `.agents/rules` + `.agents/skills`; `uis/website` (web del Hito 1 → componentes React) y `uis/backoffice` (layout propio que **importa** la lógica del Hito 2 vía alias `@logic`, output visible: KPIs + ranking). `next build` OK en ambas. _Rama `milestone-4` + PR._
- **Hito 5 — Backend (proactivo)** ✅ — `services/talent-api` (Express + TS). API central que **reutiliza** la lógica del Hito 2 (alias `@logic`): CRUD completo de candidatos (GET/POST/PUT/PATCH/DELETE), vacantes (GET/POST/DELETE), procesos de selección (GET/POST), `GET /vacancies/:id/ranking` (scoring), `GET /reports/summary` y `GET /reports/fill-rate`, con CORS. Almacenamiento en memoria sembrado del Hito 2. Verificado levantando la API. _Rama `milestone-5` + PR._ Nota: construido según la definición del README; reconciliar con la rúbrica oficial del Hito 5 cuando se publique.

## Decisiones recientes

- La lógica de negocio del Hito 2 queda como **fuente única en `/src`**; `uis/backoffice` y `services/talent-api` la **importan** mediante alias de TS (`@logic`), sin copiar.
- `uis/website` y `uis/backoffice` tienen **layouts independientes**.
- Cada rama de entrega incluye su propia copia de `/src` para que **compile de forma aislada**; se reconcilia al mergear los PRs en orden (**2 → 3 → 4 → 5**).

## Integración full-stack (Hito 4 ↔ Hito 5)

- **Backoffice conectado a la API real** ✅ — `uis/backoffice` ya NO importa la lógica del Hito 2 de forma estática: consume la **Nexova Talent API** en vivo por HTTP (con CORS). Cliente tipado en `src/lib/api.ts`; panel cliente en `src/components/Dashboard.tsx` (KPIs desde `/reports/*`, ranking desde `/vacancies/:id/ranking`, conteos, **alta de candidato** con validación 400 y **recálculo en vivo**, estados carga/error/sin-conexión). Solo reutiliza ya los **tipos** de `@logic`. `tsc --noEmit` limpio + `next build` OK. Verificado de punta a punta contra la API (GET reports/ranking, preflight OPTIONS 204, POST 201 / 400, summary y ranking cambian tras crear).

## Próximos pasos previstos

- **Hito 6 — Telemetría** · **Hito 7 — RAG/memoria** · **Hito 8 — Agentes** · **Hito 9 — Workflows** · **Hito 10 — Tiempo real** (aún sin rúbrica publicada en el syllabus).
- Posible mejora pendiente: conectar también el **tracker** (Hito 3) a la `services/talent-api` real.

## Tareas del usuario pendientes (no automatizables por el agente)

- Verificar Codespaces y **entregar en la plataforma 4Geeks** la URL/PR de cada hito.
- Revisar y **mergear los PRs** en orden (Hitos 2 → 3 → 4 → 5) a `main`.

Relacionado: [[projectbrief]] · [[techContext]]
