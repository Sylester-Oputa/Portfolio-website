import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Persistent conversion bar. Appears once the hero has scrolled away and
 * hides again over the contact section, so it never competes with the form
 * it's pointing at.
 */
export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("#hero");
      const contact = document.querySelector("#contact");
      if (!hero) return;

      const pastHero = window.scrollY > hero.offsetHeight * 0.8;
      const atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;

      setVisible(pastHero && !atContact);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (intent) => () => {
    window.dispatchEvent(
      new CustomEvent("set-contact-intent", { detail: intent })
    );
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            backgroundColor: "var(--c-surface)",
            borderTop: "1px dashed var(--c-border)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="container flex items-center justify-between gap-4 py-3">
            <p
              className="font-mono hidden sm:block"
              style={{ color: "var(--c-muted-strong)", fontSize: "0.78rem" }}
            >
              Available for roles and contract work — replies within 2 days.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={go("hire")}
                className="font-mono uppercase flex-1 sm:flex-none px-6 py-2.5 transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--c-accent)",
                  color: "var(--c-bg)",
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                Hire me
              </button>
              <button
                onClick={go("build")}
                className="font-mono uppercase flex-1 sm:flex-none px-6 py-2.5 transition-transform duration-150 hover:-translate-y-0.5"
                style={{
                  color: "var(--c-accent)",
                  border: "1.5px solid var(--c-accent)",
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                Build with me
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
