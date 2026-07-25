export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github?: string;
  /** Click target — the live website */
  live: string;
  /** Optional URL used only for the card snapshot (if custom domain is new / blocked) */
  previewUrl?: string;
  accent: string;
  featured?: boolean;
};

export const profile = {
  name: "HERMYO",
  brand: "HERMYO",
  fullBrand: "HERMYO PORTFOLIO",
  role: "Modern product · AI · Web experiences",
  bio: "A curated showcase of live websites and platforms — brand sites, automation systems, and product UIs shipped with modern stacks.",
  github: "https://github.com/EAGLEVISIONDEV",
  location: "Romania",
} as const;

/** Ordered live sites only. */
export const projects: Project[] = [
  {
    id: "ovbnext",
    title: "OVB Next",
    tagline: "Automation platform",
    description:
      "OVB automation CRM — pipelines, leads, and sales workflows in one modern platform.",
    stack: ["JavaScript", "CRM", "Automation"],
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
    github: "https://github.com/EAGLEVISIONDEV/v0-saa-s-landing-page",
    live: "https://hermyo.com",
    accent: "#5eead4",
    featured: true,
  },
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

/** Live page snapshot (lightweight still — no iframe cost). */
export function liveSnapshot(url: string, width = 1200) {
  return `https://image.thum.io/get/width/${width}/noanimate/${url}`;
}
