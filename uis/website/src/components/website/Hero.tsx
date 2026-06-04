import Link from "next/link";
import { HERO } from "@/data/company";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-500 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Recursos Humanos · Adquisición de Talento
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{HERO.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-brand-50">{HERO.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-md transition hover:bg-brand-50"
            >
              {HERO.cta}
            </Link>
            <Link
              href="/#servicios"
              className="rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ver servicios
            </Link>
          </div>
        </div>

        <div className="hidden md:block" aria-hidden="true">
          <svg viewBox="0 0 400 320" className="mx-auto w-full max-w-md drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="40" width="360" height="240" rx="20" fill="white" opacity="0.10" />
            <rect x="50" y="80" width="140" height="160" rx="14" fill="white" opacity="0.18" />
            <rect x="210" y="80" width="140" height="70" rx="14" fill="white" opacity="0.18" />
            <rect x="210" y="170" width="140" height="70" rx="14" fill="white" opacity="0.18" />
            <circle cx="120" cy="130" r="26" fill="white" opacity="0.85" />
            <rect x="80" y="170" width="80" height="12" rx="6" fill="white" opacity="0.6" />
            <rect x="80" y="192" width="56" height="10" rx="5" fill="white" opacity="0.4" />
            <circle cx="245" cy="115" r="16" fill="white" opacity="0.85" />
            <circle cx="245" cy="205" r="16" fill="white" opacity="0.85" />
          </svg>
        </div>
      </div>
    </section>
  );
}
