import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  {
    period: "2021 – 2023",
    title: "National Diploma, Computer Science",
    institution: "Ogun State Polytechnic, Ijebu-Ode",
  },
  {
    period: "Jun – Sept 2022",
    title: "Certificate — Backend Development (Python/Django)",
    institution: "Tech 365, Ikeja",
  },
  {
    period: "Jun 2025",
    title: "Certificate — Frontend Development (TypeScript/Next.js)",
    institution: "Nerdy Eye, Remote",
  },
  // ADD NEW EDUCATION HERE
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="education" className="py-[120px] relative">
      {/* Section divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ borderTop: "1px dashed var(--c-border)" }}
      />

      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container"
      >
        {/* Section header */}
        <div className="mb-16">
          <span
            className="font-mono block mb-3"
            style={{ color: "var(--c-muted)", fontSize: "0.85rem" }}
          >
            06 / EDUCATION
          </span>
          <h2
            className="font-heading font-bold"
            style={{ color: "var(--c-text)", fontSize: "2.2rem" }}
          >
            Education & Certifications
          </h2>
        </div>

        {/* Education card */}
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: "var(--c-surface)",
            border: "1.5px solid var(--c-border)",
            borderRadius: 16,
            boxShadow:
              `0 4px 24px rgba(var(--c-accent-rgb),0.06), inset 0 1px 0 var(--c-inset)`,
          }}
        >
          <div className="divide-y" style={{ borderColor: "var(--c-border)" }}>
            {education.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 p-6 md:p-8"
                style={{ borderColor: "var(--c-border)" }}
              >
                <div
                  className="font-mono shrink-0"
                  style={{
                    color: "var(--c-muted)",
                    fontSize: "0.85rem",
                    minWidth: 160,
                  }}
                >
                  {item.period}
                </div>
                <div>
                  <h3
                    className="font-heading font-bold"
                    style={{ color: "var(--c-text)", fontSize: "1.05rem" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{ color: "var(--c-muted)", fontSize: "0.9rem" }}
                  >
                    {item.institution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
