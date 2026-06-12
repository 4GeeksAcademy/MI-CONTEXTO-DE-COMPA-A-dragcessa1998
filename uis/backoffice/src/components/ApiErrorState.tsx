const DEFAULT_HELP = `cd services/talent-api\nnpm install\nnpm run dev   # http://localhost:4000`;

/** Estado de error compartido: mensaje + ayuda para arrancar la API + reintentar. */
export default function ApiErrorState({
  message,
  onRetry,
  helpCommand = DEFAULT_HELP,
}: {
  message: string;
  onRetry: () => void;
  helpCommand?: string;
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <h3 className="text-sm font-bold text-rose-800">No se pudo cargar desde la API</h3>
      <p className="mt-1 text-sm text-rose-700">{message}</p>
      <div className="mt-4 rounded-lg bg-white/70 p-3 text-xs text-slate-600">
        <p className="font-semibold text-slate-700">¿Está corriendo la API?</p>
        <pre className="mt-1 overflow-x-auto">
          <code>{helpCommand}</code>
        </pre>
      </div>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700"
      >
        Reintentar
      </button>
    </div>
  );
}
