import Navbar from "@/components/Navbar";
import NeuralBackground from "@/components/NeuralBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Upcoming from "@/components/sections/Upcoming";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => (
  <main className="relative">
    <NeuralBackground />
    <Navbar />
    <Hero />
    <About />
    <Events />
    <Upcoming />
    <Gallery />
    <Testimonials />
    <Contact />
    <Footer />
  </main>
);

export default Index;
