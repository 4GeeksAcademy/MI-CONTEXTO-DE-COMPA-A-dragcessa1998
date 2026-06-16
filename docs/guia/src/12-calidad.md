# Capítulo 12. Calidad profesional: estructura, convenciones y accesibilidad

Un proyecto puede "funcionar" y, aun así, ser frágil: carpetas desordenadas, nombres inconsistentes, artefactos pesados subidos al repositorio (el lugar donde vive el historial del código bajo control de versiones con Git) y una interfaz que solo entienden quienes ven la pantalla. Lo que separa un ejercicio de clase de un proyecto profesional no es la cantidad de funcionalidades, sino la disciplina con la que está construido. En este capítulo verás, con código real del monorepo de Nexova, qué decisiones convierten este repositorio en algo que otra persona (o un agente de código) puede entender, mantener y extender sin romper nada.

Un monorepo es un único repositorio que contiene varias aplicaciones y servicios relacionados, en lugar de un repositorio por proyecto. Nexova reúne en uno solo tres aplicaciones Next.js, dos backends y la lógica de negocio compartida.

En este capítulo aprenderás:

- Cómo se organiza el monorepo y por qué cada cosa tiene un único sitio.
- Las convenciones de nombres (PascalCase, camelCase, snake_case) y de dónde provienen.
- Qué evita versionar el `.gitignore` y por qué eso importa.
- Cómo se construye una interfaz accesible con atributos ARIA, roles y etiquetas.
- Cómo se manejan los estados de carga, error y éxito de forma uniforme.
- Por qué los docstrings y comentarios forman parte de la calidad y no son un extra.
- Qué falta todavía (los tests) y cómo sería el siguiente paso honesto.

## La estructura como contrato

La regla maestra del proyecto vive en `.agents/rules/monorepo-conventions.md`. Su cabecera declara `scope: always`, lo que significa que se aplica en cada sesión y a cualquier archivo (`appliesTo: "**/*"`). No es una sugerencia: es el contrato que rige dónde va cada cosa.

```markdown
## Ubicación del código (no crear carpetas nuevas a ciegas)

- Frontend público → `uis/website`. App interna/dashboards → `uis/backoffice`.
- Lógica de negocio compartida (TS) → **una sola vez en `/src`**; las apps la
  **importan** (alias de TS), nunca la copian.
- APIs/workers → `/services`. Tipos/utilidades comunes → `packages/shared`.
```

La consecuencia más valiosa de esta regla es la fuente única de verdad. La lógica de scoring de candidatos (el motor de puntuación del Hito 2) se escribe una sola vez en `/src` y las demás piezas la importan a través del alias `@logic`. El backoffice y la `talent-api` reutilizan esos tipos en lugar de copiarlos; si un día cambia la definición de `Candidate`, cambia en un solo lugar. El propio `AGENTS.md`, en su flujo previo a cada commit (la acción de guardar un conjunto de cambios en el historial de Git), lo exige de forma explícita: "Asegúrate de que la lógica compartida se **importa** desde su fuente única (`/src`, `packages/shared`) y no se ha copiado".

El `AGENTS.md` también incluye una tabla de "Dónde va cada cosa", que funciona como índice mental del repositorio:

| Tipo de código | Ubicación |
| --- | --- |
| Web pública | `uis/website` |
| App interna / dashboards | `uis/backoffice` |
| Lógica de negocio compartida (TS) | `/src` (fuente única, se importa) |
| APIs / workers backend | `/services` |
| Config de agentes (reglas/skills) | `.agents/` |

::: {.callout .note}
**Nota:** carpetas como `agents/`, `data/`, `packages/`, `scripts/` o `infra/` son andamiaje intencional de la plantilla de 4Geeks. Hoy solo traen un `README.md` que describe su propósito para futuros hitos. Existen para que el proyecto crezca sin reorganizaciones, no porque estén vacías por descuido.
:::

## Convenciones de nombres

La sección "Estilo y tipado" de las convenciones fija las reglas de nomenclatura, que cambian según el lenguaje:

- **PascalCase** para componentes React, tipos e interfaces. Cada palabra empieza en mayúscula y sin separadores. Lo ves en `RankingTable.tsx`, `SuppliersView.tsx` o en el tipo `Candidate`.
- **camelCase** para variables y funciones de TypeScript. La primera palabra va en minúscula. Lo ves en `deleteRecord`, `findCandidateById` o `binarySearchCandidateBySalary`.
- **snake_case** para Python, donde las palabras se separan con guion bajo. Lo ves en `monthly_rate`, `contract_renewal_date` o `rate_updated_at` en `services/api/models.py`.

