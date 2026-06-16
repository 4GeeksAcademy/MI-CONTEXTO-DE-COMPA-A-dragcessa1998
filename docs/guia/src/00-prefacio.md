# Prefacio

Tienes en las manos una guía construida alrededor de un proyecto que existe de verdad: el repositorio de **Nexova**, el proyecto de compañía que un estudiante del programa de Ingeniería de IA de 4Geeks Academy desarrolló hito a hito. Este libro no parte de ejemplos inventados ni de pseudocódigo: cada comando, cada ruta de archivo y cada fragmento de código que leerás están tomados del repositorio real, desde la web pública estática hasta las APIs en Python y TypeScript que la sostienen.

## En este capítulo aprenderás:

- Para quién está pensada esta guía y desde qué punto de partida puedes empezar.
- Qué es el Proyecto de Compañía de 4Geeks y quién es la empresa Nexova.
- Qué construirás y cómo se organiza el libro en sus tres partes y apéndices.
- Las convenciones tipográficas y los recuadros que usaremos en todo el texto.

## Para quién es esta guía

Este libro está escrito para un abanico amplio de lectores. Si **partes de cero** —nunca has clonado un repositorio (la copia local de un proyecto), nunca has levantado un servidor local ni sabes qué es una **API** (la interfaz por la que dos programas se comunican)—, encontrarás cada término explicado la primera vez que aparece y comandos que puedes copiar y pegar tal cual. Si ya programas y lo que buscas es **dominar este proyecto concreto** —entender por qué la lógica de negocio vive una sola vez y se reutiliza, o cómo una validación de Pydantic rechaza un dato imposible—, los capítulos avanzados desmenuzan las decisiones de diseño con el código en la mano.

::: {.callout .note}
**Nota:** no necesitas haber hecho el bootcamp de 4Geeks para seguir el libro. Basta con tener instalados Node.js, Python y curiosidad. El resto se explica sobre la marcha.
:::

## Qué es el Proyecto de Compañía y quién es Nexova

El **Proyecto de Compañía** es el formato con el que el programa de Ingeniería de IA de 4Geeks Academy organiza el aprendizaje: en lugar de ejercicios sueltos, eliges una empresa ficticia y construyes para ella, hito a hito, un producto completo. La empresa elegida aquí es **Nexova Solutions**, una consultoría de recursos humanos y selección de talento con sede en Valencia y oficina en Miami, fundada por **Laura Mendoza**. Su reto estrella —y el hilo conductor del proyecto— es convertir el cribado manual de decenas de currículums en un **pipeline de puntuación (scoring) de CVs explicable**, acompañado de búsqueda semántica sobre la base de candidatos.

## Qué aprenderás

A lo largo del libro pasarás de una web estática a un **monorepo** (un único repositorio que alberga varias aplicaciones y servicios) profesional. Escribirás un motor de puntuación en **TypeScript** cuyos cinco componentes suman exactamente 100 puntos (40 + 20 + 15 + 15 + 10), levantarás una API en **FastAPI** con validaciones de **Pydantic** que rechazan datos imposibles, construirás paneles en **Next.js** que consumen esas APIs por HTTP y entenderás cómo una sola fuente de lógica, importada mediante el alias `@logic`, se comparte sin duplicarse entre el backoffice y la API de talento.

## Cómo está organizado el libro

El recorrido se divide en tres partes y un bloque de apéndices:

| Parte | Contenido |
| --- | --- |
| **Parte I — Fundamentos** | Qué es el monorepo, cómo se estructura `src/`, los puertos de cada servicio y el flujo de trabajo con Git. |
| **Parte II — Construcción hito a hito** | Del Hito 0 (`company-choice.md`) al Hito 4: web estática, motor de scoring, el Talent Pipeline Tracker, el backoffice y las dos APIs. |
| **Parte III — De usuario a experto** | Pruebas, validaciones de dominio, integración en vivo y las decisiones de arquitectura que hacen el proyecto mantenible. |
| **Apéndices** | Referencia de puntos finales (endpoints), tablas de puertos, comandos clave y resolución de problemas. |

## Convenciones usadas en este libro

Para que la lectura sea predecible, este libro emplea cuatro tipos de recuadro:

::: {.callout .tip}
**Tip:** un consejo práctico para hacer las cosas mejor o más rápido.
:::

::: {.callout .important}
**Importante:** un dato crítico que conviene no perder de vista, como un comando exacto o un puerto que otra pieza espera.
:::

El recuadro **Nota** aclara un concepto o aporta contexto adicional, y el recuadro **Aviso** te advierte de algo que puede salir mal. Verás un ejemplo de este último más adelante; por ahora basta con saber que un aviso señala un punto donde otros han tropezado.

Los **comandos de terminal** y el **código** aparecen en bloques con su lenguaje indicado. Son reales y copiables; provienen del repositorio. Por ejemplo, la lógica del Hito 2 se verifica y se ejecuta así:

```bash
npm run typecheck
npm run demo
```

Y la API de proveedores, gestionada con la herramienta `uv`, se carga y se sirve con:

```bash
uv run seed
uv run uvicorn main:app --port 8000
```

Cuando citemos un archivo concreto del proyecto lo haremos con su ruta entre comillas inversas, como `services/api/models.py`, para que puedas abrirlo y comprobarlo por ti mismo.

## Una nota para empezar

No hace falta que entiendas todo a la primera. La fuerza de este proyecto es que es real y está completo: puedes leer una explicación, abrir el archivo del que habla, ejecutarlo y ver el resultado con tus propios ojos. Ve a tu ritmo, escribe el código en lugar de solo leerlo y, cuando algo no encaje, vuelve al repositorio. Bienvenido a Nexova; empecemos por los fundamentos.

## Resumen

- Esta guía acompaña el monorepo real de **Nexova**, el proyecto de compañía de Ingeniería de IA de 4Geeks Academy; todo el código y los comandos son verificables en el repositorio.
- Sirve tanto a quien empieza de cero como a quien quiere dominar el proyecto, explicando cada término técnico la primera vez que aparece.
- El libro se organiza en tres partes —Fundamentos, Construcción hito a hito y De usuario a experto— más un bloque de apéndices de referencia.
- Se usan cuatro recuadros (Tip, Nota, Aviso e Importante) y bloques de código reales y copiables, con las rutas de archivo citadas entre comillas inversas.