import Hero from "@/components/home/Hero";
import Navbar from "@/components/Navbar";
import BentoShowcase from "@/components/home/BentoShowcase";

export default function HomePage() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Navbar />
      <Hero />
      <BentoShowcase />
    </main>
  );
}
