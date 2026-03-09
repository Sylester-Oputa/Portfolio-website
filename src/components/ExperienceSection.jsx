import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "Proxynet Communications",
    role: "Frontend Developer Intern",
    location: "Ikeja, Nigeria",
    period: "Sept 2023 – Mar 2024",
    bullets: [
      "Reusable React components, Bootstrap CSS layouts",
      "UI/UX collaboration and visual consistency",
    ],
  },
  {
    company: "Upwey Real Estate",
    role: "Junior Web Developer",
    location: "Remote",
    period: "Dec 2024 – Feb 2025",
    bullets: [
      "React listing platform, Redux Toolkit, REST API integration",
      "Agile sprints, mobile/desktop responsiveness",
    ],
  },
  {
    company: "Sabol Technology",
    role: "Full Stack Developer (Contract)",
    location: "Remote",
    period: "Jul 2025 – Oct 2025",
    bullets: [
      "RBAC system (Admin, Property Owner, Customer)",
      "Real-time availability APIs + payment verification",
      "Audit trail + Swagger/OpenAPI documentation",
    ],
  },
  {
    company: "MAR ABU Projects Services",
    role: "Full Stack Developer (Contract)",
    location: "Remote",
    period: "Oct 2025 – Jan 2026",
    bullets: [
      "JIRA-like project management system with Agile/Waterfall/Kanban support",
      "Booking platform with NextAuth.js, Prisma, and PostgreSQL",
      "Role-based dashboards, sprint management, and audit logging",
    ],
  },
  {
    company: "Novnuga",
    role: "Backend Developer (Contract)",
    location: "Remote",
    period: "Nov 2025 – Jan 2026",
    bullets: [
      "Production-ready e-commerce API with 113+ endpoints",
      "2FA, login tracking, device management, and GDPR compliance",
      "Paystack payments, Cloudinary uploads, analytics dashboard",
    ],
  },
  {
    company: "OA Softwares",
    role: "Backend Developer (Contract)",
    location: "Remote",
    period: "Dec 2025 – Feb 2026",
    bullets: [
      "Milestone-based project delivery API with TypeScript and Prisma",
      "CI/CD pipeline with GitHub Actions, Winston logging, Jest testing",
    ],
  },
  {
    company: "JoinTearn",
    role: "Backend Developer (Contract)",
    location: "Remote",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Admin dashboard API for gamified content platform",
      "Role-based access (Admin, Moderator, Creator, User), Swagger docs",
      "Content moderation workflows, reward points system, Redis caching",
    ],
  },
  // ADD NEW EXPERIENCE HERE
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
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

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef(null);

  // Animate timeline line on scroll
  useEffect(() => {
    if (!isInView) return;
    const onScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewportH - rect.top) / (rect.height + viewportH * 0.3))
      );
      setLineHeight(progress * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isInView]);

  return (
    <section id="experience" className="py-[120px] relative">
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
            04 / EXPERIENCE
          </span>
          <h2
            className="font-heading font-bold"
            style={{ color: "var(--c-text)", fontSize: "2.2rem" }}
          >
            Work Experience
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-8 md:pl-12">
          {/* Timeline line (background) */}
          <div
            className="absolute left-3 md:left-5 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--c-border)" }}
          />
          {/* Timeline line (fill on scroll) */}
          <div
            className="absolute left-3 md:left-5 top-0 w-px transition-all duration-300"
            style={{
              backgroundColor: "var(--c-accent)",
              height: `${lineHeight}%`,
            }}
          />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.period}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-5 md:-left-7 top-6 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: "var(--c-accent)",
                    backgroundColor: "var(--c-surface)",
                  }}
                />

                {/* Card */}
                <div
                  className="p-6 md:p-8 transition-all duration-200"
                  style={{
                    backgroundColor: "var(--c-surface)",
                    border: "1.5px solid var(--c-border)",
                    borderRadius: 16,
                    boxShadow:
                      `0 4px 24px rgba(var(--c-accent-rgb),0.06), inset 0 1px 0 var(--c-inset)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--c-accent)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--c-border)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-1">
                    <div>
                      <h3
                        className="font-heading font-bold"
                        style={{ color: "var(--c-text)", fontSize: "1.15rem" }}
                      >
                        {exp.company}
                      </h3>
                      <p
                        className="font-mono"
                        style={{ color: "var(--c-accent)", fontSize: "0.85rem" }}
                      >
                        {exp.role}
                      </p>
                    </div>
                    <div
                      className="font-mono text-right"
                      style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}
                    >
                      <div>{exp.location}</div>
                      <div>{exp.period}</div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mt-3">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="font-body flex items-start gap-2"
                        style={{ color: "var(--c-text)", fontSize: "0.95rem" }}
                      >
                        <span style={{ color: "var(--c-accent)" }}>→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Placeholder card */}
            <motion.div
              custom={experiences.length}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <div
                className="absolute -left-5 md:-left-7 top-6 w-3 h-3 rounded-full"
                style={{ backgroundColor: "var(--c-secondary)" }}
              />
              <div
                className="p-6 md:p-8 animate-pulse-border"
                style={{
                  backgroundColor: "transparent",
                  border: "1.5px dashed var(--c-secondary)",
                  borderRadius: 16,
                }}
              >
                <p
                  className="font-mono italic"
                  style={{ color: "var(--c-secondary)", fontSize: "0.9rem" }}
                >
                  More experience loading... please hire me to speed up the process.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
