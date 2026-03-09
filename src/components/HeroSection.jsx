import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "API Architect",
  "SaaS Builder",
];

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayedText, isDeleting, roleIndex]);

  const nameWords = ["SYLVESTER", "OBIWURU", "OPUTA"];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 2.2 } },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Diagonal graph paper background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, var(--c-border) 1px, transparent 1px),
            linear-gradient(-45deg, var(--c-border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.03,
        }}
      />

      <div className="container relative z-10 pt-24 pb-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="font-display"
            style={{ color: "var(--c-muted)", fontSize: 15 }}
          >
            SOO
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="font-mono uppercase"
            style={{
              color: "var(--c-accent)",
              fontSize: 11,
              letterSpacing: "0.12em",
            }}
          >
            ● AVAILABLE — REMOTE & CONTRACT
          </motion.span>
        </div>

        {/* Name */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          {nameWords.map((word) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                variants={wordVariants}
                className="font-display font-bold leading-[0.95]"
                style={{
                  color: "var(--c-text)",
                  fontSize: "clamp(3rem, 10vw, 10rem)",
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.4 }}
          className="font-mono mb-4"
          style={{ color: "var(--c-secondary)", fontSize: "1rem" }}
        >
          {displayedText}
          <span className="animate-pulse">·</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.4 }}
          className="font-body italic mb-10 max-w-lg"
          style={{ color: "var(--c-muted)", fontSize: "1.15rem" }}
        >
          Scalable systems. Clean APIs. Interfaces that ship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.4 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:translate-y-[-2px]"
            style={{
              backgroundColor: "var(--c-accent)",
              color: "var(--c-bg)",
              borderRadius: 8,
              letterSpacing: "0.08em",
            }}
          >
            View My Work
          </a>
          <a
            href="/CVs/Sylvester Obiwuru Oputa Fullstack CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:translate-y-[-2px]"
            style={{
              backgroundColor: "transparent",
              color: "var(--c-accent)",
              border: "1.5px solid var(--c-accent)",
              borderRadius: 8,
              letterSpacing: "0.08em",
            }}
          >
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.4 }}
          className="flex gap-8 font-mono text-sm"
          style={{ color: "var(--c-muted)" }}
        >
          <a
            href="https://github.com/Sylester-Oputa"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sylvester-oputa"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            LinkedIn
          </a>
          <a
            href="mailto:sylvesteroputa366@gmail.com"
            className="transition-colors duration-150"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
          >
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};
