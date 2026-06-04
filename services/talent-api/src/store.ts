/**
 * Almacenamiento ligero en memoria, sembrado con los datos de ejemplo del Hito 2.
 * (En un hito posterior se sustituirá por una base de datos real.)
 */

import {
  sampleCandidates,
  sampleVacancy,
  sampleProcesses,
} from "@logic/data/sampleData";
import type { Candidate, Vacancy, SelectionProcess } from "@logic/types/models";

export const candidates: Candidate[] = [...sampleCandidates];
export const vacancies: Vacancy[] = [sampleVacancy];
export const processes: SelectionProcess[] = [...sampleProcesses];

let candidateSeq = candidates.length;
let vacancySeq = vacancies.length;
let processSeq = processes.length;

/** Genera un ID de candidato con el formato del dominio (C-2024-XXXX). */
export function nextCandidateId(): string {
  candidateSeq += 1;
  return `C-2024-${String(1450 + candidateSeq)}`;
}

/** Genera un ID de vacante con el formato del dominio (V-2024-XXXX). */
export function nextVacancyId(): string {
  vacancySeq += 1;
  return `V-2024-${String(890 + vacancySeq)}`;
}

/** Genera un ID de proceso de selección (SP-2024-XXXX). */
export function nextProcessId(): string {
  processSeq += 1;
  return `SP-2024-${String(1520 + processSeq)}`;
}
