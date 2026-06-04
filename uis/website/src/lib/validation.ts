/**
 * Validación del formulario de registro de talento (migrada del Hito 1).
 * Mensajes de error literales del contexto de Nexova.
 */

export interface ApplyValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  experience: string;
  sector: string;
  english: string;
  availability: string;
  linkedin: string;
  comments: string;
  dataPolicy: boolean;
}

export type ApplyErrors = Partial<Record<keyof ApplyValues, string>>;

export const MAX_COMMENTS = 500;

export const COUNTRIES = ["España", "Estados Unidos", "Otro"] as const;
export const SECTORS = ["Tecnología", "Retail", "Servicios Financieros", "Consultoría", "Otro"] as const;
export const ENGLISH_LEVELS = ["Básico", "Intermedio", "Avanzado", "Nativo"] as const;
export const AVAILABILITY = ["Inmediata", "1 mes", "2-3 meses", "Solo explorando"] as const;

export const EMPTY_APPLY: ApplyValues = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  experience: "",
  sector: "",
  english: "",
  availability: "",
  linkedin: "",
  comments: "",
  dataPolicy: false,
};

export function validateApply(values: ApplyValues): ApplyErrors {
  const errors: ApplyErrors = {};

  if (values.fullName.trim().split(/\s+/).filter(Boolean).length < 2) {
    errors.fullName = "El nombre debe contener al menos nombre y apellido";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ingresa un email válido (ejemplo: nombre@empresa.com)";
  }
  if (!/^\+\d{8,16}$/.test(values.phone.trim().replace(/\s+/g, ""))) {
    errors.phone = "El teléfono debe incluir código de país (ejemplo: +34 612 345 678)";
  }
  if (values.country === "") {
    errors.country = "Selecciona tu país de residencia";
  }
  const years = Number(values.experience);
  if (values.experience.trim() === "" || Number.isNaN(years) || years < 0 || years > 50) {
    errors.experience = "Los años de experiencia deben estar entre 0 y 50";
  }
  if (values.sector === "") {
    errors.sector = "Selecciona el sector de tu interés";
  }
  if (values.english === "") {
    errors.english = "Indica tu nivel de inglés";
  }
  if (values.availability === "") {
    errors.availability = "Selecciona tu disponibilidad";
  }
  if (values.linkedin.trim() !== "" && !/^https?:\/\/[^\s]+\.[^\s]+$/i.test(values.linkedin.trim())) {
    errors.linkedin = "Si incluyes LinkedIn, debe ser una URL válida";
  }
  if (values.comments.length > MAX_COMMENTS) {
    errors.comments = `Los comentarios no pueden exceder 500 caracteres (quedan ${MAX_COMMENTS - values.comments.length})`;
  }
  if (!values.dataPolicy) {
    errors.dataPolicy = "Debes aceptar la política de tratamiento de datos para continuar";
  }

  return errors;
}
