import { useState } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "../components/LoadingScreen";
import { CustomCursor } from "../components/CustomCursor";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { EducationSection } from "../components/EducationSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Main portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: "var(--c-bg)", transition: "background-color 0.4s ease" }}
      >
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};
