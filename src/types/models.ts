/**
 * Modelos de dominio de Nexova — Hito 2
 *
 * Interfaces y tipos que representan las entidades principales del sistema de
 * gestión de candidatos. Todos los nombres de campos y tipos coinciden con el
 * documento de contexto (CONTEXT.md).
 */

// ----- Tipos enumerados (uniones literales) -----

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export type SeniorityLevel =
  | "Junior"
  | "Semi-Senior"
  | "Senior"
  | "Lead"
  | "Executive";

export type AvailabilityStatus =
  | "Immediate"
  | "2 weeks"
  | "1 month"
  | "Not available";

export type CandidateStatus = "Active" | "In process" | "Hired" | "Inactive";

export type VacancyStatus = "Open" | "In progress" | "Closed" | "On hold";

export type ProcessStage =
  | "Screening"
  | "Interview"
  | "Technical test"
  | "Final interview"
  | "Offer"
  | "Rejected"
  | "Hired";

// ----- Entidades de negocio -----

/** Persona en la base de datos de talento de Nexova. */
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

/** Posición abierta que Nexova intenta cubrir para un cliente. */
export interface Vacancy {
  id: string;
  title: string;
  companyName: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minYearsExperience: number;
  maxYearsExperience: number;
  requiredEnglishLevel: EnglishLevel;
  requiredSeniority: SeniorityLevel;
  salaryRangeMin: number;
  salaryRangeMax: number;
  isRemote: boolean;
  location: string;
  status: VacancyStatus;
}

/** Progreso de un candidato a través del proceso de selección de una vacante. */
export interface SelectionProcess {
  id: string;
  candidateId: string;
  vacancyId: string;
  stage: ProcessStage;
  score: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// ----- Tipos auxiliares de retorno -----

/** Resultado de una validación de negocio. */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Candidato acompañado de su puntaje de match contra una vacante. */
export interface ScoredCandidate {
  candidate: Candidate;
  score: number;
}

// ----- Constantes de orden (fuente única de verdad para escalas) -----

/** Niveles de inglés ordenados de menor a mayor competencia. */
export const ENGLISH_ORDER: readonly EnglishLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
];

/** Niveles de seniority ordenados de menor a mayor. */
export const SENIORITY_ORDER: readonly SeniorityLevel[] = [
  "Junior",
  "Semi-Senior",
  "Senior",
  "Lead",
  "Executive",
];

/** Todos los estados posibles de un candidato. */
export const CANDIDATE_STATUSES: readonly CandidateStatus[] = [
  "Active",
  "In process",
  "Hired",
  "Inactive",
];
