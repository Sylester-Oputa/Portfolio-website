import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import {
  featuredProjects,
  standardProjects,
  CATEGORIES,
} from "../data/projects";

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
      delay: Math.min(i, 8) * 0.06,
    },
  }),
};

const linkStyle = {
  color: "var(--c-muted-strong)",
  fontSize: "0.8rem",
};

const ProjectCard = ({ project, index, isInView, featured = false }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    className="group transition-all duration-200 flex flex-col"
    style={{
      backgroundColor: "var(--c-surface)",
      border: "1.5px dashed var(--c-border)",
      borderRadius: 16,
      boxShadow: `0 4px 24px rgba(var(--c-accent-rgb),0.06), inset 0 1px 0 var(--c-inset)`,
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
    <div className="p-6 md:p-8 flex flex-col h-full">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {featured && (
          <span
            className="font-mono uppercase inline-block"
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
        {project.status && (
          <span
            className="font-mono uppercase inline-block"
            style={{
              color: "var(--c-muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              border: "1px solid var(--c-border)",
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            {project.status}
          </span>
        )}
      </div>

      <h3
        className="font-heading font-bold mb-1"
        style={{
          color: "var(--c-text)",
          fontSize: featured ? "1.35rem" : "1.1rem",
        }}
      >
        {project.title}
        {project.subtitle && (
          <span
            className="block font-body font-normal mt-1"
            style={{ color: "var(--c-muted)", fontSize: "0.9rem" }}
          >
            {project.subtitle}
          </span>
        )}
      </h3>

      {project.role && (
        <p
          className="font-mono mb-3"
          style={{ color: "var(--c-accent)", fontSize: "0.75rem" }}
        >
          {project.role}
        </p>
      )}

      <p
        className="font-body mb-4"
        style={{ color: "var(--c-muted-strong)", fontSize: "0.95rem" }}
      >
        {project.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
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

      {/* Links — pinned to the bottom so cards align */}
      <div className="flex flex-wrap items-center gap-4 mt-auto">
        {project.caseStudy && (
          <Link
            to={`/work/${project.slug}`}
            className="font-mono flex items-center gap-1.5 transition-colors duration-150"
            style={{ color: "var(--c-accent)", fontSize: "0.8rem", fontWeight: 600 }}
          >
            Read case study <ArrowRight size={13} />
          </Link>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono flex items-center gap-1 transition-colors duration-150"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted-strong)")}
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
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted-strong)")}
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
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [filter, setFilter] = useState("All");

  const visibleStandard = useMemo(
    () =>
      filter === "All"
        ? standardProjects
        : standardProjects.filter((p) => p.categories?.includes(filter)),
    [filter]
  );

  const visibleFeatured = useMemo(
    () =>
      filter === "All"
        ? featuredProjects
        : featuredProjects.filter((p) => p.categories?.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="py-[120px] relative">
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
        <div className="mb-10">
          <span
            className="font-mono block mb-3"
            style={{ color: "var(--c-muted)", fontSize: "0.85rem" }}
          >
            02 / WORK
          </span>
          <h2
            className="font-heading font-bold mb-3"
            style={{ color: "var(--c-text)", fontSize: "2.2rem" }}
          >
            Selected Projects
          </h2>
          <p
            className="font-body max-w-[62ch]"
            style={{ color: "var(--c-muted-strong)", fontSize: "0.95rem" }}
          >
            Products I founded, platforms I architected, and systems I shipped
            for clients. Status labels are honest — not everything here is a
            finished product.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className="font-mono px-4 py-2 transition-all duration-150"
                style={{
                  fontSize: "0.75rem",
                  borderRadius: 999,
                  border: `1.5px solid ${active ? "var(--c-accent)" : "var(--c-border)"}`,
                  backgroundColor: active
                    ? `rgba(var(--c-accent-rgb),0.1)`
                    : "transparent",
                  color: active ? "var(--c-accent)" : "var(--c-muted-strong)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured */}
        {visibleFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {visibleFeatured.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                isInView={isInView}
                featured
              />
            ))}
          </div>
        )}

        {/* Standard */}
        {visibleStandard.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleStandard.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i + visibleFeatured.length}
                isInView={isInView}
              />
            ))}
          </div>
        )}

        {visibleFeatured.length + visibleStandard.length === 0 && (
          <p
            className="font-mono py-12 text-center"
            style={{ color: "var(--c-muted-strong)", fontSize: "0.9rem" }}
          >
            Nothing in this category yet.
          </p>
        )}

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
                Still empty. Still waiting. Still your chance.
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
