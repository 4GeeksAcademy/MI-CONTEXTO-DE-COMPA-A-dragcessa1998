/** Tarjeta de KPI: valor destacado + etiqueta. */
export default function Kpi({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-extrabold text-brand-700">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
