"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Niche } from "@/lib/data";

export type Locale = "ro" | "en";

type Dictionary = {
  nav: { work: string; demos: string; skills: string; about: string; contact: string; github: string; menu: string };
  hero: { portfolio: string; ctaWork: string; ctaDemos: string; role: string; bio: string };
  work: { eyebrow: string; title: string; subtitle: string };
  demos: { eyebrow: string; title: string; subtitle: string };
  skills: { eyebrow: string; title: string };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    studio: string;
    based: string;
    github: string;
  };
  contact: { eyebrow: string; title: string; body: string; cta: string };
  showcase: {
    search: string;
    all: string;
    showing: string;
    empty: string;
    openSite: string;
    featured: string;
  };
  niches: Record<Niche, string>;
  orbit: string[];
  projects: Record<string, { tagline: string; description: string }>;
};

const dictionaries: Record<Locale, Dictionary> = {
  ro: {
    nav: {
      work: "Lucrări",
      demos: "Demo-uri",
      skills: "Skill-uri",
      about: "Despre",
      contact: "Contact",
      github: "GitHub",
      menu: "Meniu",
    },
    hero: {
      portfolio: "PORTFOLIO",
      ctaWork: "Intră pe orbită",
      ctaDemos: "Landing-uri pe nișă",
      role: "Produs modern · AI · Experiențe web",
      bio: "O orbită curată de site-uri live — câte un exemplu puternic pe nișă, gândit să convertească și să rămână în memorie.",
    },
    work: {
      eyebrow: "Produse live",
      title: "Lucrări pe nișă",
      subtitle:
        "Site-uri de producție — OVB Next, dobrediana.ro, sebastianmorari.ro, eidan.ro, kreya.ro și altele. Click pe card pentru a deschide.",
    },
    demos: {
      eyebrow: "Landing-uri demo",
      title: "Un landing pe nișă",
      subtitle:
        "Opt nișe. Opt demo-uri live — beauty, frizerie, dental, clinică, auto, cafenea, spa și ospitalitate.",
    },
    skills: { eyebrow: "Capabilități", title: "Stack & craft" },
    about: {
      eyebrow: "Despre",
      title: "Construit sub HERMYO",
      body: "HERMYO PORTFOLIO adună produse live și landing-uri demo pe nișă — de la platforme CRM și SaaS la site-uri de brand, beauty, dental și auto.",
      studio: "Studio",
      based: "Baza",
      github: "GitHub",
    },
    contact: {
      eyebrow: "Contact",
      title: "Hai să construim următorul",
      body: "Disponibil pentru platforme CRM, site-uri de brand și sisteme de landing pe nișă.",
      cta: "Conectează-te pe GitHub",
    },
    showcase: {
      search: "Caută după nume, nișă, stack…",
      all: "Toate",
      showing: "Se afișează {n} din {total}",
      empty: "Niciun rezultat — încearcă altă nișă sau cuvânt cheie.",
      openSite: "Deschide site →",
      featured: "Featured",
    },
    niches: {
      CRM: "CRM",
      Platform: "Platformă",
      "Landing Page": "Landing Page",
      Brand: "Brand",
      SaaS: "SaaS",
      Beauty: "Beauty",
      Barber: "Frizerie",
      Dental: "Dental",
      Auto: "Auto",
      Cafe: "Cafenea",
      Spa: "Spa",
      Clinic: "Clinică",
      "Real Estate": "Imobiliare",
    },
    orbit: [
      "CRM",
      "Platformă",
      "Agenți AI",
      "Landing-uri moderne",
      "Automatizare",
      "Site-uri brand",
      "SaaS",
    ],
    projects: {
      ovbnext: {
        tagline: "Platformă de automatizare",
        description:
          "CRM OVB pentru automatizare — pipeline-uri, lead-uri și fluxuri de vânzări într-o platformă modernă.",
      },
      dobrediana: {
        tagline: "Brand personal",
        description:
          "Site modern de brand personal pentru Dobre Diana — layout curat și prezență puternică.",
      },
      sebastian: {
        tagline: "Site de brand personal",
        description:
          "Website elegant pentru Sebastian Morari — ierarhie modernă și storytelling clar.",
      },
      eidan: {
        tagline: "Brand premium",
        description:
          "Experiență de brand pentru Eidan — vizual puternic, ritm editorial și prezență contemporană.",
      },
      "carwash-pipera": {
        tagline: "Îngrijire auto de lux",
        description:
          "Landing 3D pentru un car wash din Pipera — scene cu spumă, foto HQ și CTA-uri de conversie.",
      },
      ricco: {
        tagline: "Cafea de specialitate · Pipera",
        description:
          "Site de brand pentru cafenea la Hyperion Towers — meniu, livrare, estetică verde & aur.",
      },
      zoca: {
        tagline: "Imobiliare premium",
        description:
          "Experiență cinematică de scroll pentru imobiliare — storytelling imersiv și prezentare de proprietăți.",
      },
      kreya: {
        tagline: "Site de brand modern",
        description:
          "Experiență contemporană de brand — vizual ascuțit și prezență de produs responsivă.",
      },
      hermyo: {
        tagline: "Site produs SaaS",
        description:
          "Landing Hermyo — marketing SaaS modern, value props clare și focus pe conversie.",
      },
      "demo-ays": {
        tagline: "Beauty & lounge",
        description: "Landing pentru beauty lounge hibrid, cu vizual modern și intenție de booking.",
      },
      "demo-elite-barber": {
        tagline: "By Adelin",
        description: "Landing de frizerie cu branding masculin și CTA-uri clare.",
      },
      "demo-menadent": {
        tagline: "Dental de lux",
        description: "Landing premium pentru clinică dentară, cu branding medical modern.",
      },
      "demo-kineto": {
        tagline: "Fizio & recuperare",
        description: "Landing de clinică pentru terapie kinetică și reabilitare.",
      },
      "demo-fortador": {
        tagline: "PPF · detailing",
        description: "Showcase de detailing auto / PPF cu estetică auto premium.",
      },
      "demo-isabelle": {
        tagline: "Pitești",
        description: "Landing de cofetărie cu branding culinar cald.",
      },
      "demo-everest": {
        tagline: "Spa & wellness",
        description: "Landing de spa axat pe atmosferă calmă și pachete.",
      },
      "demo-hotel": {
        tagline: "Ospitalitate",
        description: "Landing de hotel cu structură orientată spre rezervări.",
      },
    },
  },
  en: {
    nav: {
      work: "Work",
      demos: "Demos",
      skills: "Skills",
      about: "About",
      contact: "Contact",
      github: "GitHub",
      menu: "Menu",
    },
    hero: {
      portfolio: "PORTFOLIO",
      ctaWork: "Enter the orbit",
      ctaDemos: "Niche landings",
      role: "Modern product · AI · Web experiences",
      bio: "A curated orbit of live websites — one standout per niche, each built to convert and feel unforgettable.",
    },
    work: {
      eyebrow: "Live products",
      title: "Work by niche",
      subtitle:
        "Live production sites — OVB Next, dobrediana.ro, sebastianmorari.ro, eidan.ro, kreya.ro, and more. Click any card to open.",
    },
    demos: {
      eyebrow: "Demo landings",
      title: "One landing per niche",
      subtitle:
        "Eight niches. Eight live demos — beauty, barber, dental, clinic, auto, café, spa, and hospitality.",
    },
    skills: { eyebrow: "Capabilities", title: "Stack & craft" },
    about: {
      eyebrow: "About",
      title: "Built under HERMYO",
      body: "HERMYO PORTFOLIO collects live products and niche demo landings — from CRM platforms and SaaS sites to beauty, dental, and auto business pages.",
      studio: "Studio",
      based: "Based",
      github: "GitHub",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build the next one",
      body: "Open for CRM platforms, brand sites, and niche landing systems.",
      cta: "Connect on GitHub",
    },
    showcase: {
      search: "Search by name, niche, stack…",
      all: "All",
      showing: "Showing {n} of {total}",
      empty: "No matches — try another niche or keyword.",
      openSite: "Open site →",
      featured: "Featured",
    },
    niches: {
      CRM: "CRM",
      Platform: "Platform",
      "Landing Page": "Landing Page",
      Brand: "Brand",
      SaaS: "SaaS",
      Beauty: "Beauty",
      Barber: "Barber",
      Dental: "Dental",
      Auto: "Auto",
      Cafe: "Cafe",
      Spa: "Spa",
      Clinic: "Clinic",
      "Real Estate": "Real Estate",
    },
    orbit: [
      "CRM",
      "Platform",
      "AI Agents",
      "Modern Landing Pages",
      "Automation",
      "Brand Sites",
      "SaaS",
    ],
    projects: {
      ovbnext: {
        tagline: "Automation platform",
        description:
          "OVB automation CRM — pipelines, leads, and sales workflows in one modern platform.",
      },
      dobrediana: {
        tagline: "Personal brand",
        description:
          "Modern personal brand website for Dobre Diana — clean layout and strong presence.",
      },
      sebastian: {
        tagline: "Personal brand site",
        description:
          "Polished website for Sebastian Morari — modern hierarchy and clear storytelling.",
      },
      eidan: {
        tagline: "Premium brand",
        description:
          "Brand experience for Eidan — strong visuals, editorial rhythm, and a contemporary presence.",
      },
      "carwash-pipera": {
        tagline: "Luxury auto care",
        description:
          "3D landing for a Pipera car wash — foam scenes, HQ photography, and conversion CTAs.",
      },
      ricco: {
        tagline: "Specialty coffee · Pipera",
        description:
          "Brand-first café site at Hyperion Towers — menu, delivery links, green & gold aesthetic.",
      },
      zoca: {
        tagline: "Premium real estate",
        description:
          "Cinematic scroll experience for real estate — immersive storytelling and property presentation.",
      },
      kreya: {
        tagline: "Modern brand site",
        description:
          "Contemporary brand experience — sharp visuals and a responsive product presence.",
      },
      hermyo: {
        tagline: "SaaS product site",
        description:
          "Hermyo product landing — modern SaaS marketing, clear value props, and conversion focus.",
      },
      "demo-ays": {
        tagline: "Beauty & lounge",
        description: "Hybrid beauty lounge landing with modern visuals and booking intent.",
      },
      "demo-elite-barber": {
        tagline: "By Adelin",
        description: "Barbershop landing with sharp masculine branding and clear CTAs.",
      },
      "demo-menadent": {
        tagline: "Luxury dental",
        description: "Premium dental clinic landing with modern medical branding.",
      },
      "demo-kineto": {
        tagline: "Physio & recovery",
        description: "Clinic landing for kinetic therapy and rehabilitation.",
      },
      "demo-fortador": {
        tagline: "PPF · detailing",
        description: "Auto detailing / PPF showcase landing with premium auto aesthetics.",
      },
      "demo-isabelle": {
        tagline: "Pitești",
        description: "Pastry shop landing with warm culinary branding.",
      },
      "demo-everest": {
        tagline: "Spa & wellness",
        description: "Spa landing focused on calm atmosphere and packages.",
      },
      "demo-hotel": {
        tagline: "Hospitality",
        description: "Hotel landing page with booking-oriented structure.",
      },
    },
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "hermyo-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ro");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "ro" || stored === "en") setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
