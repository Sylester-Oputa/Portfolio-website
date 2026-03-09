import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "4+", label: "Years Active" },
  { value: "10+", label: "Projects Built" },
  { value: "3", label: "Specializations" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" className="py-[120px] relative">
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-[1280px] px-6"
      >
        {/* Divider */}
        <motion.div
          variants={childVariants}
          className="w-full border-t border-dashed mb-16"
          style={{ borderColor: "var(--c-border)" }}
        />

        {/* Section number */}
        <motion.p
          variants={childVariants}
          className="font-mono text-sm tracking-widest mb-12"
          style={{ color: "var(--c-muted)" }}
        >
          02 <span className="ml-1">/ ABOUT</span>
        </motion.p>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left — Pull quote */}
          <motion.blockquote
            variants={childVariants}
            className="italic leading-snug"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              color: "var(--c-accent)",
            }}
          >
            "I build systems that scale and interfaces that feel human."
          </motion.blockquote>

          {/* Right — Bio + Stats */}
          <div>
            <motion.p
              variants={childVariants}
              className="leading-relaxed mb-10"
              style={{
                fontFamily: "'Source Serif 4', serif",
                color: "var(--c-text)",
              }}
            >
              Full Stack Developer based in Lagos, Nigeria. Specialized in
              multi-tenant SaaS platforms, workflow engines, booking systems,
              and production-grade REST APIs — paired with clean, accessible
              frontends in React and Next.js. I care as much about the
              architecture as I do about the experience.
            </motion.p>

            {/* Stat cards */}
            <motion.div
              variants={childVariants}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={childVariants}
                  className="flex flex-col items-center justify-center text-center rounded-[16px] border border-dashed px-3 py-6"
                  style={{
                    borderColor: "var(--c-border)",
                    backgroundColor: "var(--c-surface)",
                    boxShadow:
                      `0 4px 24px rgba(var(--c-accent-rgb),0.06), inset 0 1px 0 var(--c-inset)`,
                  }}
                >
                  <span
                    className="font-display leading-none"
                    style={{
                      fontSize: "2.5rem",
                      color: "var(--c-accent)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-mono mt-2"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--c-muted)",
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
