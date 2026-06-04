# Mi elección de empresa — Hito 0

## Empresa elegida

**Nexova Solutions** — consultoría de recursos humanos y selección de talento (B2B), con sede en Valencia (España) y oficina de expansión en Miami (Florida).

## Por qué la elijo

Elijo Nexova porque es la empresa donde la IA no es un complemento, sino el núcleo del negocio: su propio briefing afirma que *"en Nexova la IA no apoya el producto; **es** la ventaja competitiva"*. Fundada en 2011 por **Laura Mendoza** —que la hizo crecer de una consultora de dos personas a una firma de 120 empleados y ~8 millones de dólares en tres líneas de negocio (headhunting de mandos medios y directivos, outsourcing de equipos de soporte y formación corporativa)—, Nexova tiene un problema que me resulta especialmente atractivo de resolver con ingeniería de IA: hoy su operación principal es casi enteramente manual. En **Operaciones de Selección**, los 40 consultores de Javier Almeida leen entre 30 y 80 CVs por proceso a mano y hacen el matching candidato-vacante "por intuición", sin ningún sistema de estado en tiempo real (los clientes llaman para preguntar). En **Soporte externalizado**, los 30 agentes de Roberto Díaz trabajan sin base de conocimiento y con un tiempo medio de resolución de 48 horas frente a un SLA comprometido de 24. Me motiva construir un portfolio donde el scoring de CVs explicable y el RAG sobre la base de candidatos sean entregables centrales —no mejoras opcionales—, porque demuestran AI Engineering aplicada directamente a las operaciones que generan los ingresos de la empresa.

## Departamentos que más me interesan (mínimo 2)

1. **Operaciones de Selección** (responsable: Javier Almeida, 40 consultores) — es el núcleo de Nexova y su principal fuente de ingresos, y hoy es 100% manual: cribado de 30-80 CVs por proceso, comunicación con candidatos por email individual sin plantillas, y matching dependiente por completo de la intuición del consultor. Me interesa porque concentra los retos de IA más potentes del proyecto: un pipeline de scoring/ranking **explicable** de CVs y un sistema RAG semántico sobre la base de candidatos (p. ej. *"encuentra perfiles con experiencia en ventas B2B y nivel C1 de inglés"*).

2. **Atención al Cliente (servicio externalizado)** (responsable: Roberto Díaz, 30 agentes) — incumple su SLA de forma sistemática (48 h reales frente a las 24 h comprometidas) y opera sin base de conocimiento centralizada, resolviendo "por experiencia y un documento Word compartido en Drive". Me interesa porque es un caso de uso medible y de alto impacto para RAG + agentes: un chatbot de primera línea que resuelva el 40% de las consultas sin intervención humana y un análisis de sentimiento que detecte clientes insatisfechos antes de que escalen.

## Reto de automatización / IA que más quiero construir

**Pipeline de selección asistido por IA con scoring y ranking explicable de CVs + RAG sobre la base de candidatos.** Mapea a varios hitos del milestone map (Hito 2 — Programación/scoring, Hito 7 — RAG y memoria, y Hito 8 — Agentes). Quiero construirlo porque ataca directamente el cuello de botella del negocio principal de Nexova: convertir el cribado manual de decenas de CVs por proceso en un ranking explicable y consultable en lenguaje natural, devolviéndole horas a cada uno de los 40 consultores y dándole por fin a los clientes la visibilidad del estado de sus procesos que hoy no tienen.

## Mi idea de Agente de IA

Un **"Agente de Cribado y Matching de Candidatos"** para el departamento de Operaciones de Selección.

- **Qué haría:** dado el briefing de una vacante (requisitos, idiomas, seniority, *must-haves*), recorre la base de CVs del proceso, puntúa y rankea cada candidato según su ajuste, y devuelve una *shortlist* con una explicación por candidato ("por qué encaja / qué le falta"). Además responde consultas en lenguaje natural sobre la base de candidatos y redacta emails de seguimiento personalizados.
- **Qué información necesitaría:** la descripción de la vacante con sus criterios y pesos; la base de datos de candidatos (CVs en texto + campos estructurados: experiencia, idiomas, ubicación, disponibilidad, pretensión salarial); plantillas de comunicación; y el histórico de contrataciones para calibrar el scoring.
- **Qué produciría o desencadenaría:** un ranking explicable (puntuación + justificación por candidato), una *shortlist* enviada al consultor o al cliente, emails automáticos de seguimiento a los candidatos, y la actualización del estado de cada candidato en el portal en tiempo real; además, dispararía una notificación al consultor cuando aparezca un match de alta puntuación.

---

_Hito 0 — Proyecto de Compañía · AI Engineering · 4Geeks Academy_
