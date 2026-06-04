/**
 * Validaciones de negocio para candidatos y vacantes.
 * Cada validación aplica las reglas definidas en CONTEXT.md y devuelve la
 * lista de errores encontrados (vacía si el dato es válido).
 */

import type { Candidate, Vacancy, ValidationResult } from "../types/models";

/**
 * Validación básica de email: debe contener "@" y un "." de dominio en
 * posiciones coherentes. No es validación de nivel producción.
 */
export function isValidEmail(email: string): boolean {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

/**
 * Valida todas las reglas de negocio de un candidato.
 * Reglas (CONTEXT.md):
 *  - yearsOfExperience entre 0 y 50
 *  - currentSalary y expectedSalary > 0
 *  - al menos 1 habilidad
 *  - email con formato válido
 *  - phone no vacío
 */
export function validateCandidate(candidate: Candidate): ValidationResult {
  const errors: string[] = [];

  if (candidate.yearsOfExperience < 0 || candidate.yearsOfExperience > 50) {
    errors.push("Los años de experiencia deben estar entre 0 y 50");
  }
  if (candidate.currentSalary <= 0) {
    errors.push("El salario actual debe ser mayor que 0");
  }
  if (candidate.expectedSalary <= 0) {
    errors.push("El salario esperado debe ser mayor que 0");
  }
  if (candidate.skills.length < 1) {
    errors.push("El candidato debe tener al menos una habilidad");
  }
  if (!isValidEmail(candidate.email)) {
    errors.push("El email no tiene un formato válido");
  }
  if (candidate.phone.trim() === "") {
    errors.push("El teléfono no puede estar vacío");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Valida todas las reglas de negocio de una vacante.
 * Reglas (CONTEXT.md):
 *  - al menos 1 habilidad requerida
 *  - minYearsExperience >= 0
 *  - maxYearsExperience >= minYearsExperience
 *  - salaryRangeMax >= salaryRangeMin
 *  - ambos salarios > 0
 */
export function validateVacancy(vacancy: Vacancy): ValidationResult {
  const errors: string[] = [];

  if (vacancy.requiredSkills.length < 1) {
    errors.push("La vacante debe requerir al menos una habilidad");
  }
  if (vacancy.minYearsExperience < 0) {
    errors.push("La experiencia mínima no puede ser negativa");
  }
  if (vacancy.maxYearsExperience < vacancy.minYearsExperience) {
    errors.push("La experiencia máxima no puede ser menor que la mínima");
  }
  if (vacancy.salaryRangeMin <= 0 || vacancy.salaryRangeMax <= 0) {
    errors.push("Los valores de salario deben ser mayores que 0");
  }
  if (vacancy.salaryRangeMax < vacancy.salaryRangeMin) {
    errors.push("El salario máximo no puede ser menor que el mínimo");
  }

  return { valid: errors.length === 0, errors };
}
