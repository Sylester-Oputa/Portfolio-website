import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL = "sylvesteroputa366@gmail.com";

const intents = [
  { id: "hire", label: "Hiring for a role" },
  { id: "build", label: "Need something built" },
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

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intent, setIntent] = useState("hire");

  // Hero CTAs preset the intent so the message arrives already labelled
  useEffect(() => {
    const onIntent = (e) => setIntent(e.detail === "build" ? "build" : "hire");
    window.addEventListener("set-contact-intent", onIntent);
    return () => window.removeEventListener("set-contact-intent", onIntent);
  }, []);

  /* Opens the user's mail client with the message pre-filled. Only used when
     no form backend is configured, or when the network request fails — and we
     tell the user that's what happened rather than claiming it was sent. */
  const openMailFallback = ({ name, email, message, intentLabel }) => {
    const subject = encodeURIComponent(`Portfolio enquiry — ${intentLabel}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nIntent: ${intentLabel}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);

    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      intentLabel:
        intents.find((i) => i.id === intent)?.label ?? "General enquiry",
    };

    // Honeypot — bots fill hidden fields, humans don't
    if (data.get("botcheck")) {
      setIsSubmitting(false);
      return;
    }

    if (!ACCESS_KEY) {
      openMailFallback(payload);
      toast({
        title: "Opening your email app",
        description:
          "Direct sending isn't configured yet — your message is pre-filled, just hit send.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry — ${payload.intentLabel}`,
          from_name: "sylvester-oputa.site",
          name: payload.name,
          email: payload.email,
          intent: payload.intentLabel,
          message: payload.message,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      toast({
        title: "Message sent",
        description: "Thanks — I'll get back to you within two business days.",
      });
      form.reset();
    } catch (err) {
      openMailFallback(payload);
      toast({
        title: "Couldn't send directly",
        description:
          "Opening your email app instead with the message pre-filled.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: "var(--c-surface)",
    border: "1.5px solid var(--c-border)",
    borderRadius: 8,
    color: "var(--c-text)",
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
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
            {/* Honeypot — visually hidden, bots fill it */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: "none",
              }}
            />

            {/* Intent — preset by the hero CTAs */}
            <fieldset>
              <legend
                className="font-mono block mb-3"
                style={{
                  color: "var(--c-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                }}
              >
                I'M REACHING OUT BECAUSE
              </legend>
              <div className="flex flex-wrap gap-3">
                {intents.map((opt) => {
                  const active = intent === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setIntent(opt.id)}
                      aria-pressed={active}
                      className="font-mono px-4 py-2 transition-all duration-150"
                      style={{
                        fontSize: "0.78rem",
                        borderRadius: 999,
                        border: `1.5px solid ${
                          active ? "var(--c-accent)" : "var(--c-border)"
                        }`,
                        backgroundColor: active
                          ? `rgba(var(--c-accent-rgb),0.1)`
                          : "transparent",
                        color: active
                          ? "var(--c-accent)"
                          : "var(--c-muted-strong)",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

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

            <p
              className="font-mono text-center"
              style={{ color: "var(--c-muted)", fontSize: "0.72rem" }}
            >
              I reply to every genuine enquiry within two business days.
            </p>
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
