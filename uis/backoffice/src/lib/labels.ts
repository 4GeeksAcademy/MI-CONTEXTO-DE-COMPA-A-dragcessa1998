/**
 * Etiquetas legibles del dominio (el panel nunca muestra valores crudos de estado)
 * y opciones para los selects del formulario de alta.
 */

import type { CandidateStatus, AvailabilityStatus, ProcessStage } from "@logic/types/models";

/** Estado del candidato → etiqueta en español. */
export const STATUS_LABELS: Record<CandidateStatus, string> = {
  Active: "Activos",
  "In process": "En proceso",
  Hired: "Contratados",
  Inactive: "Inactivos",
};

/** Opciones de disponibilidad (no hay constante exportada en @logic para esto). */
export const AVAILABILITY_OPTIONS: AvailabilityStatus[] = [
  "Immediate",
  "2 weeks",
  "1 month",
  "Not available",
];

/** Etapas del proceso de selección, en orden del pipeline. */
export const PROCESS_STAGES: ProcessStage[] = [
  "Screening",
  "Interview",
  "Technical test",
  "Final interview",
  "Offer",
  "Rejected",
  "Hired",
];

/** Etapa del proceso → etiqueta en español (el tablero no muestra valores crudos). */
export const PROCESS_STAGE_LABELS: Record<ProcessStage, string> = {
  Screening: "Cribado",
  Interview: "Entrevista",
  "Technical test": "Prueba técnica",
  "Final interview": "Entrevista final",
  Offer: "Oferta",
  Rejected: "Rechazado",
  Hired: "Contratado",
};
