import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/website/SiteHeader";
import SiteFooter from "@/components/website/SiteFooter";

export const metadata: Metadata = {
  title: "Nexova — Construimos equipos excepcionales para empresas en crecimiento",
  description:
    "Nexova es una consultora de recursos humanos y adquisición de talento con más de 10 años ayudando a empresas de tecnología, retail y servicios financieros a encontrar y desarrollar el mejor talento.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-3 focus:top-3 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