Estas no son manías estéticas: son las convenciones idiomáticas de cada ecosistema. Un desarrollador de TypeScript espera `camelCase`; uno de Python espera `snake_case`. Respetarlas hace que el código se lea "como nativo" en cada lenguaje. Además, el `tsconfig.json` de la raíz activa `"strict": true` junto con `forceConsistentCasingInFileNames`, de modo que el compilador de TypeScript (la herramienta que verifica los tipos antes de ejecutar) rechaza errores que en un proyecto laxo pasarían inadvertidos.

## El `.gitignore`: no versionar lo que se regenera

Un buen `.gitignore` (el archivo que lista lo que Git debe ignorar) mantiene el repositorio limpio: solo se versiona lo que un humano escribe, nunca lo que una máquina genera. Nexova distribuye esta responsabilidad en varios `.gitignore`, uno por contexto.

El de la raíz cubre lo común a todo el monorepo:

```bash
node_modules/
*.log
.DS_Store
dist/
*.tsbuildinfo
```

Cada aplicación Next.js añade lo suyo. El de `uis/backoffice/.gitignore` ignora la carpeta de compilación `/.next/`, los archivos de entorno y los artefactos de TypeScript:

```bash
/node_modules
/.next/
/out/
.env
.env.local
.env*.local
*.tsbuildinfo
next-env.d.ts
```

Y el backend de Python, en `services/api/.gitignore`, ignora el entorno virtual, las cachés de bytecode y la propia base de datos de runtime:

```bash
.venv/
__pycache__/
*.egg-info/
suppliers.db.json
```

Vale la pena entender el porqué de cada entrada:

| Patrón | Qué es | Por qué se ignora |
| --- | --- | --- |
| `node_modules/` | Dependencias de Node.js | Se reinstalan con `npm install`; pesan cientos de MB. |
| `.next/`, `dist/` | Salida de compilación | Se regenera con cada build. |
| `.venv/` | Entorno virtual de Python | Específico de tu máquina; se recrea con `uv`. |
| `__pycache__/` | Bytecode compilado | Lo genera el intérprete automáticamente. |
| `.env`, `.env*.local` | Variables de entorno y secretos | Nunca deben salir de tu equipo. |
| `suppliers.db.json` | Base de datos TinyDB de runtime | Es estado en vivo, no código fuente. |

::: {.callout .important}
**Importante:** la regla de seguridad de las convenciones es tajante: "Nunca commitear `.env*.local` ni secretos; cada app incluye `.env.example`". El `.env.example` documenta qué variables hace falta definir (por ejemplo, `NEXT_PUBLIC_API_URL`) sin filtrar ningún valor real. Es la diferencia entre enseñar la forma de la cerradura y entregar la llave.
:::

## Accesibilidad: una interfaz para todo el mundo

La accesibilidad es la práctica de construir interfaces usables por personas con discapacidad, en especial quienes navegan con lectores de pantalla (software que lee la pantalla en voz alta). En Nexova no es un retoque final: está cosida en los componentes.

**Tablas con `scope="col"`.** En `uis/backoffice/src/components/SuppliersView.tsx`, cada cabecera de columna declara su alcance, lo que permite al lector de pantalla asociar cada celda con su columna:

```tsx
<th scope="col" className="px-4 py-3">Proveedor</th>
<th scope="col" className="px-4 py-3">País</th>
<th scope="col" className="px-4 py-3">Tarifa mensual</th>
```

**Regiones que anuncian cambios.** Los componentes de `uis/talent-pipeline-tracker/src/components/ui.tsx` usan `role` y `aria-live` para que los estados asíncronos se anuncien sin que el usuario tenga que buscarlos. El indicador de carga es una región de estado "educada" (`aria-live="polite"` espera a que el lector termine la frase actual):

```tsx
<div role="status" aria-live="polite" className="...">
  <span className="... animate-spin ..." />
  {label}
</div>
```

El mensaje de error usa `role="alert"`, que el lector anuncia de inmediato por su urgencia:

```tsx
<div role="alert" className="...">
  <p className="font-semibold">Algo salió mal</p>
  <p className="mt-1 text-sm">{message}</p>
</div>
```

**Confirmaciones con `role="alertdialog"`.** Antes de borrar una candidatura, `CandidateDetail.tsx` muestra una confirmación en línea identificada como diálogo de alerta y con etiqueta descriptiva:

```tsx
<div role="alertdialog" aria-label="Confirmar eliminación" className="...">
```

**Etiquetas en controles sin texto visible.** Donde un botón o un `select` no tiene texto propio, se le añade un `aria-label`. En `PipelineBoard.tsx`:

```tsx
aria-label={`Cambiar etapa de ${candidateName(process.candidateId)}`}
```

Esta misma disciplina viene del Hito 1: el formulario estático de `application.html` ya usaba `role="status"` para el mensaje de éxito y `role="alert"` para cada error de campo. La accesibilidad es una constante del proyecto, no un añadido de última hora.

## Manejo de errores y estados, también legible

