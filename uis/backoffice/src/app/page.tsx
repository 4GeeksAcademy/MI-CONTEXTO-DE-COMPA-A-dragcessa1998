import {
  rankCandidatesForVacancy,
  calculateAverageSalary,
  findTopSkills,
  countCandidatesByStatus,
} from "@logic/utils/transformations";
import { sampleCandidates, sampleVacancy } from "@logic/data/sampleData";
import type { CandidateStatus } from "@logic/types/models";
import Kpi from "@/components/Kpi";
import RankingTable from "@/components/RankingTable";

// Etiquetas legibles para los estados (el dashboard no muestra valores crudos).
const STATUS_LABELS: Record<CandidateStatus, string> = {
  Active: "Activos",
  "In process": "En proceso",
  Hired: "Contratados",
  Inactive: "Inactivos",
};

export default function DashboardPage() {
  // === Lógica de negocio del Hito 2 (importada desde /src, no copiada) ===
  const ranking = rankCandidatesForVacancy(sampleCandidates, sampleVacancy);
  const averageSalary = calculateAverageSalary(sampleCandidates);
  const topSkills = findTopSkills(sampleCandidates, 5);
  const byStatus = countCandidatesByStatus(sampleCandidates);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Panel de talento</h2>
        <p className="text-sm text-slate-500">
          Métricas calculadas con el módulo de lógica de negocio (Hito 2) sobre el banco de talento.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi value={sampleCandidates.length} label="Candidatos en el banco" />
        <Kpi value={`${averageSalary.toLocaleString("es-ES")} $`} label="Salario esperado medio" />
        <Kpi value={ranking[0]?.score ?? 0} label={`Mejor match · ${ranking[0]?.candidate.fullName ?? "—"}`} />
        <Kpi value={topSkills[0]?.skill ?? "—"} label="Habilidad más común" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conteo por estado */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Candidatos por estado</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {(Object.keys(byStatus) as CandidateStatus[]).map((status) => (
              <li key={status} className="flex items-center justify-between">
                <span className="text-slate-600">{STATUS_LABELS[status]}</span>
                <span className="font-semibold text-slate-900">{byStatus[status]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Top habilidades */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900">Habilidades más frecuentes</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {topSkills.map((item) => (
              <li key={item.skill} className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700 ring-1 ring-inset ring-brand-100">
                {item.skill}
                <span className="rounded-full bg-brand-600 px-1.5 text-xs font-semibold text-white">{item.count}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Ranking de candidatos para la vacante */}
      <section className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Ranking para: {sampleVacancy.title}
          </h3>
          <p className="text-sm text-slate-500">
            {sampleVacancy.companyName} · scoring 0-100 con <code className="rounded bg-slate-100 px-1">calculateCandidateScore</code>
          </p>
        </div>
        <RankingTable rows={ranking} />
      </section>
    </div>
  );
}
