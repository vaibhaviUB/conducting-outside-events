import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-event.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img
        src={heroImage}
        alt="College students enjoying an outdoor campus event"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 gradient-hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Campus Events Reimagined</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto">
            Unwind. Connect.{" "}
            <span className="text-gradient">Celebrate.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Discover and join outdoor events designed to help college students relax,
            socialize, and recharge beyond the classroom.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-primary border-0 text-base px-8 h-12 rounded-full" asChild>
              <Link to="/signup">
                Get Started <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" asChild>
              <Link to="/login">Explore Events</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex justify-center gap-12 text-primary-foreground/70"
        >
          {[
            { label: "Events Hosted", value: "200+" },
            { label: "Happy Students", value: "5,000+" },
            { label: "Colleges", value: "15+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary-foreground font-heading">{stat.value}</div>
              <div className="text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
