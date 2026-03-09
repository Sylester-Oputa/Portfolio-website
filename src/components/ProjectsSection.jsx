import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    title: "MAR ABU — Project Management System",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Express"],
    description:
      "State-machine workflow engine, RBAC, sprint planning, audit logging.",
    github: "https://github.com/MAR-ABU-PROJECTS/TaskManagement-Workflow",
  },
  {
    title: "Multi-Tenant Realtor Booking SaaS",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    description:
      "Isolated multi-tenant architecture, booking flows, admin approvals.",
    github: null,
  },
  // ADD NEW FEATURED PROJECT HERE
];

const standardProjects = [
  {
    title: "Vortex Island",
    description: "Interactive web experience built with modern frontend tools.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: null,
    github: null,
  },
  {
    title: "Finance Tracker",
    description:
      "Full-stack app for tracking income and expenses with visual charts.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://finance-tracker-blue-nine.vercel.app",
    github: "https://github.com/Sylester-Oputa/finance-tracker.git",
  },
  {
    title: "MAR ABU Booking",
    description:
      "Modern booking platform with TypeScript and PostgreSQL backend.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    demoUrl: "https://booking.marabuprojects.com/",
    github: "https://github.com/MAR-ABU-PROJECTS/Booking-System.git",
  },
  {
    title: "Hotfy",
    description: "Mobile-first web app with live data rendering and smooth UI.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "REST API"],
    demoUrl: null,
    github: null,
  },
  {
    title: "BTube",
    description:
      "YouTube clone with video search, previews, and playback.",
    tags: ["React", "TypeScript", "YouTube API"],
    demoUrl: "https://b-tube.vercel.app/",
    github: "https://github.com/Sylester-Oputa/BTube.git",
  },
  {
    title: "Upwey Real Estate",
    description:
      "Real estate platform with real-time property updates.",
    tags: ["React", "Redux Toolkit", "Tailwind CSS"],
    demoUrl: "https://upwey.com.ng/",
    github: "https://github.com/JimOluwaseyi/upwey-frontend.git",
  },
  // ADD NEW PROJECT HERE
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

const ProjectCard = ({ project, index, isInView, featured = false }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    className={`group transition-all duration-200 ${featured ? "md:col-span-2" : ""}`}
    style={{
      backgroundColor: "var(--c-surface)",
      border: "1.5px dashed var(--c-border)",
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
    <div className="p-6 md:p-8">
      {featured && (
        <span
          className="font-mono uppercase inline-block mb-3"
          style={{
            color: "var(--c-accent)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            backgroundColor: `rgba(var(--c-accent-rgb),0.08)`,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          Featured
        </span>
      )}

      <h3
        className="font-heading font-bold mb-3"
        style={{
          color: "var(--c-text)",
          fontSize: featured ? "1.35rem" : "1.1rem",
        }}
      >
        {project.title}
      </h3>

      <p
        className="font-body mb-4"
        style={{ color: "var(--c-muted)", fontSize: "0.95rem" }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono px-3 py-1"
            style={{
              backgroundColor: "var(--c-tag-bg-inner)",
              color: "var(--c-text)",
              border: "1px solid var(--c-border)",
              borderRadius: 999,
              fontSize: "0.7rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono flex items-center gap-1 transition-colors duration-150"
            style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--c-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--c-muted)")
            }
          >
            GitHub <ExternalLink size={12} />
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono flex items-center gap-1 transition-colors duration-150"
            style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--c-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--c-muted)")
            }
          >
            Live Demo <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="projects" className="py-[120px] relative">
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
            05 / WORK
          </span>
          <h2
            className="font-heading font-bold"
            style={{ color: "var(--c-text)", fontSize: "2.2rem" }}
          >
            Selected Projects
          </h2>
        </div>

        {/* Featured projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
              featured
            />
          ))}
        </div>

        {/* Standard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {standardProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i + featuredProjects.length}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Coming soon placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div
              key={`coming-${i}`}
              className="p-6 md:p-8 flex items-center justify-center animate-pulse-border"
              style={{
                border: "1.5px dashed var(--c-secondary)",
                borderRadius: 16,
                minHeight: 120,
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  color: "var(--c-secondary)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                }}
              >
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
