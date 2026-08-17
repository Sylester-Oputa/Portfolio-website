import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useMagnetic } from "../hooks/useMagnetic";
import { GrainField } from "./GrainField";

const roles = [
  "Full-Stack Engineer",
  "Product Builder",
  "Backend Architect",
  "SaaS Founder",
];

const proofPoints = [
  { value: "5+", label: "Years building" },
  { value: "17", label: "Projects shipped" },
  { value: "3", label: "Products founded" },
];

/* Typewriter — purely decorative, never gates content */
const useTypewriter = (words, enabled) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const current = words[index];

    if (!deleting) {
      if (text.length < current.length) {
        timeout.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          70
        );
      } else {
        timeout.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else if (text.length > 0) {
      timeout.current = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setIndex((p) => (p + 1) % words.length);
    }

    return () => clearTimeout(timeout.current);
  }, [text, deleting, index, words, enabled]);

  return enabled ? text : words[0];
};

export const HeroSection = () => {
  const reduced = usePrefersReducedMotion();
  const typed = useTypewriter(roles, !reduced);
  const sectionRef = useRef(null);
  const hireRef = useMagnetic({ strength: 0.22 });
  const buildRef = useMagnetic({ strength: 0.22 });

  /* Cinematic layer: the hero dissolves and drifts as you scroll past it,
     handing off to the work section rather than just scrolling away. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  /* Motion is opt-in decoration layered on already-visible content.
     Nothing here delays paint or interactivity. */
  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
      };

  const goToContact = (intent) => (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("set-contact-intent", { detail: intent })
    );
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
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

      {/* GPU grain — self-gates on pointer, width, data-saver and motion pref */}
      <GrainField />

      <motion.div
        className="container relative z-10 pt-28 pb-20"
        style={
          reduced
            ? undefined
            : {
                opacity: contentOpacity,
                y: contentY,
                scale: contentScale,
              }
        }
      >
        {/* Availability */}
        <motion.div
          {...rise}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span
            className="font-mono uppercase inline-flex items-center gap-2"
            style={{
              color: "var(--c-accent)",
              fontSize: 11,
              letterSpacing: "0.14em",
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: 7,
                height: 7,
                backgroundColor: "var(--c-accent)",
                boxShadow: "0 0 0 3px rgba(var(--c-accent-rgb),0.2)",
              }}
            />
            Available — Remote &amp; Contract
          </span>
        </motion.div>

        {/* Value proposition leads */}
        <motion.h1
          {...rise}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.05 }}
          className="font-display font-bold mb-6 max-w-[18ch]"
          style={{
            color: "var(--c-text)",
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          I turn business problems into systems that ship.
        </motion.h1>

        <motion.p
          {...rise}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.1 }}
          className="mb-2 max-w-[58ch]"
          style={{
            color: "var(--c-muted-strong)",
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            lineHeight: 1.6,
          }}
        >
          Sylvester Obiwuru Oputa — Full-Stack Engineer &amp; Product Builder in
          Lagos. Multi-tenant SaaS, payment and escrow flows, workflow engines
          and production APIs, from problem definition through to launch.
        </motion.p>

        {/* Typewriter role — decorative */}
        <motion.div
          {...rise}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.15 }}
          className="font-mono mb-10"
          style={{ color: "var(--c-secondary)", fontSize: "0.9rem" }}
          aria-hidden="true"
        >
          {typed}
          {!reduced && <span className="animate-pulse">▌</span>}
        </motion.div>

        {/* Dual CTA — present and clickable at first paint */}
        <div className="flex flex-wrap gap-4 mb-14">
          <a
            ref={hireRef}
            href="#contact"
            onClick={goToContact("hire")}
            className="inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase will-change-transform"
            style={{
              backgroundColor: "var(--c-accent)",
              color: "var(--c-bg)",
              borderRadius: 8,
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Hire me
          </a>
          <a
            ref={buildRef}
            href="#contact"
            onClick={goToContact("build")}
            className="inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase will-change-transform"
            style={{
              backgroundColor: "transparent",
              color: "var(--c-accent)",
              border: "1.5px solid var(--c-accent)",
              borderRadius: 8,
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Build with me
          </a>
          <a
            href="/CVs/Sylvester Obiwuru Oputa Fullstack CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase transition-colors duration-200"
            style={{
              color: "var(--c-muted-strong)",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--c-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--c-muted-strong)")
            }
          >
            Download CV ↓
          </a>
        </div>

        {/* Proof numbers */}
        <motion.div
          {...rise}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.25 }}
          className="flex flex-wrap items-baseline gap-x-10 gap-y-4 pt-8"
          style={{ borderTop: "1px dashed var(--c-border)" }}
        >
          {proofPoints.map((p) => (
            <div key={p.label} className="flex items-baseline gap-2">
              <span
                className="font-display font-bold"
                style={{ color: "var(--c-accent)", fontSize: "1.9rem" }}
              >
                {p.value}
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  color: "var(--c-muted-strong)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                }}
              >
                {p.label}
              </span>
            </div>
          ))}

          <div className="flex gap-6 font-mono text-sm ml-auto">
            {[
              { label: "GitHub", href: "https://github.com/Sylester-Oputa" },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/sylvester-oputa",
              },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150"
                style={{ color: "var(--c-muted-strong)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--c-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--c-muted-strong)")
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
