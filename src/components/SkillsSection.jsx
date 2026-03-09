import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    label: "FRONTEND",
    skills: [
      "React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript",
      "Tailwind CSS", "Framer Motion", "Redux Toolkit", "HTML5", "CSS3",
    ],
  },
  {
    label: "BACKEND",
    skills: [
      "Node.js", "Express.js", "TypeScript", "REST APIs",
      "JWT", "RBAC", "Webhooks", "Payment Flows", "Escrow Logic",
    ],
  },
  {
    label: "DATABASE",
    skills: ["PostgreSQL", "Prisma ORM", "MongoDB"],
  },
  {
    label: "DEVOPS",
    skills: [
      "Git", "GitHub", "CI/CD", "Vercel", "Render", "Docker",
      "Swagger/OpenAPI", "Postman", "Jest", "Supertest",
    ],
  },
  {
    label: "PRACTICES",
    skills: [
      "Multi-tenant SaaS", "State-machine Workflows",
      "Audit Logging", "RBAC Systems", "Agile/Scrum",
    ],
  },
  // ADD NEW SKILL CATEGORY HERE
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
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

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="py-[120px] relative">
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
            03 / SKILLS
          </span>
          <h2
            className="font-heading font-bold mb-3"
            style={{ color: "var(--c-text)", fontSize: "2.2rem" }}
          >
            Technical Skills
          </h2>
          <p
            className="font-mono"
            style={{ color: "var(--c-muted)", fontSize: "0.85rem" }}
          >
            Tools I reach for. Problems I solve.
          </p>
        </div>

        {/* Skill categories */}
        <div className="space-y-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              custom={catIndex}
              variants={childVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              {/* Category label */}
              <div
                className="font-mono uppercase shrink-0 pt-2"
                style={{
                  color: "var(--c-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  minWidth: 120,
                }}
              >
                {category.label} /
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono px-4 py-2 transition-all duration-200 select-none"
                    style={{
                      backgroundColor: "var(--c-tag-bg)",
                      color: "var(--c-text)",
                      border: "1px solid var(--c-border)",
                      borderRadius: 999,
                      fontSize: "0.8rem",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--c-accent)";
                      e.target.style.color = "var(--c-bg)";
                      e.target.style.borderColor = "var(--c-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "var(--c-tag-bg)";
                      e.target.style.color = "var(--c-text)";
                      e.target.style.borderColor = "var(--c-border)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
