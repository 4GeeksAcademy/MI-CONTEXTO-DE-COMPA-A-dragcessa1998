"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { STATUS_OPTIONS, STAGE_OPTIONS } from "@/lib/labels";

interface FiltersProps {
  status: string;
  stage: string;
  search: string;
}

/**
 * Controles de filtrado (estado, etapa) y búsqueda (nombre/email).
 * Todo el estado vive en la URL como query params: al cambiar un control se
 * actualiza la URL con router.replace y la vista vuelve a consultar la API
 * sin recargar la página. La búsqueda se aplica con debounce.
 */
export default function Filters({ status, stage, search }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState(search);
  const isFirstRender = useRef(true);

  // Mantiene el input sincronizado si la URL cambia desde fuera (p. ej. "Limpiar").
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  function buildHref(next: Partial<{ status: string; stage: string; q: string }>): string {
    const merged = { status, stage, q: search, ...next };
    const params = new URLSearchParams();
    if (merged.status) params.set("status", merged.status);
    if (merged.stage) params.set("stage", merged.stage);
    if (merged.q) params.set("q", merged.q);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  // Debounce de la búsqueda → URL.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const handle = setTimeout(() => {
      if (searchInput !== search) {
        router.replace(buildHref({ q: searchInput }));
      }
    }, 350);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const hasFilters = Boolean(status || stage || search);

  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Búsqueda */}
      <div className="lg:col-span-2">
        <label htmlFor="search" className="block text-xs font-medium text-slate-600">
          Buscar por nombre o email
        </label>
        <input
          id="search"
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Ej: maria o maria@email.com"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
      </div>

      {/* Filtro por estado */}
      <div>
        <label htmlFor="status" className="block text-xs font-medium text-slate-600">
          Estado
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => router.replace(buildHref({ status: event.target.value }))}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        >
          <option value="">Todos los estados</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por etapa */}
      <div>
        <label htmlFor="stage" className="block text-xs font-medium text-slate-600">
          Etapa
        </label>
        <select
          id="stage"
          value={stage}
          onChange={(event) => router.replace(buildHref({ stage: event.target.value }))}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        >
          <option value="">Todas las etapas</option>
          {STAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <div className="sm:col-span-2 lg:col-span-4">
          <button
            type="button"
            onClick={() => router.replace(pathname)}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
