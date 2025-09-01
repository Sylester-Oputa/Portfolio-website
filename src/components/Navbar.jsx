import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> LukaTech </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 lg:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Mobile menu header with logo only */}
          <div className="absolute top-5 left-4">
            <a
              className="text-xl font-bold text-primary flex items-center"
              href="#hero"
            >
              <span className="relative z-10">
                <span className="text-glow text-foreground"> LukaTech </span>{" "}
                Portfolio
              </span>
            </a>
          </div>

          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Theme toggle at bottom */}
          <div className="absolute bottom-8">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full transition-colors duration-300 bg-card shadow-lg"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" />
              ) : (
                <Moon className="h-6 w-6 text-blue-900" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
