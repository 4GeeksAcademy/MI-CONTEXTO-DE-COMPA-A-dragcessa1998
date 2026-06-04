"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ApplyValues,
  ApplyErrors,
  EMPTY_APPLY,
  MAX_COMMENTS,
  COUNTRIES,
  SECTORS,
  ENGLISH_LEVELS,
  AVAILABILITY,
  validateApply,
} from "@/lib/validation";

const inputBase =
  "mt-1 block w-full rounded-lg border px-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600/30";

function fieldClass(error?: string): string {
  return error ? `${inputBase} border-red-400` : `${inputBase} border-slate-300 focus:border-brand-600`;
}

export default function ApplyForm() {
  const [values, setValues] = useState<ApplyValues>(EMPTY_APPLY);
  const [errors, setErrors] = useState<ApplyErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function setField<K extends keyof ApplyValues>(field: K, value: ApplyValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validationErrors = validateApply(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleReset() {
    setValues(EMPTY_APPLY);
    setErrors({});
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900">
        <h1 className="text-2xl font-bold">¡Gracias por tu interés en Nexova!</h1>
        <p className="mt-3">
          Hemos recibido tu información. Nuestro equipo de selección la revisará y te contactaremos en
          caso de que tu perfil encaje con alguna de nuestras oportunidades actuales o futuras.
        </p>
        <p className="mt-2">
          Mientras tanto, síguenos en{" "}
          <a className="font-semibold underline" href="https://linkedin.com/company/nexova" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          para estar al día de nuestras vacantes.
        </p>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white hover:bg-emerald-700">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const remaining = MAX_COMMENTS - values.comments.length;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Únete a nuestro banco de talento</h1>
      <p className="mt-2 text-slate-600">
        Los campos marcados con <span className="font-semibold text-brand-700">*</span> son obligatorios.
      </p>

      <aside role="note" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        ¿Eres una empresa buscando talento? Escríbenos a{" "}
        <a className="font-semibold underline" href="mailto:contacto@nexova.com">contacto@nexova.com</a>
      </aside>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Nombre completo <span className="text-brand-700">*</span></label>
          <input id="fullName" type="text" value={values.fullName} onChange={(e) => setField("fullName", e.target.value)} className={fieldClass(errors.fullName)} placeholder="Ej: María González" />
          {errors.fullName && <p role="alert" className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email <span className="text-brand-700">*</span></label>
          <input id="email" type="email" value={values.email} onChange={(e) => setField("email", e.target.value)} className={fieldClass(errors.email)} placeholder="nombre@empresa.com" />
          {errors.email && <p role="alert" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Teléfono <span className="text-brand-700">*</span></label>
          <input id="phone" type="tel" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className={fieldClass(errors.phone)} placeholder="+34 612 345 678" />
          {errors.phone && <p role="alert" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-700">País de residencia <span className="text-brand-700">*</span></label>
          <select id="country" value={values.country} onChange={(e) => setField("country", e.target.value)} className={fieldClass(errors.country)}>
            <option value="">Selecciona una opción…</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p role="alert" className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-slate-700">Años de experiencia <span className="text-brand-700">*</span></label>
          <input id="experience" type="number" min={0} max={50} value={values.experience} onChange={(e) => setField("experience", e.target.value)} className={fieldClass(errors.experience)} placeholder="Ej: 5" />
          {errors.experience && <p role="alert" className="mt-1 text-sm text-red-600">{errors.experience}</p>}
        </div>

        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-slate-700">Sector de interés <span className="text-brand-700">*</span></label>
          <select id="sector" value={values.sector} onChange={(e) => setField("sector", e.target.value)} className={fieldClass(errors.sector)}>
            <option value="">Selecciona una opción…</option>
            {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.sector && <p role="alert" className="mt-1 text-sm text-red-600">{errors.sector}</p>}
        </div>

        <div>
          <label htmlFor="english" className="block text-sm font-medium text-slate-700">Nivel de inglés <span className="text-brand-700">*</span></label>
          <select id="english" value={values.english} onChange={(e) => setField("english", e.target.value)} className={fieldClass(errors.english)}>
            <option value="">Selecciona una opción…</option>
            {ENGLISH_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          {errors.english && <p role="alert" className="mt-1 text-sm text-red-600">{errors.english}</p>}
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-slate-700">Disponibilidad <span className="text-brand-700">*</span></legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {AVAILABILITY.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-3 py-2.5 hover:bg-slate-50">
                <input type="radio" name="availability" value={option} checked={values.availability === option} onChange={(e) => setField("availability", e.target.value)} className="h-4 w-4 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
          {errors.availability && <p role="alert" className="mt-1 text-sm text-red-600">{errors.availability}</p>}
        </fieldset>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700">LinkedIn (URL del perfil)</label>
          <input id="linkedin" type="url" value={values.linkedin} onChange={(e) => setField("linkedin", e.target.value)} className={fieldClass(errors.linkedin)} placeholder="https://linkedin.com/in/tu-perfil" />
          {errors.linkedin && <p role="alert" className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-slate-700">Comentarios adicionales</label>
          <textarea id="comments" rows={4} maxLength={MAX_COMMENTS} value={values.comments} onChange={(e) => setField("comments", e.target.value)} className={fieldClass(errors.comments)} placeholder="Cuéntanos qué tipo de oportunidad buscas (opcional)" />
          <p className={`mt-1 text-right text-xs ${remaining < 0 ? "text-red-600" : "text-slate-500"}`}>Quedan {remaining} caracteres</p>
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={values.dataPolicy} onChange={(e) => setField("dataPolicy", e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
            <span className="text-sm text-slate-700">Acepto la política de tratamiento de datos <span className="text-brand-700">*</span></span>
          </label>
          {errors.dataPolicy && <p role="alert" className="mt-1 text-sm text-red-600">{errors.dataPolicy}</p>}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row-reverse">
          <button type="submit" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:flex-1">
            Enviar mi registro
          </button>
          <button type="button" onClick={handleReset} className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex-1">
            Limpiar formulario
          </button>
        </div>
      </form>
    </div>
  );
}
