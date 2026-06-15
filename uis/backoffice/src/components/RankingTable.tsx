/** Fila de ranking lista para pintar (compuesta en el cliente a partir de la API). */
export interface RankingRow {
  id: string;
  fullName: string;
  email?: string;
  seniority: string;
  expectedSalary?: number;
  score: number;
}

/** Tabla de ranking de candidatos con su puntaje de match (scoring del Hito 2 servido por la API). */
export default function RankingTable({ rows }: { rows: RankingRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-4 py-3">Candidato</th>
            <th scope="col" className="px-4 py-3">Seniority</th>
            <th scope="col" className="px-4 py-3">Salario esp.</th>
            <th scope="col" className="px-4 py-3 w-48">Match</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-900">{row.fullName}</p>
                <p className="text-xs text-slate-500">{row.email ?? row.id}</p>
              </td>
              <td className="px-4 py-3 text-slate-700">{row.seniority}</td>
              <td className="px-4 py-3 text-slate-700">
                {row.expectedSalary != null ? `${row.expectedSalary.toLocaleString("es-ES")} $` : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${row.score}%` }} />
                  </div>
                  <span className="w-10 text-right font-semibold text-slate-900">{row.score}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
