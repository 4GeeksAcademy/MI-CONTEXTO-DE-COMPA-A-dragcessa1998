# Capítulo 1. El panorama: qué estás construyendo

Antes de escribir una sola línea de código conviene saber *adónde* vamos. Este libro te acompaña en la construcción de un proyecto real de principio a fin: un sistema completo para **Nexova**, una consultoría de selección de talento. No es un ejercicio de juguete con un único archivo, sino un conjunto de piezas que se hablan entre sí —una web pública, un panel interno y un par de servidores— organizadas dentro de un mismo repositorio. Si nunca has programado, no te preocupes: en este capítulo no escribiremos código. Lo que haremos es darte un mapa, explicarte el vocabulario imprescindible y mostrarte cómo encajan las piezas, para que cada capítulo posterior tenga sentido dentro del conjunto.

En este capítulo aprenderás:

- Qué es Nexova como empresa y qué problema de negocio intentamos resolver.
- Qué es este repositorio y por qué se llama *monorepo*.
- Los conceptos básicos: frontend y backend, cliente y servidor, API y base de datos.
- Una visión de pájaro de las cinco piezas que componen el proyecto y cómo se relacionan.
- El recorrido por hitos que seguiremos, del Hito 0 al Hito 4 más el Directorio de Proveedores.

## El problema de negocio: por qué existe Nexova

**Nexova Solutions** es una consultoría de recursos humanos y selección de talento que opera entre Valencia (España) y Miami (Florida), dirigida por su fundadora y CEO, Laura Mendoza. Su negocio principal es el *headhunting*: encontrar a la persona adecuada para una vacante que un cliente necesita cubrir.

El problema es que, según el propio briefing de la empresa en `CONTEXT.md` y `company-choice.md`, hoy ese trabajo es casi enteramente **manual**. Sus consultores leen entre 30 y 80 currículums (CV) por proceso, a mano, y deciden qué candidato encaja mejor «por intuición». No hay un sistema que indique el estado de cada proceso en tiempo real, de modo que los clientes llaman por teléfono para preguntar cómo va su búsqueda.

El reto estrella que da forma a todo el proyecto es construir un **pipeline de scoring de CV explicable**: un sistema que puntúe automáticamente a cada candidato frente a una vacante y explique *por qué* esa puntuación, en lugar de ofrecer un número opaco. A esto se suma, más adelante en el programa, la idea de un sistema **RAG** (siglas en inglés de *Retrieval-Augmented Generation*, «generación aumentada por recuperación») que permita consultar la base de candidatos en lenguaje natural. En otras palabras: convertir horas de lectura manual en una lista ordenada, justificada y consultable.

::: {.callout .note}
**Nota:** *scoring* significa «puntuar». A lo largo del libro verás este término muchas veces; se refiere al proceso de asignar una puntuación numérica (de 0 a 100) que mide cómo de bien encaja un candidato con una vacante.
:::

## Qué es este repositorio

Un **repositorio** (o *repo*) es, simplemente, la carpeta donde vive todo el código de un proyecto, junto con su historial de cambios. Este repositorio en concreto es un **monorepo**: un único repositorio que contiene *varios* proyectos relacionados en lugar de uno solo.

¿Por qué juntarlo todo? Porque las piezas de Nexova comparten información y conviene que evolucionen a la vez. La alternativa —un repositorio separado por cada pieza— obligaría a copiar y sincronizar código a mano. Aquí, en cambio, la lógica de negocio se escribe **una sola vez** y las demás piezas la reutilizan.

Dentro del monorepo conviven cinco piezas con código real:

- Una **web pública** (lo que ven los candidatos en internet).
- Un **panel interno** o *backoffice* (lo que usan los empleados de Nexova).
- Un **tracker** de candidatos (un seguidor del avance de cada proceso).
- Una **API de talento** (el servidor que sirve datos de candidatos).
- Una **API de proveedores** (el Directorio de Proveedores).

