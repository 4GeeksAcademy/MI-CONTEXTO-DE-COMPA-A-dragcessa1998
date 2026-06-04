import type { ScoredCandidate } from "@logic/types/models";

/** Tabla de ranking de candidatos con su puntaje de match (lógica del Hito 2). */
export default function RankingTable({ rows }: { rows: ScoredCandidate[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Candidato</th>
            <th className="px-4 py-3">Seniority</th>
            <th className="px-4 py-3">Salario esp.</th>
            <th className="px-4 py-3 w-48">Match</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(({ candidate, score }) => (
            <tr key={candidate.id}>
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-900">{candidate.fullName}</p>
                <p className="text-xs text-slate-500">{candidate.email}</p>
              </td>
              <td className="px-4 py-3 text-slate-700">{candidate.seniority}</td>
              <td className="px-4 py-3 text-slate-700">{candidate.expectedSalary.toLocaleString("es-ES")} $</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${score}%` }} />
                  </div>
                  <span className="w-10 text-right font-semibold text-slate-900">{score}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
