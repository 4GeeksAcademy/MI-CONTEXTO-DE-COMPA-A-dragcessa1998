/** Pie de página corporativo. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-slate-500">© 2025 Nexova. Todos los derechos reservados.</p>
        <nav aria-label="Redes sociales">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <li>
              <a className="hover:text-brand-600" href="https://linkedin.com/company/nexova" rel="noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hover:text-brand-600" href="https://instagram.com/nexova" rel="noopener" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
