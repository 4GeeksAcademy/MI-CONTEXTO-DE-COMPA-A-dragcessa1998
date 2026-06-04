/**
 * Etiquetas legibles del dominio (CONTEXT.md). Los valores crudos de la API
 * (in_progress, personal_interview, etc.) NUNCA deben mostrarse en la interfaz:
 * siempre se traducen con estas tablas.
 */

import type { RecordStatus, RecordStage } from "@/types/tracker";

export const STATUS_LABELS: Record<RecordStatus, string> = {
  received: "Recibida",
  in_progress: "En proceso",
  selected: "Seleccionada",
  discarded: "Descartada",
};

export const STAGE_LABELS: Record<RecordStage, string> = {
  pending: "Pendiente de revisión",
  review: "En revisión",
  personal_interview: "Entrevista personal",
  technical_interview: "Entrevista técnica",
  offer_presented: "Oferta presentada",
};

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const STATUS_OPTIONS: Option<RecordStatus>[] = (
  Object.keys(STATUS_LABELS) as RecordStatus[]
).map((value) => ({ value, label: STATUS_LABELS[value] }));

export const STAGE_OPTIONS: Option<RecordStage>[] = (
  Object.keys(STAGE_LABELS) as RecordStage[]
).map((value) => ({ value, label: STAGE_LABELS[value] }));

/** Etiqueta de estado legible (con respaldo al valor crudo si fuese desconocido). */
export function statusLabel(value: string): string {
  return STATUS_LABELS[value as RecordStatus] ?? value;
}

/** Etiqueta de etapa legible (con respaldo al valor crudo si fuese desconocido). */
export function stageLabel(value: string): string {
  return STAGE_LABELS[value as RecordStage] ?? value;
}

/** Clases Tailwind para el badge de cada estado. */
export const STATUS_BADGE_CLASSES: Record<RecordStatus, string> = {
  received: "bg-slate-100 text-slate-700 ring-slate-200",
  in_progress: "bg-amber-100 text-amber-800 ring-amber-200",
  selected: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  discarded: "bg-red-100 text-red-700 ring-red-200",
};
