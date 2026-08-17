import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject } from "../data/projects";
import { CustomCursor } from "../components/CustomCursor";
import { Footer } from "../components/Footer";

const Section = ({ label, title, children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    className="mb-14"
  >
    {label && (
      <span
        className="font-mono block mb-3"
        style={{
          color: "var(--c-muted)",
          fontSize: "0.72rem",
          letterSpacing: "0.14em",
        }}
      >
        {label}
      </span>
    )}
    {title && (
      <h2
        className="font-heading font-bold mb-4"
        style={{ color: "var(--c-text)", fontSize: "1.5rem" }}
      >
        {title}
      </h2>
    )}
    {children}
  </motion.section>
);

const Prose = ({ children }) => (
  <p
    className="font-prose"
    style={{
      color: "var(--c-muted-strong)",
      fontSize: "var(--step-0)",
      lineHeight: 1.85,
      maxWidth: "66ch",
    }}
  >
    {children}
  </p>
);

export const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project?.caseStudy) return;

    const prevTitle = document.title;
    document.title = `${project.title} — Case Study | Sylvester Obiwuru Oputa`;

    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    meta?.setAttribute("content", project.summary);

    return () => {
      document.title = prevTitle;
      if (prevDesc) meta?.setAttribute("content", prevDesc);
    };
  }, [project]);

  if (!project || !project.caseStudy) {
    return <Navigate to="/" replace />;
  }

  const cs = project.caseStudy;

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--c-bg)" }}
      >
        <div className="container pt-16 pb-24">
          {/* Back */}
          <Link
            to="/#projects"
            className="font-mono inline-flex items-center gap-2 mb-12 transition-colors duration-150"
            style={{ color: "var(--c-muted-strong)", fontSize: "0.8rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted-strong)")}
          >
            <ArrowLeft size={14} /> All work
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-16"
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="font-mono uppercase"
                style={{
                  color: "var(--c-accent)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  backgroundColor: `rgba(var(--c-accent-rgb),0.08)`,
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {project.role}
              </span>
              <span
                className="font-mono uppercase"
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
            </div>

            <h1
              className="font-display font-bold mb-3"
              style={{
                color: "var(--c-text)",
                fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h1>
            {project.subtitle && (
              <p
                className="font-body italic mb-8"
                style={{ color: "var(--c-secondary)", fontSize: "1.2rem" }}
              >
                {project.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono flex items-center gap-1.5"
                  style={{ color: "var(--c-accent)", fontSize: "0.85rem" }}
                >
                  Live site <ExternalLink size={13} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono flex items-center gap-1.5"
                  style={{ color: "var(--c-accent)", fontSize: "0.85rem" }}
                >
                  Source <ExternalLink size={13} />
                </a>
              )}
            </div>
          </motion.header>

          {/* Problem */}
          <Section label="01 / THE PROBLEM" title="What needed solving" delay={0.05}>
            <Prose>{cs.problem}</Prose>
          </Section>

          {/* Approach */}
          <Section label="02 / APPROACH" title="How I framed it" delay={0.1}>
            <Prose>{cs.approach}</Prose>
          </Section>

          {/* Architecture */}
          <Section label="03 / ARCHITECTURE" title="How it's built" delay={0.15}>
            <ul className="space-y-3" style={{ maxWidth: "68ch" }}>
              {cs.architecture.map((item, i) => (
                <li
                  key={i}
                  className="font-body flex items-start gap-3"
                  style={{
                    color: "var(--c-muted-strong)",
                    fontSize: "1rem",
                    lineHeight: 1.65,
                  }}
                >
                  <span style={{ color: "var(--c-accent)", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Decisions */}
          <Section
            label="04 / DECISIONS"
            title="Tradeoffs worth explaining"
            delay={0.2}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cs.decisions.map((d) => (
                <div
                  key={d.title}
                  className="p-6"
                  style={{
                    backgroundColor: "var(--c-surface)",
                    border: "1.5px dashed var(--c-border)",
                    borderRadius: 16,
                  }}
                >
                  <h3
                    className="font-heading font-bold mb-2"
                    style={{ color: "var(--c-text)", fontSize: "1rem" }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      color: "var(--c-muted-strong)",
                      fontSize: "0.92rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Extra sections (e.g. SABI inside Stayza Pro) */}
          {cs.sections?.map((s, i) => (
            <Section
              key={s.heading}
              label={`0${5 + i} / DEEP DIVE`}
              title={s.heading}
              delay={0.25}
            >
              <Prose>{s.body}</Prose>
            </Section>
          ))}

          {/* Outcome */}
          <Section
            label={`0${5 + (cs.sections?.length ?? 0)} / OUTCOME`}
            title="Where it landed"
            delay={0.3}
          >
            <Prose>{cs.outcome}</Prose>
          </Section>

          {/* Stack */}
          <Section label="STACK" delay={0.35}>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((t) => (
                <span
                  key={t}
                  className="font-mono px-3 py-1.5"
                  style={{
                    backgroundColor: "var(--c-tag-bg-inner)",
                    color: "var(--c-text)",
                    border: "1px solid var(--c-border)",
                    borderRadius: 999,
                    fontSize: "0.75rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="mt-20 p-8 md:p-10 text-center"
            style={{
              border: "1.5px dashed var(--c-accent)",
              borderRadius: 16,
              backgroundColor: `rgba(var(--c-accent-rgb),0.04)`,
            }}
          >
            <h2
              className="font-display font-bold mb-3"
              style={{ color: "var(--c-text)", fontSize: "1.8rem" }}
            >
              Want something like this built?
            </h2>
            <p
              className="font-body mb-7 mx-auto"
              style={{
                color: "var(--c-muted-strong)",
                fontSize: "1rem",
                maxWidth: "48ch",
              }}
            >
              I'm available for full-time roles and contract work. I reply to
              every genuine enquiry within two business days.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-sm uppercase transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--c-accent)",
                  color: "var(--c-bg)",
                  borderRadius: 8,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                Get in touch
              </Link>
              <Link
                to="/#projects"
                className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-sm uppercase transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  color: "var(--c-accent)",
                  border: "1.5px solid var(--c-accent)",
                  borderRadius: 8,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                See other work
              </Link>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};
