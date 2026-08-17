import { createContext, useContext, useState, useLayoutEffect } from "react";

const ThemeContext = createContext();

// Light palette (warm parchment)
// Contrast vs --c-bg #F5F0E8: text 10.6:1 · muted-strong 6.4:1 · muted 5.1:1
// · accent 8.6:1 · secondary 4.9:1 — all clear WCAG AA for normal text.
const light = {
  "--c-bg": "#F5F0E8",
  "--c-surface": "#FDFAF4",
  "--c-border": "#D9CEBC",
  "--c-accent": "#2C4A3E",
  "--c-accent-rgb": "44,74,62",
  "--c-secondary": "#8B5E3C",
  "--c-text": "#3D3530",
  "--c-muted-strong": "#5F5648",
  "--c-muted": "#6E6455",
  "--c-contact-bg": "#EDE8DD",
  "--c-tag-bg": "#FDFAF4",
  "--c-tag-bg-inner": "#F5F0E8",
  "--c-overlay": "rgba(61,53,48,0.4)",
  "--c-inset": "rgba(255,255,255,0.6)",
  "--c-selection-bg": "rgba(44,74,62,0.15)",
  "--c-cursor-primary": "#2C4A3E",
  "--c-cursor-secondary": "#8B5E3C",
  "--c-scrollbar-track": "#F5F0E8",
  "--c-scrollbar-thumb": "#D9CEBC",
  "--c-scrollbar-hover": "#6E6455",
};

// Dark palette (warm dark — like a leather journal at midnight)
// Contrast vs --c-bg #1A1714: text 11.7:1 · muted-strong 7.7:1 · muted 5.5:1
// · accent 8.2:1 · secondary 6.7:1 — all clear WCAG AA for normal text.
const dark = {
  "--c-bg": "#1A1714",
  "--c-surface": "#242019",
  "--c-border": "#3A3530",
  "--c-accent": "#6DBFA0",
  "--c-accent-rgb": "109,191,160",
  "--c-secondary": "#C4956A",
  "--c-text": "#DAD0C4",
  "--c-muted-strong": "#B5A899",
  "--c-muted": "#9A8D80",
  "--c-contact-bg": "#1E1B17",
  "--c-tag-bg": "#242019",
  "--c-tag-bg-inner": "#1A1714",
  "--c-overlay": "rgba(10,8,6,0.6)",
  "--c-inset": "rgba(255,255,255,0.04)",
  "--c-selection-bg": "rgba(109,191,160,0.2)",
  "--c-cursor-primary": "#6DBFA0",
  "--c-cursor-secondary": "#C4956A",
  "--c-scrollbar-track": "#1A1714",
  "--c-scrollbar-thumb": "#3A3530",
  "--c-scrollbar-hover": "#9A8D80",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("SOO-theme");
    // Default to dark mode
    return saved ? saved === "dark" : true;
  });

  useLayoutEffect(() => {
    const palette = isDark ? dark : light;
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem("SOO-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
