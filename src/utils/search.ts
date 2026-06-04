/**
 * Operaciones de búsqueda sobre candidatos: búsqueda lineal y binaria.
 */

import type { Candidate } from "../types/models";

/**
 * Búsqueda lineal de un candidato por ID.
 * Recorre el array (sin asumir orden) y devuelve el candidato o null.
 */
export function findCandidateById(
  candidates: Candidate[],
  id: string
): Candidate | null {
  for (const candidate of candidates) {
    if (candidate.id === id) return candidate;
  }
  return null;
}

/**
 * Búsqueda lineal de un candidato por email (case-insensitive).
 * Devuelve el candidato o null si no se encuentra.
 */
export function findCandidateByEmail(
  candidates: Candidate[],
  email: string
): Candidate | null {
  const target = email.toLowerCase();
  for (const candidate of candidates) {
    if (candidate.email.toLowerCase() === target) return candidate;
  }
  return null;
}

/**
 * Búsqueda binaria por salario esperado.
 * Asume que `sortedCandidates` está ordenado de forma ascendente por
 * `expectedSalary`. Devuelve el índice de un candidato con ese salario, o -1.
 */
export function binarySearchCandidateBySalary(
  sortedCandidates: Candidate[],
  targetSalary: number
): number {
  let low = 0;
  let high = sortedCandidates.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midSalary = sortedCandidates[mid]!.expectedSalary;

    if (midSalary === targetSalary) return mid;
    if (midSalary < targetSalary) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
