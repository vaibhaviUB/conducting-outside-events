import { Brain } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-border/30 py-12 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-aurora animate-aurora" style={{ backgroundSize: "200% 200%" }}>
            <Brain className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-base font-semibold">
            Calm<span className="text-gradient">AI</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © 2026 CalmAI · Built for students, by students who get it.
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Help</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
