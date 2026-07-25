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
  bio: "A curated showcase of live websites and platforms — CRM systems, brand sites, SaaS landings, and niche demo experiences.",
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

/** Featured live products — ordered. */
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
    live: "https://dobrediana.com",
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
    live: "https://sebastianmorari.com",
    previewUrl: "https://v0-sebastian-morari.vercel.app",
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

/** Demo landing pages — separate gallery. */
export const demoLandings: Project[] = [
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
    id: "demo-paroimplant",
    title: "Paroimplant",
    tagline: "Dental · Dr. Dontu",
    description: "Specialist dental practice site focused on trust and services.",
    stack: ["Next.js", "Landing"],
    niche: "Dental",
    live: "https://demo-paroimplant-dr-dontu-denis.vercel.app",
    accent: "#22d3ee",
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
    id: "demo-bliss",
    title: "Bliss Kineto",
    tagline: "Bacău clinic",
    description: "Modern kinetotherapy brand site with clear CTAs.",
    stack: ["Next.js", "Landing"],
    niche: "Clinic",
    live: "https://demo-bliss-kineto-bacau-nine.vercel.app",
    accent: "#86efac",
  },
  {
    id: "demo-elite-barber",
    title: "Elite Barber",
    tagline: "By Adelin",
    description: "Barbershop landing with sharp masculine branding.",
    stack: ["Next.js", "Landing"],
    niche: "Barber",
    live: "https://demo-elite-barber-by-adelin-spt.vercel.app",
    accent: "#fbbf24",
  },
  {
    id: "demo-supertuns",
    title: "Supertuns",
    tagline: "Frizerie",
    description: "Local barbershop demo with schedule-focused layout.",
    stack: ["Next.js", "Landing"],
    niche: "Barber",
    live: "https://demo-supertuns-frizerie.vercel.app",
    accent: "#f59e0b",
  },
  {
    id: "demo-kingsman",
    title: "King's Man",
    tagline: "Barber shop",
    description: "Premium barber experience landing page.",
    stack: ["Next.js", "Landing"],
    niche: "Barber",
    live: "https://demo-king-s-man-barber-shop.vercel.app",
    accent: "#eab308",
  },
  {
    id: "demo-ays",
    title: "AYS Beauty Lounge",
    tagline: "Barber & beauty",
    description: "Hybrid beauty lounge landing with modern visuals.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-ays-barber-beauty-lounge.vercel.app",
    accent: "#f472b6",
  },
  {
    id: "demo-belle",
    title: "Belle Nail Studio",
    tagline: "Nails & beauty",
    description: "Nail studio landing with soft premium aesthetics.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-belle-nail-studio.vercel.app",
    accent: "#fb7185",
  },
  {
    id: "demo-anita",
    title: "Anita Beauty",
    tagline: "Beauty studio",
    description: "Beauty studio demo with elegant service presentation.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-anita-the-beauty-studio.vercel.app",
    accent: "#e879f9",
  },
  {
    id: "demo-ada",
    title: "Ada Beauty Salon",
    tagline: "Salon",
    description: "Salon landing focused on treatments and booking intent.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-ada-beauty-salon.vercel.app",
    accent: "#c084fc",
  },
  {
    id: "demo-apollo",
    title: "Apollo Beauty",
    tagline: "City Park salon",
    description: "Upscale salon landing with location-forward design.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-apollo-beauty-salon-city-park.vercel.app",
    accent: "#a78bfa",
  },
  {
    id: "demo-atelier214",
    title: "Atelier 214",
    tagline: "Hair & beauty",
    description: "Hair & beauty atelier demo with editorial layout.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-atelier-214-hair-beauty.vercel.app",
    accent: "#818cf8",
  },
  {
    id: "demo-loran",
    title: "Loran Clinique",
    tagline: "Beauty clinic",
    description: "Clinique-style beauty brand landing page.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-loran-clinique.vercel.app",
    accent: "#60a5fa",
  },
  {
    id: "demo-vulcanizare",
    title: "Vulcanizare",
    tagline: "Auto service",
    description: "Automotive service landing for tire & repair businesses.",
    stack: ["Next.js", "Landing"],
    niche: "Auto",
    live: "https://demo-vulcanizare.vercel.app",
    accent: "#94a3b8",
  },
  {
    id: "demo-fortador",
    title: "Fortador Transilvania",
    tagline: "PPF · detailing",
    description: "Auto detailing / PPF showcase landing.",
    stack: ["Next.js", "Landing"],
    niche: "Auto",
    live: "https://demo-fortador-transilvania-ppf-deta.vercel.app",
    accent: "#64748b",
  },
  {
    id: "demo-dottdetailing",
    title: "Dott Detailing",
    tagline: "Car detailing",
    description: "Detailing studio landing with premium auto aesthetics.",
    stack: ["Next.js", "Landing"],
    niche: "Auto",
    live: "https://demo-dottdetailing.vercel.app",
    accent: "#738496",
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
    id: "demo-victoria-spa",
    title: "Victoria Spa",
    tagline: "Wellness",
    description: "Wellness spa demo with soft luxury cues.",
    stack: ["Next.js", "Landing"],
    niche: "Spa",
    live: "https://demo-victoria-spa.vercel.app",
    accent: "#2dd4bf",
  },
  {
    id: "demo-renovari",
    title: "Renovări Apartamente",
    tagline: "București",
    description: "Home renovation services landing for Bucharest clients.",
    stack: ["Next.js", "Landing"],
    niche: "Landing Page",
    live: "https://demo-renovari-apartamente-bucuresti.vercel.app",
    accent: "#fdba74",
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
  {
    id: "demo-salon-cochet",
    title: "Salon Cochet",
    tagline: "Beauty salon",
    description: "Salon demo with polished service sections.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-salon-cochet.vercel.app",
    accent: "#f9a8d4",
  },
  {
    id: "demo-petra",
    title: "Petra Lashes",
    tagline: "Brows & lashes",
    description: "Lash & brow specialist landing page.",
    stack: ["Next.js", "Landing"],
    niche: "Beauty",
    live: "https://demo-petra-lashes-brows.vercel.app",
    accent: "#f0abfc",
  },
];

export const workNiches: Niche[] = [
  "CRM",
  "Platform",
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
