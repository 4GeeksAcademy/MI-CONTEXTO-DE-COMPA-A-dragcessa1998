import { SERVICES } from "@/data/company";

export default function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Nuestros servicios</h2>
        <p className="mt-3 text-slate-600">
          Tres líneas de negocio para cubrir todo el ciclo de vida del talento en tu organización.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {SERVICES.map((service) => (
          <article key={service.title} className="flex flex-col rounded-2xl border border-slate-200 p-7 shadow-sm transition hover:shadow-md">
            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
            <ul className="mt-3 space-y-2 text-slate-600">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-brand-600" aria-hidden="true">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
