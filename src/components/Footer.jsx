export const Footer = () => {
  return (
    <footer
      className="py-10 text-center"
      style={{ borderTop: "1px dashed var(--c-border)" }}
    >
      <p
        className="font-body italic"
        style={{ color: "var(--c-muted)", fontSize: "0.9rem" }}
      >
        Sylvester Obiwuru Oputa &middot; Full Stack Developer &middot; &copy;{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};
