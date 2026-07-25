export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  accent: string;
  featured?: boolean;
  /** Some apps send X-Frame-Options: DENY — use screenshot-only preview */
  iframeBlocked?: boolean;
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

/** Only projects with a working live demo. */
export const projects: Project[] = [
  {
    id: "ovb",
    title: "OVB Automation",
    tagline: "CRM · sales platform",
    description:
      "Complete OVB automation CRM — pipelines, leads, and operational workflows in one modern platform.",
    stack: ["JavaScript", "CRM", "Automation"],
    github: "https://github.com/EAGLEVISIONDEV/OVB-automation",
    live: "https://ovb-automation.vercel.app",
    accent: "#fb7185",
    featured: true,
    iframeBlocked: true,
  },
  {
    id: "sebastian",
    title: "Sebastian Morari",
    tagline: "Personal brand site",
    description:
      "Polished personal website for Sebastian Morari — modern layout and strong visual hierarchy.",
    stack: ["Next.js", "v0", "TypeScript"],
    github: "https://github.com/EAGLEVISIONDEV/v0-sebastian",
    live: "https://v0-sebastian-morari.vercel.app",
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
    id: "matei",
    title: "Matei",
    tagline: "Modern brand site",
    description:
      "Contemporary personal / brand landing with clean structure and responsive design.",
    stack: ["Next.js", "v0", "TypeScript"],
    github: "https://github.com/EAGLEVISIONDEV/v0-matei",
    live: "https://v0-matei.vercel.app",
    accent: "#34d399",
  },
  {
    id: "saas",
    title: "SaaS Landing",
    tagline: "Product marketing page",
    description:
      "High-converting SaaS landing page — modern sections, clear CTAs, product-focused layout.",
    stack: ["Next.js", "v0", "Marketing"],
    github: "https://github.com/EAGLEVISIONDEV/v0-saa-s-landing-page",
    live: "https://v0-saa-s-landing-page-orcin-xi.vercel.app",
    accent: "#a78bfa",
  },
  {
    id: "iron-man",
    title: "Iron Man",
    tagline: "Interactive experience",
    description:
      "Immersive creative build exploring cinematic UI and interaction patterns.",
    stack: ["TypeScript", "Creative"],
    github: "https://github.com/EAGLEVISIONDEV/iron-man",
    live: "https://iron-man-jet.vercel.app",
    accent: "#f87171",
  },
  {
    id: "photography",
    title: "Photography Portfolio",
    tagline: "Visual gallery site",
    description:
      "Elegant photography portfolio — image-led layout for showcasing visual work.",
    stack: ["Next.js", "v0", "Gallery"],
    github: "https://github.com/EAGLEVISIONDEV/v0-photography-portfolio-website",
    live: "https://v0-photography-portfolio-website-mocha.vercel.app",
    accent: "#e2e8f0",
  },
  {
    id: "events",
    title: "Events Landing",
    tagline: "React events page",
    description:
      "Modern events landing — schedules, highlights, and promotional storytelling.",
    stack: ["React", "v0", "Landing"],
    github: "https://github.com/EAGLEVISIONDEV/v0-react-events-landing-page",
    live: "https://v0-react-events-landing-page.vercel.app",
    accent: "#f472b6",
  },
  {
    id: "ai-voice",
    title: "Romanian AI Assistant",
    tagline: "Voice AI product",
    description:
      "AI voice assistant experience — conversational product UI and modern branding.",
    stack: ["TypeScript", "AI", "Voice"],
    github: "https://github.com/EAGLEVISIONDEV/ai-voice-agent",
    live: "https://v0-romanian-ai-assistant.vercel.app",
    accent: "#22d3ee",
  },
  {
    id: "pfa",
    title: "Popovici Octavian PFA",
    tagline: "Services portfolio",
    description:
      "Professional services site for software development — clear packaging and branding.",
    stack: ["Next.js", "TypeScript"],
    github: "https://github.com/EAGLEVISIONDEV/popovici-octavian-pfa",
    live: "https://popovici-octavian-pfa.vercel.app",
    accent: "#60a5fa",
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

/** Live page snapshot URL (works even when iframe is blocked). */
export function liveSnapshot(url: string, width = 1400) {
  return `https://image.thum.io/get/width/${width}/noanimate/${url}`;
}
