import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export const CV_VARIANTS = [
  {
    id: "full-stack",
    label: "Full-Stack Engineer",
    blurb:
      "Product definition through to shipped interfaces — React and Next.js frontends on top of the API work.",
    highlights: ["React 19 / Next.js 16", "Product & system design", "8 roles, 7 projects"],
    file: "/CVs/Sylvester-Oputa-Full-Stack-Engineer-CV.pdf",
  },
  {
    id: "backend",
    label: "Backend Engineer",
    blurb:
      "APIs, payments and multi-tenant systems — schema design through to deployment and monitoring.",
    highlights: ["TypeScript / Node / Prisma", "Payments & escrow flows", "6 roles, 5 projects"],
    file: "/CVs/Sylvester-Oputa-Backend-Engineer-CV.pdf",
  },
];

export const CVModal = ({ open, onClose }) => {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  // Remember what was focused, move focus into the dialog, restore on close.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const t = setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Escape to dismiss, and keep Tab inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Don't let the page scroll behind the dialog.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          style={{ backgroundColor: "var(--c-overlay)", backdropFilter: "blur(3px)" }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-desc"
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[640px] max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: "var(--c-surface)",
              border: "1.5px solid var(--c-border)",
              borderRadius: 16,
              boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
            }}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span
                  className="font-mono uppercase"
                  style={{
                    color: "var(--c-muted)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                  }}
                >
                  Download CV
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 p-1 transition-colors duration-150"
                  style={{ color: "var(--c-muted-strong)", borderRadius: 6 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted-strong)")}
                >
                  <X size={18} />
                </button>
              </div>

              <h2
                id="cv-modal-title"
                className="font-heading font-bold mb-2"
                style={{ color: "var(--c-text)", fontSize: "1.5rem" }}
              >
                Which role are you hiring for?
              </h2>
              <p
                id="cv-modal-desc"
                className="font-body mb-6"
                style={{ color: "var(--c-muted-strong)", fontSize: "0.95rem" }}
              >
                Same work, two framings. Pick whichever matches the role and the
                PDF downloads straight away.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CV_VARIANTS.map((cv) => (
                  <a
                    key={cv.id}
                    href={cv.file}
                    download
                    onClick={onClose}
                    className="group flex flex-col p-5 transition-all duration-200"
                    style={{
                      backgroundColor: "var(--c-tag-bg-inner)",
                      border: "1.5px dashed var(--c-border)",
                      borderRadius: 12,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--c-accent)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--c-border)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span
                      className="font-heading font-bold mb-2"
                      style={{ color: "var(--c-text)", fontSize: "1.05rem" }}
                    >
                      {cv.label}
                    </span>
                    <span
                      className="font-body mb-4"
                      style={{ color: "var(--c-muted-strong)", fontSize: "0.85rem" }}
                    >
                      {cv.blurb}
                    </span>

                    <ul className="mb-5 space-y-1.5">
                      {cv.highlights.map((h) => (
                        <li
                          key={h}
                          className="font-mono flex items-start gap-2"
                          style={{ color: "var(--c-muted)", fontSize: "0.72rem" }}
                        >
                          <ArrowRight size={11} style={{ marginTop: 3, flexShrink: 0 }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <span
                      className="font-mono uppercase inline-flex items-center gap-2 mt-auto"
                      style={{
                        color: "var(--c-accent)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                      }}
                    >
                      <Download size={13} /> Download PDF
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