Las convenciones piden mostrar "siempre etiquetas legibles; nunca valores crudos de la API (p. ej., `in_progress` → 'En proceso')". Eso se centraliza en `lib/labels.ts` y se usa en los badges. Un estado interno técnico nunca llega tal cual al usuario.

El manejo de errores está unificado en una sola función. En `uis/talent-pipeline-tracker/src/lib/api.ts`, todas las peticiones pasan por `request`, que lanza un error legible cuando la respuesta no es correcta:

```ts
if (!response.ok) {
  throw new Error(await extractError(response));
}
```

`extractError` intenta extraer el mensaje real del backend y, si no puede, compone uno con el código de estado. Así, un 422 de validación de Pydantic se traduce en un texto que el componente `ErrorState` muestra con su botón "Reintentar". El frontend nunca se queda en blanco ante un fallo.

En el backend, el patrón equivale. `services/api/routes/suppliers.py` declara en su docstring el contrato de códigos HTTP y lo cumple con una función auxiliar:

```python
def _get_or_404(supplier_id: int) -> Document:
    doc = suppliers_table().get(doc_id=supplier_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return doc
```

| Código | Significado | Cuándo |
| --- | --- | --- |
| 201 | Creado | `POST /suppliers` con datos válidos. |
| 404 | No encontrado | ID que no existe. |
| 422 | Entrada inválida | La rechaza Pydantic antes de tocar TinyDB. |

## Docstrings y comentarios: documentación que vive con el código

Un docstring es el bloque de documentación al principio de un módulo, clase o función. En Python, `services/api/models.py` abre con uno que explica de dónde sale cada regla:

```python
"""
Modelos Pydantic del Directorio de Proveedores de Nexova.

Los nombres de campos, las categorías válidas y los estados permitidos replican
EXACTAMENTE lo definido en CONTEXT.md.
Pydantic rechaza con 422 cualquier entrada que no cumpla antes de tocar TinyDB.
"""
```

Y `main.py` documenta incluso el caso límite raro: un handler de validación que sanea `Infinity`/`NaN` para que un 422 no se convierta por accidente en un 500. El comentario explica el porqué, no el qué: "sin este handler, FastAPI eco-serializa el valor no finito y el 422 se convierte en 500". En TypeScript ocurre lo mismo: cada función de `src/utils/search.ts` lleva un bloque JSDoc que aclara supuestos, como que `binarySearchCandidateBySalary` "asume que `sortedCandidates` está ordenado de forma ascendente". Documentar el supuesto evita un bug futuro.

## Lo que está bien y lo que falta

Las auditorías de estructura del proyecto dieron buen resultado: organización impecable, separación clara de responsabilidades y los 6 hitos (del 0 al 4, más la web del Hito 1) completos y verificados con `npm run typecheck` y `next build` limpios. Pero la honestidad profesional obliga a nombrar lo que aún no existe.

::: {.callout .warning}
**Aviso:** hoy el repositorio no tiene tests automatizados. Una búsqueda de archivos `*.test.*`, `*.spec.*` o `test_*.py` no devuelve ninguno, y ni `vitest` ni `pytest` figuran como dependencias. El tipado estricto y las validaciones de Pydantic dan una red de seguridad, pero no sustituyen a las pruebas.
:::

El siguiente paso de calidad es claro y de bajo riesgo:

- **`pytest` para `services/api`**: probar que un `POST` con país y moneda incoherentes devuelve 422, que un ID inexistente da 404 y que `PATCH /{id}/rate` vuelve a sellar `rate_updated_at`. El comportamiento ya está definido en los docstrings; faltan los tests que lo fijen.
- **`vitest` para `src/`**: el motor de scoring de cinco componentes que suman 100 y la búsqueda binaria son funciones puras, el escenario ideal para pruebas unitarias rápidas y deterministas.

## Resumen

- La regla `monorepo-conventions.md` (con `scope: always`) define un sitio único para cada cosa; la lógica compartida vive en `/src` y se importa vía `@logic`, nunca se copia.
- Los nombres siguen la convención idiomática de cada lenguaje: PascalCase para componentes y tipos, camelCase para utilidades TS, snake_case para Python.
- Varios `.gitignore` por contexto evitan versionar lo regenerable (`node_modules`, `.next`, `.venv`, `__pycache__`) y, sobre todo, los secretos (`.env*.local`).
- La accesibilidad está integrada: `scope="col"`, `role="alert"`/`role="status"`, `aria-live` y `aria-label` hacen la interfaz usable con lector de pantalla.
- Errores y estados se manejan de forma uniforme (función `request`, componentes `LoadingState`/`ErrorState`, códigos 201/404/422) y siempre con etiquetas legibles.
- Falta lo más visible de la pirámide de calidad: los tests. El siguiente paso es `pytest` para `services/api` y `vitest` para `src/`.