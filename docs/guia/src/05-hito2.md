# Capítulo 5. Hito 2: la lógica de negocio en TypeScript

En el Hito 1 construiste la cara visible de Nexova: una web pública estática que recibe candidatos. Pero detrás de cualquier consultora de selección de talento hay una pregunta que se repite mil veces al día: dada una vacante y una lista de personas, ¿quién encaja mejor y por qué? El Hito 2 responde a esa pregunta con código. Aquí dejas atrás el HTML y entras en el corazón del proyecto: una capa de lógica de negocio escrita en TypeScript que vive en la carpeta `src/` y que el resto del monorepo reutiliza como fuente única de verdad.

TypeScript es un lenguaje que añade un sistema de tipos estáticos sobre JavaScript. En palabras simples: te obliga a declarar de qué forma son tus datos (texto, número, lista de candidatos) y revisa, antes de ejecutar nada, que no estés mezclando peras con manzanas. Esa red de seguridad es justo lo que necesita un motor que decide carreras profesionales.

En este capítulo aprenderás:

- Cómo se modela el dominio de Nexova con interfaces y uniones de literales en `src/types/models.ts`.
- Qué es una función pura y por qué casi toda la lógica del Hito 2 lo es.
- Cómo funciona el motor de scoring de cinco componentes que suman 100 puntos (40/20/15/15/10), leyendo el código real.
- Cómo se implementa una búsqueda binaria por salario y cuándo conviene frente a una búsqueda lineal.
- Cómo validar candidatos y vacantes devolviendo errores legibles.
- Qué significa el `tsconfig` estricto y cómo ejecutar la capa con `npm run typecheck` y `npm run demo`.

## El modelo de dominio: describir el negocio con tipos

Antes de calcular nada hay que decidir cómo se ve cada cosa. Eso se llama *modelo de dominio*: la traducción del vocabulario del negocio (candidatos, vacantes, procesos) a estructuras de datos. En Nexova vive en `src/types/models.ts`.

El archivo arranca con *uniones de literales*, una construcción de TypeScript que limita un valor a un conjunto cerrado de textos exactos. Por ejemplo, el nivel de inglés solo puede tomar uno de siete valores:

```ts
export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
```

Si en cualquier punto del proyecto escribes `"b2"` en minúscula o `"Intermedio"`, el compilador lo rechaza. Esto elimina toda una familia de errores tontos sin escribir una sola línea de validación. Lo mismo ocurre con `SeniorityLevel`, `AvailabilityStatus`, `CandidateStatus`, `VacancyStatus` y `ProcessStage`.

Sobre esos tipos se levantan las *interfaces*, que describen la forma de un objeto: qué campos tiene y de qué tipo es cada uno. La entidad central es `Candidate`:

```ts
export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  skills: string[];
  englishLevel: EnglishLevel;
  seniority: SeniorityLevel;
  currentSalary: number;
  expectedSalary: number;
  availability: AvailabilityStatus;
  location: string;
  remoteOnly: boolean;
  status: CandidateStatus;
}
```

El archivo define cinco entidades clave, cada una con su responsabilidad:

| Interfaz | Qué representa |
|---|---|
| `Candidate` | Una persona en la base de talento de Nexova |
| `Vacancy` | Una posición abierta que se intenta cubrir para un cliente |
| `SelectionProcess` | El avance de un candidato por las fases de una vacante |
| `ValidationResult` | El resultado de una validación: `{ valid, errors }` |
| `ScoredCandidate` | Un candidato junto a su puntaje contra una vacante |

Fíjate en un detalle de diseño elegante al final del archivo. Hay tres constantes que actúan como *fuente única de verdad* para las escalas ordenadas:

```ts
export const ENGLISH_ORDER: readonly EnglishLevel[] = [
  "A1", "A2", "B1", "B2", "C1", "C2", "Native",
];

export const SENIORITY_ORDER: readonly SeniorityLevel[] = [
  "Junior", "Semi-Senior", "Senior", "Lead", "Executive",
];
```

