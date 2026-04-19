import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center gradient-primary rounded-3xl p-12 md:p-20">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
          Ready to Break Free from Stress?
        </h2>
        <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
          Join thousands of students discovering outdoor events that make college life unforgettable.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-primary-foreground text-foreground hover:bg-primary-foreground/90 text-base px-8 h-12 rounded-full"
          asChild
        >
          <Link to="/signup">
            Join CampusVibe <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
