import Link from "next/link";
import { CONTACT, HERO } from "@/data/company";

export default function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-indigo-600 px-6 py-12 text-white sm:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Hablemos de talento</h2>
            <p className="mt-3 max-w-md text-brand-50">
              ¿Buscas tu próxima oportunidad profesional? Únete a nuestro banco de talento.
              ¿Eres una empresa que necesita cubrir posiciones clave? Escríbenos.
            </p>
            <Link
              href="/apply"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 shadow-md transition hover:bg-brand-50"
            >
              {HERO.cta}
            </Link>
          </div>

          <address className="not-italic">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span aria-hidden="true">✉️</span>
                <span>
                  Email:{" "}
                  <a className="font-semibold underline decoration-white/40 underline-offset-2 hover:decoration-white" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </span>
              </li>
              {CONTACT.offices.map((office) => (
                <li key={office.city} className="flex items-start gap-3">
                  <span aria-hidden="true">📍</span>
                  <span>
                    {office.city}:{" "}
                    <a className="font-semibold hover:underline" href={`tel:${office.phone.replace(/\s/g, "")}`}>
                      {office.phone}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </address>
        </div>
      </div>
    </section>
  );
}