El resto de carpetas que verás en la raíz —`agents/`, `data/`, `packages/`, `scripts/`, `infra/`, `internal/`, `mcps/`, `shared/`, `skills/`, `workflows/`— son **andamiaje** intencional de la plantilla de 4Geeks Academy. Hoy solo traen un archivo `README.md` que describe su propósito para futuros hitos; no contienen código funcional todavía. No te dejes intimidar por su número: el corazón del proyecto está en `src/`, `uis/` y `services/`.

## El vocabulario imprescindible

Antes de seguir, aclaremos cinco términos que aparecerán en cada capítulo.

**Cliente y servidor.** Imagina un restaurante. El **cliente** es quien hace el pedido; el **servidor** (la cocina) lo prepara y se lo devuelve. En software ocurre igual: tu navegador es un cliente que pide cosas, y en algún ordenador hay un programa servidor que responde. El cliente y el servidor pueden estar en máquinas distintas y se comunican por la red.

**Frontend y backend.** El **frontend** («parte de delante») es todo lo que el usuario ve y toca: páginas, botones, formularios. El **backend** («parte de detrás») es la maquinaria oculta: la lógica, los cálculos y los datos. El frontend es el comedor del restaurante; el backend es la cocina y la despensa.

**API.** Son las siglas en inglés de *Application Programming Interface*, «interfaz de programación de aplicaciones». Es el menú del restaurante: una lista de peticiones que el servidor sabe atender. Cada petición concreta —por ejemplo, «dame el ranking de candidatos de esta vacante»— se hace a un **punto final** (en inglés, *endpoint*), que es una dirección a la que el cliente envía la petición.

**Base de datos.** Es donde el backend guarda la información de forma permanente, para que no se pierda al apagar el programa. Es la despensa del restaurante: ahí están los ingredientes (los datos) bien ordenados y etiquetados.

::: {.callout .tip}
**Tip:** cuando leas «el frontend llama a la API del backend para obtener datos», traduce mentalmente: «el comedor pide un plato a la cocina por el menú». Con esa imagen, casi toda la arquitectura web se vuelve intuitiva.
:::

## Visión de pájaro: las piezas y cómo se relacionan

El monorepo agrupa la lógica compartida en `src/` y las aplicaciones en `uis/` (las interfaces de usuario) y `services/` (los servidores). El siguiente diagrama muestra quién habla con quién:

```
                        ┌──────────────────────────────┐
                        │   uis/website  (Next.js)      │  Web pública de Nexova
                        └──────────────────────────────┘

 ┌──────────────────────────────┐      HTTP + CORS       ┌─────────────────────────┐
 │  uis/backoffice  (Next.js)   │ ─────────────────────▶ │ services/api (FastAPI)   │
 │  Panel interno  :3000        │   /suppliers           │ Directorio Proveedores  │
 │  · /          (KPIs)         │                        │ TinyDB + Pydantic  :8000 │
 │  · /processes (pipeline)     │ ─────────────────────▶ ├─────────────────────────┤
 │  · /suppliers (directorio)   │   /candidates /reports │ services/talent-api      │
 └──────────────────────────────┘                        │ Express + TS       :4000 │
                                                          └────────────┬────────────┘
 ┌──────────────────────────────┐     API del curso                   │ import @logic
 │ uis/talent-pipeline-tracker  │ ─────▶ playground.4geeks             ▼
 │ (Next.js)            :3000   │                              ┌─────────────────┐
 └──────────────────────────────┘                              │  src/  (TS)     │
                                                               │  lógica Hito 2  │
                                                               │  fuente única   │
                                                               └─────────────────┘
```

