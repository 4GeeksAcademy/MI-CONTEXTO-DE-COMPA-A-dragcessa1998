import Dashboard from "@/components/Dashboard";

/**
 * Página del panel. El backoffice ahora consume la Nexova Talent API (Hito 5) en
 * vivo: toda la carga de datos vive en el componente cliente `Dashboard`.
 */
export default function DashboardPage() {
  return <Dashboard />;
}
