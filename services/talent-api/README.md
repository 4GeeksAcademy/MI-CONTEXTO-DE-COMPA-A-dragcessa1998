# Nexova Talent API (Hito 5 — Backend)

API central de Nexova para el dominio de talento: **candidatos, vacantes, scoring y
reportes**. Implementada con **Express + TypeScript** en `/services`. **Reutiliza** toda
la lógica de negocio del Hito 2 (`/src`) vía el alias `@logic` — no la duplica.

## Ejecutar

```bash
cd services/talent-api
npm install
npm run dev        # http://localhost:4000  (recarga en caliente)
# o: npm start
npm run typecheck  # tsc --noEmit
```

## Endpoints

| Método | Ruta | Descripción | Lógica del Hito 2 |
| --- | --- | --- | --- |
| GET | `/health` | Estado y conteos | — |
| GET | `/candidates?seniority=&availability=` | Lista/filtra candidatos | `filterCandidatesBySeniority`, `filterCandidatesByAvailability` |
| GET | `/candidates/:id` | Candidato por ID | `findCandidateById` (búsqueda lineal) |
| POST | `/candidates` | Alta de candidato (valida) | `validateCandidate` |
| GET | `/vacancies` · `/vacancies/:id` | Vacantes | — |
| POST | `/vacancies` | Alta de vacante (valida) | `validateVacancy` |
| GET | `/vacancies/:id/ranking` | **Ranking de candidatos** | `rankCandidatesForVacancy` (scoring 0-100) |
| GET | `/reports/summary` | Salario medio, conteo por estado, top skills | `calculateAverageSalary`, `countCandidatesByStatus`, `findTopSkills` |

### Ejemplos

```bash
curl localhost:4000/health
curl "localhost:4000/candidates?seniority=Senior"
curl localhost:4000/vacancies/V-2024-0892/ranking
curl localhost:4000/reports/summary
curl -X POST localhost:4000/candidates -H 'Content-Type: application/json' \
  -d '{"fullName":"Ana Ruiz","email":"ana@mail.com","phone":"+34600000000","yearsOfExperience":4,"skills":["TypeScript"],"englishLevel":"B2","seniority":"Semi-Senior","currentSalary":3000,"expectedSalary":3500,"availability":"1 month","location":"Valencia","remoteOnly":false,"status":"Active"}'
```

## Integración sin duplicar

`tsconfig.json` define `"@logic/*": ["../../src/*"]`, de modo que la API importa la
lógica de negocio desde su fuente única en el monorepo:

```ts
import { rankCandidatesForVacancy } from "@logic/utils/transformations";
```

El almacenamiento es **en memoria** (sembrado con los datos del Hito 2); se sustituirá
por una base de datos en un hito posterior.
