export type Niche =
  | "CRM"
  | "Platform"
  | "Landing Page"
  | "Brand"
  | "SaaS"
  | "Beauty"
  | "Barber"
  | "Dental"
  | "Auto"
  | "Cafe"
  | "Spa"
  | "Clinic"
  | "Real Estate";

export type Project = {
  id: string;
  title: string;
  stack: string[];
  niche: Niche;
  github?: string;
  live: string;
  previewUrl?: string;
  accent: string;
  featured?: boolean;
};

export const profile = {
  name: "HERMYO",
  brand: "HERMYO",
  fullBrand: "HERMYO PORTFOLIO",
  github: "https://github.com/EAGLEVISIONDEV",
  location: "Romania",
} as const;

/** Featured live products — ordered. */
export const projects: Project[] = [
  {
    id: "ovbnext",
    title: "OVB Next",
    stack: ["JavaScript", "CRM", "Automation"],
    niche: "CRM",
    github: "https://github.com/EAGLEVISIONDEV/OVB-automation",
    live: "https://www.ovbnext.com",
    accent: "#fb7185",
    featured: true,
  },
  {
    id: "dobrediana",
    title: "Dobre Diana",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    live: "https://dobrediana.ro",
    accent: "#f9a8d4",
    featured: true,
  },
  {
    id: "sebastian",
    title: "Sebastian Morari",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    github: "https://github.com/EAGLEVISIONDEV/v0-sebastian",
    live: "https://sebastianmorari.ro",
    accent: "#38bdf8",
    featured: true,
  },
  {
    id: "eidan",
    title: "Eidan",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    live: "https://eidan.ro",
    accent: "#fbbf24",
    featured: true,
  },
  {
    id: "kreya",
    title: "Kreya",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    live: "https://kreya.ro",
    previewUrl: "https://kreya.vercel.app",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "aiflex",
    title: "AIFlex",
    stack: ["Next.js", "AI", "SaaS"],
    niche: "SaaS",
    live: "https://aiflex.ro",
    accent: "#a78bfa",
    featured: true,
  },
  {
    id: "carwash-pipera",
    title: "Car Wash Pipera",
    stack: ["Next.js", "Three.js", "Framer Motion"],
    niche: "Landing Page",
    github: "https://github.com/EAGLEVISIONDEV/carwash-pipera",
    live: "https://carwash-pipera.vercel.app",
    accent: "#f0d000",
    featured: true,
  },
  {
    id: "ricco",
    title: "RICCO",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    niche: "Cafe",
    github: "https://github.com/EAGLEVISIONDEV/ricco",
    live: "https://ricco-xi.vercel.app",
    accent: "#c9b28a",
    featured: true,
  },
  {
    id: "zoca",
    title: "Zoca Imobiliare",
    stack: ["Next.js", "Motion", "TypeScript"],
    niche: "Real Estate",
    github: "https://github.com/EAGLEVISIONDEV/proiect-zoca-imobiliare",
    live: "https://demo-seven-self.vercel.app",
    accent: "#7dd3fc",
    featured: true,
  },
  {
    id: "hermyo",
    title: "Hermyo",
    stack: ["Next.js", "SaaS", "Marketing"],
    niche: "SaaS",
    github: "https://github.com/EAGLEVISIONDEV/v0-saa-s-landing-page",
    live: "https://hermyo.com",
    accent: "#5eead4",
    featured: true,
  },
];

/** Demo landing pages — exactly one standout per niche. */
export const demoLandings: Project[] = [
  {
    id: "demo-ays",
    title: "AYS Beauty Lounge",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-ays-barber-beauty-lounge.vercel.app",
    accent: "#f472b6",
  },
  {
    id: "demo-elite-barber",
    title: "Elite Barber",
    stack: ["Next.js", "Landing"],
    niche: "Barber",
    live: "https://demo-elite-barber-by-adelin-spt.vercel.app",
    accent: "#fbbf24",
  },
  {
    id: "demo-menadent",
    title: "Menadent Clinic",
    stack: ["Next.js", "Landing"],
    niche: "Dental",
    live: "https://demo-menadent-luxury-dental-clinic.vercel.app",
    accent: "#67e8f9",
  },
  {
    id: "demo-kineto",
    title: "Kineto Clinic",
    stack: ["Next.js", "Landing"],
    niche: "Clinic",
    live: "https://demo-kinetoclinic-real.vercel.app",
    accent: "#4ade80",
  },
  {
    id: "demo-fortador",
    title: "Fortador Transilvania",
    stack: ["Next.js", "Landing"],
    niche: "Auto",
    live: "https://demo-fortador-transilvania-ppf-deta.vercel.app",
    accent: "#94a3b8",
  },
  {
    id: "demo-isabelle",
    title: "Cofetăria Isabelle",
    stack: ["Next.js", "Landing"],
    niche: "Cafe",
    live: "https://demo-cofetaria-isabelle-pitesti.vercel.app",
    accent: "#d6b48c",
  },
  {
    id: "demo-everest",
    title: "Everest Spa",
    stack: ["Next.js", "Landing"],
    niche: "Spa",
    live: "https://demo-everest-spa.vercel.app",
    accent: "#5eead4",
  },
  {
    id: "demo-hotel",
    title: "Victoria Hotel",
    stack: ["Next.js", "Landing"],
    niche: "Landing Page",
    live: "https://demo-victoria-hotel.vercel.app",
    accent: "#fca5a5",
  },
];

export const workNiches: Niche[] = [
  "CRM",
  "SaaS",
  "Brand",
  "Landing Page",
  "Cafe",
  "Real Estate",
];

export const demoNiches: Niche[] = [
  "Beauty",
  "Barber",
  "Dental",
  "Clinic",
  "Auto",
  "Cafe",
  "Spa",
  "Landing Page",
];

export const skills = [
  "Next.js",
  "TypeScript",
  "React Three Fiber",
  "AI Agents",
  "Automation",
  "Framer Motion",
  "Vercel",
  "Product Design",
  "CRM Platforms",
  "Brand Sites",
] as const;

export function liveSnapshot(url: string, width = 1200) {
  // wait/3 = hold 3s after load so JS/animations settle before capture
  return `https://image.thum.io/get/width/${width}/crop/800/wait/3/noanimate/${url}`;
}
