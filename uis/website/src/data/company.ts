/** Datos de la empresa (Nexova) tipados, para alimentar la web pública. */

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  features: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  offices: { city: string; phone: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Talento", href: "#talento" },
  { label: "Contacto", href: "#contacto" },
];

export const HERO = {
  title: "Construimos equipos excepcionales para empresas en crecimiento",
  subtitle:
    "Consultora de recursos humanos y adquisición de talento con más de 10 años ayudando a empresas de tecnología, retail y servicios financieros a encontrar y desarrollar el mejor talento.",
  cta: "Únete a nuestro banco de talento",
} as const;

export const SERVICES: Service[] = [
  {
    title: "Headhunting Ejecutivo",
    features: [
      "Búsqueda y selección de perfiles ejecutivos y mandos medios",
      "Proceso personalizado con garantía de reemplazo",
    ],
  },
  {
    title: "Outsourcing de Atención al Cliente",
    features: [
      "Equipos especializados para empresas tecnológicas",
      "Formación continua y supervisión dedicada",
    ],
  },
  {
    title: "Formación Corporativa",
    features: [
      "Programas de soft skills y liderazgo",
      "Cursos presenciales y en línea adaptados a cada organización",
    ],
  },
];

export const STATS: Stat[] = [
  { value: "12 años", label: "de experiencia en el mercado" },
  { value: "España · EE. UU.", label: "presencia regional" },
  { value: "+500", label: "procesos de selección exitosos" },
  { value: "Tech · Retail · Finanzas", label: "especialización sectorial" },
];

export const CONTACT: ContactInfo = {
  email: "contacto@nexova.com",
  offices: [
    { city: "Valencia", phone: "+34 960 123 456" },
    { city: "Miami", phone: "+1 305 555 0191" },
  ],
};
