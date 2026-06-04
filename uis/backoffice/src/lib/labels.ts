/**
 * Etiquetas legibles del dominio (el panel nunca muestra valores crudos de estado)
 * y opciones para los selects del formulario de alta.
 */

import type { CandidateStatus, AvailabilityStatus } from "@logic/types/models";

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
