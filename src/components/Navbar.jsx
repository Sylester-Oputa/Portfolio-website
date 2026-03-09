import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "SKILLS", href: "#skills" },
  { num: "03", label: "WORK", href: "#projects" },
  { num: "04", label: "EXPERIENCE", href: "#experience" },
  { num: "05", label: "CONTACT", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { isDark, toggleTheme } = useTheme();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      setDrawerOpen(false);
      const el = document.querySelector(href);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, drawerOpen ? 350 : 0);
      }
    },
    [drawerOpen]
  );

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: isScrolled ? "var(--c-surface)" : "transparent",
          borderBottom: isScrolled ? "1px dashed var(--c-border)" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="font-display font-bold text-xl select-none"
            style={{ color: "var(--c-accent)" }}
          >
            SOO
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono uppercase relative group"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color:
                    activeSection === link.href.slice(1)
                      ? "var(--c-accent)"
                      : "var(--c-text)",
                  transition: "color 150ms",
                }}
              >
                <span style={{ color: "var(--c-muted)", marginRight: 4 }}>
                  {link.num}/
                </span>
                {link.label}
                {/* Active underline */}
                <span
                  className="absolute left-0 -bottom-1 h-px transition-all duration-300"
                  style={{
                    backgroundColor: "var(--c-accent)",
                    width:
                      activeSection === link.href.slice(1) ? "100%" : "0%",
                  }}
                />
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-2 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                color: "var(--c-muted)",
                border: "1px solid var(--c-border)",
                backgroundColor: "transparent",
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Hamburger button */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[60]"
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block rounded-sm transition-all duration-250"
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--c-text)",
                transform: drawerOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block rounded-sm transition-all duration-250"
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--c-text)",
                opacity: drawerOpen ? 0 : 1,
              }}
            />
            <span
              className="block rounded-sm transition-all duration-250"
              style={{
                width: 22,
                height: 2,
                backgroundColor: "var(--c-text)",
                transform: drawerOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: "var(--c-overlay)" }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[56] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: "min(280px, calc(100vw - 40px))",
                backgroundColor: "var(--c-surface)",
                borderLeft: "1px dashed var(--c-border)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-center py-6"
                style={{ borderBottom: "1px dashed var(--c-border)" }}
              >
                <span
                  className="font-display font-bold text-2xl"
                  style={{ color: "var(--c-accent)" }}
                >
                  SOO
                </span>
              </div>

              {/* Drawer nav links */}
              <div className="flex flex-col py-8 px-6 gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                    className="font-heading py-3 px-3 rounded-lg transition-all duration-150"
                    style={{
                      fontSize: "1.4rem",
                      color:
                        activeSection === link.href.slice(1)
                          ? "var(--c-accent)"
                          : "var(--c-text)",
                      borderLeft:
                        activeSection === link.href.slice(1)
                          ? "3px solid var(--c-accent)"
                          : "3px solid transparent",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Theme toggle in drawer */}
              <div className="flex justify-center pb-4">
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-mono transition-all duration-200"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--c-muted)",
                    border: "1px solid var(--c-border)",
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              {/* Drawer footer social links */}
              <div
                className="flex items-center justify-center gap-6 py-6 font-mono"
                style={{
                  fontSize: "12px",
                  color: "var(--c-muted)",
                  borderTop: "1px dashed var(--c-border)",
                }}
              >
                <a
                  href="https://github.com/Sylester-Oputa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/sylvester-oputa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:sylvesteroputa366@gmail.com"
                  className="transition-colors"
                  style={{ color: "inherit" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  Email
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Scroll Progress Bar ── */
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[51] transition-all duration-150"
      style={{
        width: `${progress}%`,
        backgroundColor: "var(--c-accent)",
      }}
    />
  );
};
