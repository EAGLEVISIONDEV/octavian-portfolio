"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Projects,
  DemoLandings,
  Skills,
  About,
  Contact,
  Footer,
} from "@/components/Sections";
import { LocaleProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LocaleProvider>
      <Header />
      <main>
        <Hero />
        <Projects />
        <DemoLandings />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
