# Project Brief — Nexova

> Banco de memoria · contexto de **negocio**. Léelo al inicio de cada sesión.
> Mantenlo actualizado cuando cambien los objetivos o el alcance del proyecto.

## La empresa

**Nexova Solutions** es una consultora de recursos humanos y adquisición de talento fundada en **2011**, con sede en **Valencia (España)** y oficina de expansión en **Miami (Florida)**. ~**120 empleados** y ~**8 M$** de facturación anual. Opera tres líneas de negocio:

1. **Headhunting** ejecutivo y de mandos medios.
2. **Outsourcing** de equipos de atención al cliente para empresas tecnológicas.
3. **Formación corporativa** en soft skills y liderazgo.

Clientes: medianas empresas de **tecnología, retail y servicios financieros**. CEO: **Laura Mendoza**.

### Departamentos y responsables (dominio del proyecto)

| Área | Responsable | Dolor principal |
| --- | --- | --- |
| Operaciones de Selección (core) | Javier Almeida (40 consultores) | Cribado manual de 30-80 CVs por proceso; matching por intuición; sin estado en tiempo real |
| Atención al Cliente externalizada | Roberto Díaz (30 agentes) | Sin base de conocimiento; SLA 24 h incumplido (48 h reales) |
| Formación Corporativa | Elena Vargas (12) | Catálogo en PDF; inscripciones en Google Forms |
| Ventas y Desarrollo de Negocio | (equipo de 18) | CRM infrautilizado; seguimiento que se pierde |
| Marketing y Comunicación | Carmen Ruiz | Web de 2019; sin medición de conversión |
| RRHH interno | Patricia Solís | Vacaciones/onboarding por email y Excel |
| Tecnología e Infraestructura | Sergio Molina (CTO, 6) | Stack desconectado; sin telemetría |

## El problema que resolvemos

Nexova tiene reputación, red y experiencia, pero **carece de la infraestructura para operar a escala**. La tesis del proyecto: en Nexova **la IA no apoya el producto, _es_ la ventaja competitiva**. El trabajo del equipo de Ingeniería de IA es construir los sistemas que conviertan su operación manual (scoring de CVs, matching, soporte, formación) en software fiable y reutilizable.

## Objetivos del proyecto (recorrido por hitos)

Construir, de forma incremental y AI-ready, la plataforma interna de Nexova a lo largo de los hitos del curso: web pública → lógica de negocio → frontends → backend → telemetría → RAG → agentes → workflows → tiempo real.

**Reto estrella elegido (Hito 0):** pipeline de **scoring de CVs explicable + RAG sobre la base de candidatos** para Operaciones de Selección.

## Restricciones de negocio

- Operación **bilingüe** España/EE. UU.: el español es el idioma base; el inglés es mejora opcional.
- Las **etiquetas de dominio** se muestran siempre legibles (nunca valores crudos de la API).
- Cada hito debe **reflejar fielmente** el `CONTEXT.md` de la empresa (datos, campos, procesos reales).

Relacionado: [[techContext]] · [[progress]]
