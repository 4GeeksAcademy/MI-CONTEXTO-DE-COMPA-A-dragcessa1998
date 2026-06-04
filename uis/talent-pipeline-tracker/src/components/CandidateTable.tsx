import Link from "next/link";
import type { TrackerRecord } from "@/types/tracker";
import { StatusBadge, StageBadge } from "./ui";

/**
 * Listado de candidaturas. Cada fila enlaza al detalle del candidato usando el
 * enrutado de Next.js (sin recarga completa de página).
 */
export default function CandidateTable({ records }: { records: TrackerRecord[] }) {
  return (
    <ul className="space-y-2">
      {records.map((record) => (
        <li key={record.id}>
          <Link
            href={`/candidates/${record.id}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">{record.full_name}</p>
              <p className="truncate text-sm text-slate-500">{record.email}</p>
              <p className="mt-1 truncate text-sm text-slate-600">{record.position}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <StatusBadge value={record.status} />
              <StageBadge value={record.stage} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
