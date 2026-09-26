import { StarsCanvas } from "./components/StarsCanvas";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Experience } from "./sections/Experience";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Navbar } from "./sections/Navbar";
import { Projects } from "./sections/Projects";
import { TechStack } from "./sections/TechStack";

function App() {
  return (
    <>
      {/* Universe background behind the whole site */}
      <StarsCanvas />

      <main className="relative mx-auto max-w-7xl">
        <Navbar />

        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />

        <Footer />
      </main>
    </>
  );
}

export default App;
