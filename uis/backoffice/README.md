# Nexova — Backoffice interno (Hito 4)

App interna de Nexova (Next.js + TypeScript) con **layout propio** (sidebar), separado
del de la web pública. Su panel de inicio **integra la lógica de negocio del Hito 2**
importándola desde su ubicación original en el monorepo (`/src`) — **sin copiarla** — y
muestra el resultado en pantalla (no solo en consola).

## Qué muestra el panel (`/`)

- **KPIs** del banco de talento: nº de candidatos, salario esperado medio, conteo por estado.
- **Top de habilidades** más frecuentes.
- **Ranking de candidatos** para una vacante, calculado con `calculateCandidateScore` /
  `rankCandidatesForVacancy` del módulo de lógica del Hito 2.

## Ejecutar

```bash
cd uis/backoffice
npm install
npm run dev      # http://localhost:3000
```

## Integración sin duplicar

El alias `@logic/*` (en `tsconfig.json`) apunta a `../../src/*`:

```ts
import { rankCandidatesForVacancy } from "@logic/utils/transformations";
import { sampleCandidates, sampleVacancy } from "@logic/data/sampleData";
```

Así la lógica vive una sola vez en `/src` y el backoffice la reutiliza.
