import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import planaiIcon from "@/assets/planai-icon.png";

const links = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#upcoming", label: "Upcoming" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLanding = pathname === "/";

  return (
    <header
      className={`fixed top-3 left-1/2 z-40 -translate-x-1/2 w-[min(96%,1200px)] rounded-2xl transition-all duration-500 ${
        scrolled ? "glass-strong shadow-card" : "glass"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 group" aria-label="PlanAI home">
          <img src={planaiIcon} alt="PlanAI logo" className="h-12 w-12 object-contain" />
          <span className="font-display text-2xl font-semibold tracking-tight text-white">
            Plan<span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {onLanding &&
            links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-muted/50"
              >
                {l.label}
              </a>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" className="rounded-full">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon transition" style={{ backgroundSize: "200% 200%" }}>
              Get Started
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/30 px-4 py-3 animate-fade-in">
          <div className="flex flex-col gap-1">
            {onLanding &&
              links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            <div className="mt-2 flex gap-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full rounded-full">Log in</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full rounded-full bg-gradient-aurora text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
