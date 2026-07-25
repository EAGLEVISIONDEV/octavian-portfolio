export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
  accent: string;
  featured?: boolean;
};

export const profile = {
  name: "Octavian Popovici",
  brand: "EAGLE VISION",
  role: "AI Engineer · Full-Stack · Product Builder",
  bio: "I design and ship AI-native products, automation systems, and high-impact web experiences — from multi-agent platforms to premium brand sites.",
  github: "https://github.com/EAGLEVISIONDEV",
  email: null as string | null,
  location: "Romania",
} as const;

export const projects: Project[] = [
  {
    id: "carwash-pipera",
    title: "Car Wash Pipera",
    tagline: "Luxury auto care landing",
    description:
      "Ultra-modern 3D landing for a Pipera car wash — R3F foam scenes, HQ photography, and conversion-focused CTAs.",
    stack: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
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
      "Brand-first café site for Hyperion Towers — menu synced from Wolt, green & gold aesthetic, delivery CTAs.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    github: "https://github.com/EAGLEVISIONDEV/ricco",
    live: "https://ricco-xi.vercel.app",
    accent: "#c9b28a",
    featured: true,
  },
  {
    id: "zoca",
    title: "Zoca Imobiliare",
    tagline: "Premium real estate scroll",
    description:
      "Cinematic scroll experience for a real-estate brand — immersive storytelling and polished property presentation.",
    stack: ["Next.js", "TypeScript", "Motion"],
    github: "https://github.com/EAGLEVISIONDEV/proiect-zoca-imobiliare",
    live: "https://demo-seven-self.vercel.app",
    accent: "#7dd3fc",
    featured: true,
  },
  {
    id: "ai-agency",
    title: "Octavian AI Agency OS",
    tagline: "Multi-agent business platform",
    description:
      "Autonomous AI-native operating system — orchestration, Next.js dashboard, microservices, Kubernetes-ready.",
    stack: ["Next.js", "AI Agents", "Microservices", "K8s"],
    github: "https://github.com/EAGLEVISIONDEV/octavian-ai-agency",
    accent: "#34d399",
    featured: true,
  },
  {
    id: "ovb",
    title: "OVB Automation CRM",
    tagline: "Complete sales automation",
    description:
      "End-to-end CRM automation for OVB workflows — lead handling, pipelines, and operational tooling.",
    stack: ["JavaScript", "CRM", "Automation"],
    github: "https://github.com/EAGLEVISIONDEV/OVB-automation",
    accent: "#fb7185",
  },
  {
    id: "jarvis",
    title: "JARVIS One",
    tagline: "Voice-first macOS AI",
    description:
      "MCU-inspired voice assistant for macOS — talk naturally, get work done, offline-capable architecture.",
    stack: ["Python", "Voice AI", "macOS"],
    github: "https://github.com/EAGLEVISIONDEV/jarvis-one",
    accent: "#a78bfa",
  },
  {
    id: "pfa",
    title: "Popovici Octavian PFA",
    tagline: "Services portfolio",
    description:
      "Professional site for software development services — clean branding and clear service packaging.",
    stack: ["Next.js", "TypeScript"],
    github: "https://github.com/EAGLEVISIONDEV/popovici-octavian-pfa",
    live: "https://popovici-octavian-pfa.vercel.app",
    accent: "#38bdf8",
  },
  {
    id: "ai-projects",
    title: "AI Projects Hub",
    tagline: "Built projects portfolio",
    description:
      "Curated showcase of AI agency builds — demos, experiments, and production-facing prototypes.",
    stack: ["TypeScript", "AI", "Next.js"],
    github: "https://github.com/EAGLEVISIONDEV/octavian-ai-projects",
    accent: "#f472b6",
  },
  {
    id: "iron-man",
    title: "Iron Man",
    tagline: "Interactive experience",
    description:
      "Creative TypeScript build exploring immersive UI and cinematic interaction patterns.",
    stack: ["TypeScript", "Creative"],
    github: "https://github.com/EAGLEVISIONDEV/iron-man",
    accent: "#f87171",
  },
  {
    id: "trading",
    title: "Stock Trading Bot",
    tagline: "High-performance Rust bot",
    description:
      "Advanced market trading bot engineered in Rust for speed, reliability, and systematic execution.",
    stack: ["Rust", "Trading", "Systems"],
    github: "https://github.com/EAGLEVISIONDEV/stock-market-trading-bot",
    accent: "#4ade80",
  },
];

export const skills = [
  "Next.js",
  "TypeScript",
  "React Three Fiber",
  "AI Agents",
  "Python",
  "Rust",
  "Framer Motion",
  "Vercel",
  "Automation",
  "Product Design",
] as const;