La palabra clave `readonly` marca esos arreglos como inmutables: nadie puede reordenarlos ni añadirles elementos por accidente. Gracias a ellos, comparar si un inglés `C1` es mayor que un `B2` se reduce a comparar sus posiciones en la lista. El motor de scoring depende de esto, como verás enseguida.

::: {.callout .note}
**Nota:** los nombres de los campos (en inglés) y los valores literales coinciden exactamente con el documento `CONTEXT.md` redactado en el Hito 0. Esa correspondencia 1 a 1 entre el briefing de la empresa y el código es lo que hace que el modelo sea fiel al negocio real de Nexova.
:::

## Funciones puras: la base de todo el Hito

Casi toda la lógica de `src/utils/` está escrita como *funciones puras*. Una función es pura cuando cumple dos condiciones: dado el mismo argumento de entrada siempre devuelve el mismo resultado, y no produce *efectos secundarios* (no modifica variables externas, no escribe en disco, no muta los datos que recibe).

¿Por qué importa tanto aquí? Porque una función pura es trivial de razonar y de probar. Si `calculateCandidateScore(maría, vacante)` devuelve 82, devolverá 82 siempre, sin sorpresas. Y como no toca los datos originales, puedes encadenar operaciones sin miedo a que una corrompa el array que usará la siguiente.

Mira cómo `src/utils/collections.ts` ordena candidatos sin mutar la lista de entrada:

```ts
export function sortCandidatesBySalary(
  candidates: Candidate[],
  order: "asc" | "desc"
): Candidate[] {
  const factor = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (a, b) => (a.expectedSalary - b.expectedSalary) * factor
  );
}
```

El truco está en `[...candidates]`: el operador de propagación (*spread*) crea una copia nueva del arreglo antes de ordenarla. El método `sort` de JavaScript ordena *en su lugar*, así que ordenar directamente `candidates` cambiaría el original y arruinaría cualquier código que dependiera de él. Esta misma carpeta ofrece `filterCandidatesBySkills` (que exige tener todas las habilidades, comparando sin distinguir mayúsculas), `filterCandidatesBySeniority`, `filterCandidatesByAvailability` y `sortCandidatesByExperience`, todas puras.

::: {.callout .tip}
**Tip:** cuando trabajes con arreglos en TypeScript y quieras ordenarlos o invertirlos sin alterar el original, copia primero con `[...lista]`. Es una costumbre barata que evita errores difíciles de rastrear.
:::

## El motor de scoring: cinco componentes que suman 100

Este es el núcleo del Hito 2 y vive en `src/utils/transformations.ts`. La idea es sencilla de explicar y poderosa: el encaje entre un candidato y una vacante se descompone en cinco dimensiones, cada una con un peso fijo. La suma máxima es exactamente 100 puntos.

| Componente | Peso máximo | Qué mide |
|---|---|---|
| Habilidades | 40 | Cuántas skills requeridas y preferidas tiene |
| Experiencia | 20 | Si sus años caen en el rango de la vacante |
| Seniority | 15 | Cercanía entre su nivel y el requerido |
| Inglés | 15 | Si alcanza el nivel mínimo exigido |
| Salario | 10 | Si su expectativa cabe en la banda salarial |

Que un sistema de puntuación sea *explicable* (que puedas justificar cada punto ante un cliente o un candidato) es precisamente el reto estrella que Nexova le pidió al proyecto. Por eso cada componente es una función pequeña e independiente.

### Habilidades (40 puntos)

El componente de mayor peso. Premia las habilidades requeridas y suma un extra por las preferidas:

