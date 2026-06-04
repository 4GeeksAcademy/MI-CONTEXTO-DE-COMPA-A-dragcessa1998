"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, HERO } from "@/data/company";

/** Cabecera pública con navegación responsive (menú móvil accesible). */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Nexova, ir a inicio">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-lg font-black text-white">
            N
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Nexova</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-brand-600" href={`/${link.href}`}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/apply"
                className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                {HERO.cta}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Abrir menú de navegación"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Navegación principal móvil" className="border-t border-slate-200 bg-white md:hidden">
          <ul className="space-y-1 px-4 py-3 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className="block rounded-lg px-3 py-2 hover:bg-slate-100" href={`/${link.href}`} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-600 px-3 py-2 text-center font-semibold text-white"
              >
                {HERO.cta}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
