/**
 * Tipos TypeScript de la API del tracker de candidaturas (Hito 3).
 * Reflejan los esquemas RecordOut / RecordCreate / RecordPatch / NoteCreate.
 */

export type RecordStatus =
  | "received"
  | "in_progress"
  | "selected"
  | "discarded";

export type RecordStage =
  | "pending"
  | "review"
  | "personal_interview"
  | "technical_interview"
  | "offer_presented";

/** Candidatura tal como la devuelve la API (RecordOut). */
export interface TrackerRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  status: RecordStatus;
  stage: RecordStage;
  experience_years: number;
  notes_count: number;
  applied_at: string;
  updated_at: string;
}

/** Nota interna asociada a una candidatura. */
export interface Note {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

/** Respuesta paginada de GET /records. */
export interface RecordListResponse {
  total: number;
  page: number;
  limit: number;
  data: TrackerRecord[];
}

/** Respuesta de GET /records/:id/notes. */
export interface NotesListResponse {
  data: Note[];
  meta?: unknown;
}

/** Cuerpo para crear (POST) o reemplazar (PUT) una candidatura. */
export interface RecordCreateInput {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience_years: number;
  linkedin_url?: string | null;
  cv_url?: string | null;
}

/** Cuerpo para actualizar parcialmente (PATCH) estado y/o etapa. */
export interface RecordPatchInput {
  status?: RecordStatus;
  stage?: RecordStage;
}

/** Cuerpo para crear una nota (POST /records/:id/notes). */
export interface NoteCreateInput {
  content: string;
}

/** Filtros del listado (se reflejan en la URL como query params). */
export interface RecordFilters {
  status?: string;
  stage?: string;
  search?: string;
}