Hay una idea central que se repite en todo el proyecto: la **lógica de negocio vive una sola vez** en la carpeta `src/` (escrita en TypeScript, un lenguaje que añade seguridad de tipos a JavaScript). Esa carpeta define qué es un candidato, qué es una vacante y cómo se calcula la puntuación. Tanto el panel interno como la API de talento la **importan** mediante un atajo llamado *alias* `@logic` —que apunta a `../../src`— en lugar de copiarla. Puedes verlo configurado en `uis/backoffice/tsconfig.json`, donde `@logic/*` se resuelve a `../../src/*`, y en uso real en `services/talent-api/src/index.ts`, que importa funciones como `rankCandidatesForVacancy` desde `@logic/utils/transformations`.

Cada pieza arranca en su propio **puerto**, un número que identifica al programa dentro de tu ordenador, como la puerta de un edificio:

| Pieza | Tecnología | Puerto |
| --- | --- | --- |
| `uis/backoffice` (panel interno) | Next.js | 3000 |
| `uis/talent-pipeline-tracker` (tracker) | Next.js | 3000 |
| `services/talent-api` (API de talento) | Express + TypeScript | 4000 |
| `services/api` (Directorio de Proveedores) | FastAPI + TinyDB | 8000 |

::: {.callout .important}
**Importante:** el backoffice no inventa los datos: los pide en vivo por HTTP a las dos APIs (talent-api en el puerto 4000 y la API de proveedores en el 8000). Si una de esas APIs no está arrancada, la vista muestra un estado de error con el comando para levantarla. Por eso, al trabajar con el panel, casi siempre tendrás más de un programa en marcha a la vez.
:::

## El recorrido por hitos

El proyecto se construyó por etapas llamadas **hitos** (en inglés, *milestones*), y este libro las recorre en el mismo orden. Cada hito añade una capa sobre la anterior:

| Hito | Qué se construye | Dónde vive |
| --- | --- | --- |
| 0 — Elección de empresa | Justificación de elegir Nexova y briefing de negocio | `company-choice.md`, `CONTEXT.md` |
| 1 — Web fundamentals | Web pública estática (landing y formulario de talento) | `index.html`, `application.html`, `validation.js` |
| 2 — Coding fundamentals | Motor de scoring de candidatos en TypeScript | `src/` |
| 3 — Talent Pipeline Tracker | Tracker de candidatos sobre la API del curso | `uis/talent-pipeline-tracker/` |
| 4 — AI-driven Engineering | Monorepo, web en React y panel interno | `uis/website/`, `uis/backoffice/` |
| Extra — Supplier Directory | API de proveedores con FastAPI | `services/api/` |

El **Hito 2** merece una mención especial porque es el cerebro del sistema. En `src/utils/transformations.ts` vive un motor de scoring que suma cinco componentes hasta un máximo de 100 puntos: habilidades (40), experiencia (20), seniority (15), inglés (15) y salario (10). Cada componente es una función pura y predecible, lo que hace que la puntuación final sea *explicable*: siempre puedes desglosar de dónde sale cada punto. Ese mismo motor es el que la API de talento reutiliza para servir su ranking, cerrando el círculo de «lógica escrita una sola vez».

A partir de aquí, cada capítulo profundiza en una de estas piezas. Pero ya tienes el mapa completo en la cabeza: una empresa con un problema real, un monorepo que reúne todas las soluciones y un puñado de piezas que se comunican por API reutilizando una única fuente de verdad.

## Resumen

- **Nexova** es una consultoría de selección de talento cuyo cribado de CV es hoy manual; el reto del proyecto es un pipeline de scoring explicable que lo automatice.
- Este repositorio es un **monorepo**: un solo repositorio con varias piezas relacionadas (web pública, panel interno, tracker y dos APIs).
- El **frontend** es lo que el usuario ve; el **backend** es la lógica y los datos. Se comunican por **API** siguiendo el modelo **cliente/servidor**, y los datos se guardan en una **base de datos**.
- La lógica de negocio vive una sola vez en `src/` y las demás piezas la reutilizan mediante el alias `@logic`, en lugar de copiarla.
- El proyecto se construye por **hitos** (del 0 al 4, más el Directorio de Proveedores), y este libro los recorre en ese mismo orden.