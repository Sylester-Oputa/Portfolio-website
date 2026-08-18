import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const companies = [
  "Creative Natives",
  "Emblue Africa",
  "JoinTearn",
  "OA Softwares",
  "Novnuga",
  "MAR ABU Projects",
  "Upwey",
  "Proxynet",
];

export const ProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      aria-label="Companies worked with"
      className="py-12 relative"
      style={{ borderTop: "1px dashed var(--c-border)", borderBottom: "1px dashed var(--c-border)" }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <p
          className="font-mono uppercase text-center mb-6"
          style={{
            color: "var(--c-muted)",
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
          }}
        >
          Shipped for
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {companies.map((c) => (
            <span
              key={c}
              className="font-heading"
              style={{
                color: "var(--c-muted-strong)",
                fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
