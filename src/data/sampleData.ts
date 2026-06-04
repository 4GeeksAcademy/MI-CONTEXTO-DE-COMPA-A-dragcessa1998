/**
 * Datos de ejemplo del CONTEXT.md, usados por la demo y para pruebas manuales.
 */

import type { Candidate, Vacancy, SelectionProcess } from "../types/models";

export const sampleCandidates: Candidate[] = [
  {
    id: "C-2024-0451",
    fullName: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+56912345678",
    yearsOfExperience: 5,
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    englishLevel: "B2",
    seniority: "Semi-Senior",
    currentSalary: 3500,
    expectedSalary: 4200,
    availability: "1 month",
    location: "Valencia, España",
    remoteOnly: false,
    status: "Active",
  },
  {
    id: "C-2024-0452",
    fullName: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+56987654321",
    yearsOfExperience: 3,
    skills: ["JavaScript", "React", "CSS", "HTML"],
    englishLevel: "B1",
    seniority: "Junior",
    currentSalary: 2200,
    expectedSalary: 2800,
    availability: "Immediate",
    location: "Miami, Florida, Estados Unidos",
    remoteOnly: true,
    status: "Active",
  },
  {
    id: "C-2024-0453",
    fullName: "Carolina Silva",
    email: "carolina.silva@email.com",
    phone: "+56911223344",
    yearsOfExperience: 8,
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    englishLevel: "C1",
    seniority: "Senior",
    currentSalary: 5500,
    expectedSalary: 6500,
    availability: "2 weeks",
    location: "Valencia, España",
    remoteOnly: false,
    status: "Active",
  },
];

export const sampleVacancy: Vacancy = {
  id: "V-2024-0892",
  title: "Senior Full-Stack Developer",
  companyName: "TechCorp Solutions",
  requiredSkills: ["TypeScript", "React", "Node.js"],
  preferredSkills: ["PostgreSQL", "Docker"],
  minYearsExperience: 4,
  maxYearsExperience: 8,
  requiredEnglishLevel: "B2",
  requiredSeniority: "Senior",
  salaryRangeMin: 5000,
  salaryRangeMax: 7000,
  isRemote: true,
  location: "Remote",
  status: "Open",
};

/**
 * Procesos de selección de ejemplo (para probar calculateVacancyFillRate).
 * 1 de 4 terminó en "Hired" → tasa de cobertura del 25%.
 */
export const sampleProcesses: SelectionProcess[] = [
  {
    id: "SP-2024-1523",
    candidateId: "C-2024-0453",
    vacancyId: "V-2024-0892",
    stage: "Hired",
    score: 92,
    notes: "Match excelente, oferta aceptada.",
    createdAt: new Date("2024-05-01T09:00:00Z"),
    updatedAt: new Date("2024-05-20T16:30:00Z"),
  },
  {
    id: "SP-2024-1524",
    candidateId: "C-2024-0451",
    vacancyId: "V-2024-0892",
    stage: "Technical test",
    score: 68,
    notes: "En prueba técnica.",
    createdAt: new Date("2024-05-03T11:00:00Z"),
    updatedAt: new Date("2024-05-12T10:15:00Z"),
  },
  {
    id: "SP-2024-1525",
    candidateId: "C-2024-0452",
    vacancyId: "V-2024-0892",
    stage: "Rejected",
    score: 41,
    notes: "No cumple seniority requerido.",
    createdAt: new Date("2024-05-04T14:00:00Z"),
    updatedAt: new Date("2024-05-06T09:45:00Z"),
  },
  {
    id: "SP-2024-1526",
    candidateId: "C-2024-0451",
    vacancyId: "V-2024-0892",
    stage: "Interview",
    score: 70,
    notes: "Entrevista inicial agendada.",
    createdAt: new Date("2024-05-08T08:30:00Z"),
    updatedAt: new Date("2024-05-09T12:00:00Z"),
  },
];
