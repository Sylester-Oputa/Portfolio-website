export const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      <h1
        className="font-display font-bold mb-4"
        style={{ color: "var(--c-accent)", fontSize: "6rem", lineHeight: 1 }}
      >
        404
      </h1>
      <p className="font-body mb-8" style={{ color: "var(--c-muted)", fontSize: "1.1rem" }}>
        This page doesn't exist.
      </p>
      <a
        href="/"
        className="font-mono uppercase px-6 py-3 transition-all duration-200"
        style={{
          backgroundColor: "var(--c-accent)",
          color: "var(--c-bg)",
          borderRadius: 8,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
        }}
      >
        Back to Home
      </a>
    </div>
  );
};
