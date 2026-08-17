import { CustomCursor } from "../components/CustomCursor";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ProofStrip } from "../components/ProofStrip";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { EducationSection } from "../components/EducationSection";
import { ContactSection } from "../components/ContactSection";
import { StickyCTA } from "../components/StickyCTA";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Main portfolio — renders immediately, no loading gate */}
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ backgroundColor: "var(--c-bg)", transition: "background-color 0.4s ease" }}
      >
        <Navbar />

        <main>
          <HeroSection />
          <ProofStrip />
          <ProjectsSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </main>

        <Footer />
        <StickyCTA />
      </div>
    </>
  );
};
