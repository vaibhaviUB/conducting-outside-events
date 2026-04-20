import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4">
    <div className="container mx-auto">
      <div className="mx-auto max-w-4xl text-center rounded-3xl bg-background/35 backdrop-blur-md border border-border/30 shadow-2xl px-6 sm:px-10 py-12 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-neon-cyan" />
          AI-powered student wellness
        </div>

        <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] animate-fade-in-up text-foreground">
          Relax. Refresh.
          <br />
          <span className="text-gradient">Reconnect.</span>
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-foreground/80 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          Exams, assignments, deadlines — your brain deserves a break. Discover curated outside events,
          track your stress, and build healthier rhythms with an AI that quietly looks out for you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a href="#events">
            <Button size="lg" className="rounded-full bg-gradient-aurora text-white shadow-glow hover:shadow-neon h-12 px-7 text-base" style={{ backgroundSize: "200% 200%" }}>
              Explore Events
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </a>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="rounded-full glass border-border/40 h-12 px-7 text-base hover:shadow-glow">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          {[
            { v: "12k+", l: "Students" },
            { v: "320+", l: "Events" },
            { v: "94%", l: "Less stress" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient">{s.v}</div>
              <div className="mt-1 text-xs sm:text-sm text-foreground/70">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* scroll hint */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
      <div className="h-9 w-5 rounded-full border border-border/60 flex items-start justify-center p-1">
        <div className="h-1.5 w-1 rounded-full bg-foreground animate-float" />
      </div>
    </div>
  </section>
);

export default Hero;
