import Link from "next/link";
import { STATS, HERO } from "@/data/company";

export default function WhyNexova() {
  return (
    <section id="talento" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Por qué Nexova</h2>
            <p className="mt-4 text-slate-600">
              Doce años conectando a las personas adecuadas con las empresas adecuadas. Nuestra
              experiencia y nuestra red son la diferencia entre cubrir una vacante y construir un
              equipo que perdura.
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              {HERO.cta}
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-5">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <dt className="text-2xl font-extrabold text-brand-700">{stat.value}</dt>
                <dd className="mt-1 text-sm text-slate-600">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
