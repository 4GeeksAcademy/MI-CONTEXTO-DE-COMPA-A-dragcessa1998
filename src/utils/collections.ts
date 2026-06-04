/**
 * Operaciones de colecciones sobre candidatos: filtrado y ordenamiento.
 * Todas las funciones son puras y no mutan los arrays recibidos.
 */

import type {
  Candidate,
  SeniorityLevel,
  AvailabilityStatus,
} from "../types/models";

/**
 * Devuelve los candidatos que poseen TODAS las habilidades requeridas.
 * El matching es case-insensitive. Si no se requiere ninguna habilidad,
 * devuelve todos los candidatos.
 */
export function filterCandidatesBySkills(
  candidates: Candidate[],
  requiredSkills: string[]
): Candidate[] {
  if (requiredSkills.length === 0) return [...candidates];

  const normalizedRequired = requiredSkills.map((skill) => skill.toLowerCase());

  return candidates.filter((candidate) => {
    const candidateSkills = new Set(
      candidate.skills.map((skill) => skill.toLowerCase())
    );
    return normalizedRequired.every((skill) => candidateSkills.has(skill));
  });
}

/** Devuelve los candidatos con el nivel de seniority indicado. */
export function filterCandidatesBySeniority(
  candidates: Candidate[],
  seniority: SeniorityLevel
): Candidate[] {
  return candidates.filter((candidate) => candidate.seniority === seniority);
}

/**
 * Devuelve los candidatos cuya disponibilidad coincide con cualquiera de los
 * estados proporcionados.
 */
export function filterCandidatesByAvailability(
  candidates: Candidate[],
  availability: AvailabilityStatus[]
): Candidate[] {
  return candidates.filter((candidate) =>
    availability.includes(candidate.availability)
  );
}

/**
 * Devuelve una copia de los candidatos ordenada por salario esperado.
 * No muta el array original.
 */
export function sortCandidatesBySalary(
  candidates: Candidate[],
  order: "asc" | "desc"
): Candidate[] {
  const factor = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (a, b) => (a.expectedSalary - b.expectedSalary) * factor
  );
}

/**
 * Devuelve una copia de los candidatos ordenada por años de experiencia.
 * No muta el array original.
 */
export function sortCandidatesByExperience(
  candidates: Candidate[],
  order: "asc" | "desc"
): Candidate[] {
  const factor = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (a, b) => (a.yearsOfExperience - b.yearsOfExperience) * factor
  );
}
