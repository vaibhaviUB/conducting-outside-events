import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusVibe — Outdoor Events for College Students" },
      { name: "description", content: "Discover outdoor events designed to help college students relax, socialize, and recharge beyond the classroom." },
      { property: "og:title", content: "CampusVibe — Outdoor Events for College Students" },
      { property: "og:description", content: "Discover outdoor events designed to help college students relax, socialize, and recharge beyond the classroom." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
