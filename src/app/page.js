import Hero from "@/components/home/Hero";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Navbar />
      <Hero />
    </main>
  );
}
