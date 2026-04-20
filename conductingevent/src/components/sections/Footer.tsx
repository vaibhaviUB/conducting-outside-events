import planaiIcon from "@/assets/planai-icon.png";

const Footer = () => (
  <footer className="relative border-t border-border/30 py-12 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={planaiIcon} alt="PlanAI logo" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl font-semibold text-white">
            Plan<span className="text-gradient">AI</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © 2026 PlanAI · Built for students, by students who get it.
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
