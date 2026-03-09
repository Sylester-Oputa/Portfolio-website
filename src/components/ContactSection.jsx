import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS or mailto fallback
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:sylvesteroputa366@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      toast({
        title: "Message prepared!",
        description: "Your email client should open shortly.",
      });
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  const inputStyle = {
    backgroundColor: "var(--c-surface)",
    border: "1.5px solid var(--c-border)",
    borderRadius: 8,
    color: "var(--c-text)",
    fontFamily: "'Source Serif 4', serif",
    fontSize: "0.95rem",
  };

  return (
    <section
      id="contact"
      className="py-[120px] relative"
      style={{ backgroundColor: "var(--c-contact-bg)" }}
    >
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container"
      >
        {/* Section header */}
        <div className="mb-16 text-center">
          <span
            className="font-mono block mb-3"
            style={{ color: "var(--c-muted)", fontSize: "0.85rem" }}
          >
            07 / CONTACT
          </span>
          <h2
            className="font-display italic font-bold mb-4"
            style={{ color: "var(--c-text)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's Build Something.
          </h2>
          <p
            className="font-body italic max-w-lg mx-auto"
            style={{ color: "var(--c-muted)", fontSize: "1.1rem" }}
          >
            Open to remote, contract, and on-site opportunities globally.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact form */}
          <motion.form
            custom={0}
            variants={childVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-6 mb-12"
          >
            <div>
              <label
                htmlFor="name"
                className="font-mono block mb-2"
                style={{ color: "var(--c-muted)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
              >
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 focus:outline-none focus:ring-2"
                style={inputStyle}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-mono block mb-2"
                style={{ color: "var(--c-muted)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 focus:outline-none focus:ring-2"
                style={inputStyle}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-mono block mb-2"
                style={{ color: "var(--c-muted)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 resize-none focus:outline-none focus:ring-2"
                style={inputStyle}
                placeholder="Hello, I'd like to discuss..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-mono uppercase tracking-wider py-3 transition-all duration-200 hover:translate-y-[-2px] disabled:opacity-60"
              style={{
                backgroundColor: "var(--c-accent)",
                color: "var(--c-bg)",
                borderRadius: 8,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            custom={1}
            variants={childVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center gap-3 font-mono"
            style={{ color: "var(--c-muted)", fontSize: "0.8rem" }}
          >
            <a
              href="mailto:sylvesteroputa366@gmail.com"
              className="transition-colors duration-150"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            >
              sylvesteroputa366@gmail.com
            </a>
            <a
              href="https://github.com/Sylester-Oputa"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            >
              github.com/Sylester-Oputa
            </a>
            <a
              href="https://linkedin.com/in/sylvester-oputa"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            >
              linkedin.com/in/sylvester-oputa
            </a>
            <a
              href="tel:+2349034901283"
              className="transition-colors duration-150"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
            >
              +234-903-490-1283
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
