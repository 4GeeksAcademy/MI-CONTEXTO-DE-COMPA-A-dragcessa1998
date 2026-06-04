/**
 * Hito 5 — API central de Nexova (servicio de talento).
 *
 * Expone candidatos, vacantes, scoring/ranking y reportes. Toda la lógica de
 * negocio se REUTILIZA desde el módulo del Hito 2 (`/src`) vía el alias @logic;
 * no se duplica aquí.
 *
 * Arranque:  npm run dev   (o  npm start)
 */

import express, { type Request, type Response, type NextFunction } from "express";

import {
  filterCandidatesBySeniority,
  filterCandidatesByAvailability,
} from "@logic/utils/collections";
import { findCandidateById } from "@logic/utils/search";
import {
  rankCandidatesForVacancy,
  calculateAverageSalary,
  countCandidatesByStatus,
  findTopSkills,
} from "@logic/utils/transformations";
import { validateCandidate, validateVacancy } from "@logic/utils/validations";
import type {
  Candidate,
  Vacancy,
  SeniorityLevel,
  AvailabilityStatus,
} from "@logic/types/models";

import {
  candidates,
  vacancies,
  nextCandidateId,
  nextVacancyId,
} from "./store.js";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 4000);

// ---------- Salud ----------
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", candidates: candidates.length, vacancies: vacancies.length });
});

// ---------- Candidatos ----------

// GET /candidates?seniority=Senior&availability=Immediate,2 weeks
app.get("/candidates", (req: Request, res: Response) => {
  let result: Candidate[] = candidates;

  const seniority = req.query.seniority as string | undefined;
  if (seniority) {
    result = filterCandidatesBySeniority(result, seniority as SeniorityLevel);
  }

  const availability = req.query.availability as string | undefined;
  if (availability) {
    const statuses = availability.split(",").map((value) => value.trim()) as AvailabilityStatus[];
    result = filterCandidatesByAvailability(result, statuses);
  }

  res.json({ total: result.length, data: result });
});

// GET /candidates/:id  (búsqueda lineal del Hito 2)
app.get("/candidates/:id", (req: Request, res: Response) => {
  const candidate = findCandidateById(candidates, req.params.id);
  if (!candidate) return res.status(404).json({ error: "Candidato no encontrado" });
  res.json(candidate);
});

// POST /candidates  (validación de negocio del Hito 2)
app.post("/candidates", (req: Request, res: Response) => {
  const body = req.body ?? {};
  const candidate: Candidate = {
    id: nextCandidateId(),
    fullName: body.fullName ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    yearsOfExperience: Number(body.yearsOfExperience),
    skills: Array.isArray(body.skills) ? body.skills : [],
    englishLevel: body.englishLevel,
    seniority: body.seniority,
    currentSalary: Number(body.currentSalary),
    expectedSalary: Number(body.expectedSalary),
    availability: body.availability,
    location: body.location ?? "",
    remoteOnly: Boolean(body.remoteOnly),
    status: body.status ?? "Active",
  };

  const validation = validateCandidate(candidate);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  candidates.push(candidate);
  res.status(201).json(candidate);
});

// ---------- Vacantes ----------

app.get("/vacancies", (_req: Request, res: Response) => {
  res.json({ total: vacancies.length, data: vacancies });
});

app.get("/vacancies/:id", (req: Request, res: Response) => {
  const vacancy = vacancies.find((item) => item.id === req.params.id);
  if (!vacancy) return res.status(404).json({ error: "Vacante no encontrada" });
  res.json(vacancy);
});

app.post("/vacancies", (req: Request, res: Response) => {
  const body = req.body ?? {};
  const vacancy: Vacancy = {
    id: nextVacancyId(),
    title: body.title ?? "",
    companyName: body.companyName ?? "",
    requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : [],
    preferredSkills: Array.isArray(body.preferredSkills) ? body.preferredSkills : [],
    minYearsExperience: Number(body.minYearsExperience),
    maxYearsExperience: Number(body.maxYearsExperience),
    requiredEnglishLevel: body.requiredEnglishLevel,
    requiredSeniority: body.requiredSeniority,
    salaryRangeMin: Number(body.salaryRangeMin),
    salaryRangeMax: Number(body.salaryRangeMax),
    isRemote: Boolean(body.isRemote),
    location: body.location ?? "",
    status: body.status ?? "Open",
  };

  const validation = validateVacancy(vacancy);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  vacancies.push(vacancy);
  res.status(201).json(vacancy);
});

// GET /vacancies/:id/ranking  (motor de scoring del Hito 2)
app.get("/vacancies/:id/ranking", (req: Request, res: Response) => {
  const vacancy = vacancies.find((item) => item.id === req.params.id);
  if (!vacancy) return res.status(404).json({ error: "Vacante no encontrada" });

  const ranking = rankCandidatesForVacancy(candidates, vacancy).map((entry) => ({
    candidateId: entry.candidate.id,
    fullName: entry.candidate.fullName,
    seniority: entry.candidate.seniority,
    score: entry.score,
  }));

  res.json({ vacancyId: vacancy.id, title: vacancy.title, ranking });
});

// ---------- Reportes ----------

app.get("/reports/summary", (_req: Request, res: Response) => {
  res.json({
    totalCandidates: candidates.length,
    averageExpectedSalary: calculateAverageSalary(candidates),
    byStatus: countCandidatesByStatus(candidates),
    topSkills: findTopSkills(candidates, 5),
  });
});

// ---------- 404 y manejo de errores ----------
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : "Error interno del servidor";
  res.status(500).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Nexova Talent API escuchando en http://localhost:${PORT}`);
});

export default app;
