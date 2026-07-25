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
  tagline: string;
  description: string;
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
  role: "Modern product · AI · Web experiences",
  bio: "A curated orbit of live websites — one standout per niche, each built to convert and feel unforgettable.",
  github: "https://github.com/EAGLEVISIONDEV",
  location: "Romania",
} as const;

export const orbitLabels = [
  "CRM",
  "Platform",
  "AI Agents",
  "Modern Landing Pages",
  "Automation",
  "Brand Sites",
  "SaaS",
] as const;

/** Featured live products — ordered. Working production URLs only. */
export const projects: Project[] = [
  {
    id: "ovbnext",
    title: "OVB Next",
    tagline: "Automation platform",
    description:
      "OVB automation CRM — pipelines, leads, and sales workflows in one modern platform.",
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
    tagline: "Personal brand",
    description:
      "Modern personal brand website for Dobre Diana — clean layout and strong presence.",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    live: "https://dobrediana.ro",
    accent: "#f9a8d4",
    featured: true,
  },
  {
    id: "sebastian",
    title: "Sebastian Morari",
    tagline: "Personal brand site",
    description:
      "Polished website for Sebastian Morari — modern hierarchy and clear storytelling.",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    github: "https://github.com/EAGLEVISIONDEV/v0-sebastian",
    live: "https://sebastianmorari.ro",
    accent: "#38bdf8",
    featured: true,
  },
  {
    id: "carwash-pipera",
    title: "Car Wash Pipera",
    tagline: "Luxury auto care",
    description:
      "3D landing for a Pipera car wash — foam scenes, HQ photography, and conversion CTAs.",
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
    tagline: "Specialty coffee · Pipera",
    description:
      "Brand-first café site at Hyperion Towers — menu, delivery links, green & gold aesthetic.",
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
    tagline: "Premium real estate",
    description:
      "Cinematic scroll experience for real estate — immersive storytelling and property presentation.",
    stack: ["Next.js", "Motion", "TypeScript"],
    niche: "Real Estate",
    github: "https://github.com/EAGLEVISIONDEV/proiect-zoca-imobiliare",
    live: "https://demo-seven-self.vercel.app",
    accent: "#7dd3fc",
    featured: true,
  },
  {
    id: "kreya",
    title: "Kreya",
    tagline: "Modern brand site",
    description:
      "Contemporary brand experience — sharp visuals and a responsive product presence.",
    stack: ["Next.js", "Brand", "TypeScript"],
    niche: "Brand",
    live: "https://kreya.vercel.app",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "hermyo",
    title: "Hermyo",
    tagline: "SaaS product site",
    description:
      "Hermyo product landing — modern SaaS marketing, clear value props, and conversion focus.",
    stack: ["Next.js", "SaaS", "Marketing"],
    niche: "SaaS",
    github: "https://github.com/EAGLEVISIONDEV/v0-saa-s-landing-page",
    live: "https://hermyo.com",
    accent: "#5eead4",
    featured: true,
  },
];

/**
 * Demo landing pages — exactly one standout per niche.
 * Verified live URLs only.
 */
export const demoLandings: Project[] = [
  {
    id: "demo-ays",
    title: "AYS Beauty Lounge",
    tagline: "Beauty & lounge",
    description: "Hybrid beauty lounge landing with modern visuals and booking intent.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-ays-barber-beauty-lounge.vercel.app",
    accent: "#f472b6",
  },
  {
    id: "demo-elite-barber",
    title: "Elite Barber",
    tagline: "By Adelin",
    description: "Barbershop landing with sharp masculine branding and clear CTAs.",
    stack: ["Next.js", "Landing"],
    niche: "Barber",
    live: "https://demo-elite-barber-by-adelin-spt.vercel.app",
    accent: "#fbbf24",
  },
  {
    id: "demo-menadent",
    title: "Menadent Clinic",
    tagline: "Luxury dental",
    description: "Premium dental clinic landing with modern medical branding.",
    stack: ["Next.js", "Landing"],
    niche: "Dental",
    live: "https://demo-menadent-luxury-dental-clinic.vercel.app",
    accent: "#67e8f9",
  },
  {
    id: "demo-kineto",
    title: "Kineto Clinic",
    tagline: "Physio & recovery",
    description: "Clinic landing for kinetic therapy and rehabilitation.",
    stack: ["Next.js", "Landing"],
    niche: "Clinic",
    live: "https://demo-kinetoclinic-real.vercel.app",
    accent: "#4ade80",
  },
  {
    id: "demo-fortador",
    title: "Fortador Transilvania",
    tagline: "PPF · detailing",
    description: "Auto detailing / PPF showcase landing with premium auto aesthetics.",
    stack: ["Next.js", "Landing"],
    niche: "Auto",
    live: "https://demo-fortador-transilvania-ppf-deta.vercel.app",
    accent: "#94a3b8",
  },
  {
    id: "demo-isabelle",
    title: "Cofetăria Isabelle",
    tagline: "Pitești",
    description: "Pastry shop landing with warm culinary branding.",
    stack: ["Next.js", "Landing"],
    niche: "Cafe",
    live: "https://demo-cofetaria-isabelle-pitesti.vercel.app",
    accent: "#d6b48c",
  },
  {
    id: "demo-everest",
    title: "Everest Spa",
    tagline: "Spa & wellness",
    description: "Spa landing focused on calm atmosphere and packages.",
    stack: ["Next.js", "Landing"],
    niche: "Spa",
    live: "https://demo-everest-spa.vercel.app",
    accent: "#5eead4",
  },
  {
    id: "demo-hotel",
    title: "Victoria Hotel",
    tagline: "Hospitality",
    description: "Hotel landing page with booking-oriented structure.",
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
  return `https://image.thum.io/get/width/${width}/noanimate/${url}`;
}
