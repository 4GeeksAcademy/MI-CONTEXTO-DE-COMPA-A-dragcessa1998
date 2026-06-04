# Progress — Estado del desarrollo

> Banco de memoria · **estado actual y próximos pasos**. Es el archivo que más
> cambia: actualízalo en cada sesión (qué se completó, qué decisiones se tomaron,
> qué sigue). Un banco de memoria desactualizado deja de ser útil en días.

## Completado

- **Hito 0 — Elige tu empresa** ✅ — `company-choice.md` + `CONTEXT.md` (Nexova). Empresa bloqueada: **Nexova**. Departamentos foco: Operaciones de Selección y Soporte externalizado.
- **Hito 1 — Web pública** ✅ — `index.html`, `application.html`, `validation.js` (HTML5 + Tailwind + Schema.org + validación JS). _Entregado a `main`._
- **Hito 2 — Lógica de negocio (TS)** ✅ — `src/` con interfaces (Candidate/Vacancy/SelectionProcess), filtros, búsqueda lineal/binaria, **motor de scoring 0-100**, agregaciones y validaciones. `tsc --noEmit` limpio; demo correcta (scores 100/82/10). _Rama + PR._
- **Hito 3 — Talent Pipeline Tracker** ✅ — `uis/talent-pipeline-tracker` (Next.js 14) sobre la API del curso: listado con filtros/búsqueda, detalle con PATCH, notas CRUD, alta/edición. `next build` OK. _Rama + PR._

## En curso

- **Hito 4 — Ingeniería impulsada por IA** 🛠️
  - `memory-bank/` (este banco) ✅
  - `AGENTS.md` + `.agents/rules` + `.agents/skills` ✅
  - `uis/website` (web del Hito 1 → componentes React) ✅
  - `uis/backoffice` (layout propio + **importa** la lógica del Hito 2, output visible) ✅
  - Entrega: rama `milestone-4` + PR.

## Decisiones recientes

- La lógica de negocio del Hito 2 queda como **fuente única en `/src`**; `uis/backoffice` la **importa** mediante alias de TS (sin copiar).
- `uis/website` y `uis/backoffice` tienen **layouts independientes**.

## Próximos pasos previstos

- **Hito 5 — Backend:** API central en `/services` (candidatos, vacantes, procesos), conectando la lógica de `/src`.
- **Hito 6 — Telemetría** · **Hito 7 — RAG/memoria** · **Hito 8 — Agentes** · **Hito 9 — Workflows** · **Hito 10 — Tiempo real**.

## Tareas del usuario pendientes (no automatizables por el agente)

- Verificar Codespaces y **entregar en la plataforma 4Geeks** la URL/PR de cada hito.
- Revisar y **mergear los PRs** de los Hitos 2 y 3 a `main` (el Hito 4 asume la lógica del Hito 2 presente en el monorepo).

Relacionado: [[projectbrief]] · [[techContext]]
