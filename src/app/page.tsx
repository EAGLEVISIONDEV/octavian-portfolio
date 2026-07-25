import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects, Skills, About, Contact, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