```ts
function scoreSkills(candidate: Candidate, vacancy: Vacancy): number {
  const candidateSkills = toSkillSet(candidate.skills);

  // Requeridas: 40 si las tiene todas, 20 si tiene >= 50%, 0 en otro caso.
  let requiredScore = 0;
  if (vacancy.requiredSkills.length === 0) {
    requiredScore = 40;
  } else {
    const matched = vacancy.requiredSkills.filter((skill) =>
      candidateSkills.has(skill.toLowerCase())
    ).length;
    const ratio = matched / vacancy.requiredSkills.length;
    if (ratio === 1) requiredScore = 40;
    else if (ratio >= 0.5) requiredScore = 20;
  }

  // Preferidas: +10 por cada una que tenga, con tope de +20.
  const matchedPreferred = vacancy.preferredSkills.filter((skill) =>
    candidateSkills.has(skill.toLowerCase())
  ).length;
  const preferredScore = Math.min(matchedPreferred * 10, 20);

  // La categoría completa está topada en 40 (para que el total máximo sea 100).
  return Math.min(40, requiredScore + preferredScore);
}
```

La función auxiliar `toSkillSet` convierte las habilidades a un `Set` en minúsculas. Un `Set` es una colección sin duplicados con búsqueda casi instantánea, y pasar todo a minúsculas hace que `"TypeScript"` y `"typescript"` cuenten como la misma habilidad. El `Math.min(40, ...)` final garantiza que, aunque sumes requeridas y preferidas, nunca te pases de 40.

### Experiencia (20 puntos)

```ts
function scoreExperience(candidate: Candidate, vacancy: Vacancy): number {
  const exp = candidate.yearsOfExperience;
  if (exp >= vacancy.minYearsExperience && exp <= vacancy.maxYearsExperience) {
    return 20;
  }
  const distance =
    exp < vacancy.minYearsExperience
      ? vacancy.minYearsExperience - exp
      : exp - vacancy.maxYearsExperience;
  return distance <= 2 ? 10 : 0;
}
```

Si los años caen dentro del rango pedido, 20 puntos completos. Si quedan fuera pero a no más de 2 años de distancia, media puntuación (10). Más lejos, cero. Es una forma humana de no descartar a alguien por un año de diferencia.

### Seniority e inglés (15 puntos cada uno)

Aquí entran en juego las constantes ordenadas que viste antes. El seniority compara posiciones y tolera una desviación de un escalón:

```ts
function scoreSeniority(candidate: Candidate, vacancy: Vacancy): number {
  const candidateIndex = SENIORITY_ORDER.indexOf(candidate.seniority);
  const requiredIndex = SENIORITY_ORDER.indexOf(vacancy.requiredSeniority);
  const diff = Math.abs(candidateIndex - requiredIndex);
  if (diff === 0) return 15;
  if (diff === 1) return 7;
  return 0;
}
```

El inglés es un umbral: basta con alcanzar o superar el nivel exigido para llevarse los 15 puntos, y no hay nada intermedio.

```ts
function scoreEnglish(candidate: Candidate, vacancy: Vacancy): number {
  const candidateIndex = ENGLISH_ORDER.indexOf(candidate.englishLevel);
  const requiredIndex = ENGLISH_ORDER.indexOf(vacancy.requiredEnglishLevel);
  return candidateIndex >= requiredIndex ? 15 : 0;
}
```

### Salario (10 puntos)

El de menor peso. Da 10 puntos si la expectativa salarial cae dentro de la banda de la vacante, y 5 si se pasa, pero por no más de un 20 %:

```ts
function scoreSalary(candidate: Candidate, vacancy: Vacancy): number {
  const expected = candidate.expectedSalary;
  if (expected >= vacancy.salaryRangeMin && expected <= vacancy.salaryRangeMax) {
    return 10;
  }
  if (
    expected > vacancy.salaryRangeMax &&
    expected <= vacancy.salaryRangeMax * 1.2
  ) {
    return 5;
  }
  return 0;
}
```

### La función pública: sumar y acotar

Las cinco funciones anteriores son privadas del módulo. La que el resto del proyecto consume es `calculateCandidateScore`, que las suma y, por seguridad, acota el resultado entre 0 y 100:

```ts
export function calculateCandidateScore(
  candidate: Candidate,
  vacancy: Vacancy
): number {
  const total =
    scoreSkills(candidate, vacancy) +
    scoreExperience(candidate, vacancy) +
    scoreSeniority(candidate, vacancy) +
    scoreEnglish(candidate, vacancy) +
    scoreSalary(candidate, vacancy);

  // Garantiza el rango 0-100.
  return Math.max(0, Math.min(100, total));
}
```

