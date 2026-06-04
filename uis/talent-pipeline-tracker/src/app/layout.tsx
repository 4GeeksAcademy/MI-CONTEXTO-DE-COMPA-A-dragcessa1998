import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talent Pipeline Tracker — Nexova",
  description:
    "Herramienta interna de People & Talent de Nexova para gestionar las candidaturas del proceso de selección.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-lg font-black text-white">
                N
              </span>
              <span className="leading-tight">
                <span className="block text-base font-extrabold text-slate-900">Nexova</span>
                <span className="block text-xs text-slate-500">People &amp; Talent — Seguimiento de candidaturas</span>
              </span>
            </Link>
            <nav aria-label="Acciones" className="flex items-center gap-3 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-brand-600">
                Candidaturas
              </Link>
              <Link
                href="/candidates/new"
                className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                + Nueva candidatura
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