Apliquémoslo a María González (`C-2024-0451`) contra la vacante de ejemplo `Senior Full-Stack Developer`, ambos en `src/data/sampleData.ts`. María tiene TypeScript, React y Node.js (las tres requeridas → 40), más PostgreSQL entre las preferidas (+10, pero el componente se topa en 40). Sus 5 años caen en el rango 4-8 → 20. Es `Semi-Senior` frente a un `Senior` requerido, un escalón de diferencia → 7. Su inglés `B2` iguala el mínimo → 15. Y su expectativa de 4200 queda por debajo de la banda 5000-7000 → 0. Total: **40 + 20 + 7 + 15 + 0 = 82 puntos**. Ese 82 es exactamente el que verás en la salida de la demo y en el ranking que expone la talent-api del proyecto.

Para puntuar a varios candidatos a la vez existe `rankCandidatesForVacancy`, que mapea cada uno a un `ScoredCandidate` y los ordena de mayor a menor sin mutar el arreglo de entrada (de nuevo, función pura). El mismo archivo añade reportes agregados: `groupCandidatesBySeniority`, `countCandidatesByStatus`, `calculateAverageSalary`, `findTopSkills` y `calculateVacancyFillRate`, que calcula qué porcentaje de procesos terminó en estado `"Hired"`.

::: {.callout .important}
**Importante:** los pesos 40/20/15/15/10 no son arbitrarios. Están elegidos para que la suma máxima dé exactamente 100, lo que permite leer cualquier puntaje como un porcentaje de encaje. Si algún día cambias un peso, revisa que el total siga cuadrando en 100.
:::

## Búsqueda binaria por salario

En `src/utils/search.ts` conviven dos estrategias de búsqueda. Las búsquedas por ID y por correo son *lineales*: recorren el arreglo de principio a fin. Es lo correcto cuando los datos no están ordenados por ese campo.

La joya didáctica es la *búsqueda binaria* por salario. Una búsqueda binaria solo funciona sobre datos ordenados, pero a cambio es muchísimo más rápida: en lugar de mirar uno a uno, parte el rango por la mitad en cada paso y descarta la mitad que no puede contener el valor.

```ts
export function binarySearchCandidateBySalary(
  sortedCandidates: Candidate[],
  targetSalary: number
): number {
  let low = 0;
  let high = sortedCandidates.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midSalary = sortedCandidates[mid]!.expectedSalary;

    if (midSalary === targetSalary) return mid;
    if (midSalary < targetSalary) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
```

El nombre del parámetro lo dice todo: `sortedCandidates`. La función *asume* que la lista llega ordenada de forma ascendente por `expectedSalary`. Por eso en la demo primero se llama a `sortCandidatesBySalary(..., "asc")` y luego se busca sobre el resultado. Si pasaras un arreglo sin ordenar, la búsqueda devolvería resultados erróneos. Cuando el valor no existe, la función devuelve `-1`, un convenio habitual para "no encontrado".

## Validaciones: errores legibles, no excepciones

El último módulo, `src/utils/validations.ts`, aplica las reglas de negocio definidas en `CONTEXT.md`. En lugar de lanzar excepciones, cada validador devuelve un `ValidationResult` con una lista de mensajes en español, lista para mostrarse en una interfaz:

```ts
export function validateCandidate(candidate: Candidate): ValidationResult {
  const errors: string[] = [];

  if (candidate.yearsOfExperience < 0 || candidate.yearsOfExperience > 50) {
    errors.push("Los años de experiencia deben estar entre 0 y 50");
  }
  if (candidate.expectedSalary <= 0) {
    errors.push("El salario esperado debe ser mayor que 0");
  }
  if (candidate.skills.length < 1) {
    errors.push("El candidato debe tener al menos una habilidad");
  }
  if (!isValidEmail(candidate.email)) {
    errors.push("El email no tiene un formato válido");
  }
  // ... más reglas
  return { valid: errors.length === 0, errors };
}
```

El patrón es acumulativo: en vez de cortar en el primer fallo, recoge todos los problemas a la vez para que el usuario los corrija de una sola pasada. `validateVacancy` sigue la misma idea (al menos una habilidad requerida, rango de experiencia coherente, salarios positivos y máximo no menor que el mínimo). La validación de correo en `isValidEmail` es deliberadamente sencilla: comprueba que haya una arroba y un punto de dominio en posiciones coherentes; el propio código aclara que no es una validación de nivel producción.

## El `tsconfig` estricto y cómo ejecutarlo

Toda esta seguridad de tipos se activa desde `tsconfig.json`, el archivo de configuración del compilador de TypeScript. La línea clave es `"strict": true`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ES2020", "DOM"],
    "types": []
  },
  "include": ["src"]
}
```

El modo estricto agrupa varias comprobaciones rigurosas. La más visible es que prohíbe acceder a valores potencialmente nulos sin manejarlos. Por eso en el código verás el operador `!` (como en `sortedCandidates[mid]!`): es tu forma de afirmarle al compilador "confía en mí, aquí sí hay un valor". Con `strict` apagado, un descuido de este tipo pasaría silencioso y reventaría en tiempo de ejecución.

El `package.json` raíz expone exactamente dos comandos:

| Comando | Qué hace |
|---|---|
| `npm run typecheck` | Ejecuta `tsc --noEmit`: revisa los tipos de todo `src/` sin generar archivos |
| `npm run demo` | Ejecuta `tsx src/demo.ts`: corre la demostración completa por consola |

```bash
npm run typecheck
npm run demo
```

`tsx` es una herramienta que ejecuta TypeScript directamente, sin un paso previo de compilación. El archivo `src/demo.ts` recorre las cinco áreas del Hito (colecciones, búsqueda, scoring, agregaciones y validaciones) usando los datos de `sampleData.ts` e imprime los resultados, incluido el ranking de candidatos contra la vacante de ejemplo.

::: {.callout .warning}
**Aviso:** `npm run typecheck` no produce salida cuando todo está bien; el silencio es la señal de éxito. Acostúmbrate a ejecutarlo antes de cada `commit`: detectar un error de tipos en tu máquina es mucho más barato que descubrirlo cuando otra app del monorepo importe tu lógica y deje de compilar.
:::

Conviene recordar por qué esta carpeta `src/` es tan importante en el conjunto del proyecto. No es código de usar y tirar: las apps Next.js y la talent-api la consumen a través del alias `@logic`, sin copiarla. El backoffice importa de aquí solo los *tipos*, y la talent-api reutiliza el motor de scoring entero para su punto final (*endpoint*) `GET /vacancies/:id/ranking`. Lo que escribes en el Hito 2 se convierte en la fuente única de verdad de toda la lógica de negocio de Nexova.

## Resumen

- El modelo de dominio (`src/types/models.ts`) usa interfaces y uniones de literales para que entidades como `Candidate` y `Vacancy` sean fieles al briefing de Nexova y a prueba de errores de tipeo.
- Casi toda la lógica de `src/utils/` está escrita como funciones puras: mismo resultado para la misma entrada y sin mutar los datos, lo que la hace fácil de razonar y reutilizar.
- El motor de scoring de `transformations.ts` descompone el encaje en cinco componentes con pesos 40/20/15/15/10 que suman 100, de modo que cada puntaje es explicable y se lee como porcentaje (María González obtiene 82).
- `binarySearchCandidateBySalary` ilustra la búsqueda binaria: rapidísima, pero solo válida sobre datos previamente ordenados por salario.
- Las validaciones devuelven un `ValidationResult` con todos los errores en español de una sola pasada, en lugar de lanzar excepciones.
- El `tsconfig` con `strict: true` activa la red de seguridad de tipos; se comprueba con `npm run typecheck` y la lógica se ejercita con `npm run demo`.