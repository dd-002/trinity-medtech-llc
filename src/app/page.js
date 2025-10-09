import Hero from "@/components/home/Hero";
import Navbar from "@/components/Navbar";
import BentoShowcase from "@/components/home/BentoShowcase";
import StoriesCarousel from "@/components/home/Stories";
import BioHero from "@/components/home/StoriesHero";

const STORIES = [
  {
    id: "1",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock1.jpg",
    href: "/products/skillrun",
  },
  {
    id: "2",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "3",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
  {
    id: "4",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock7.png",
    href: "/products/skillrun",
  },
  {
    id: "5",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "6",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
  {
    id: "7",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock7.png",
    href: "/products/skillrun",
  },
  {
    id: "8",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "9",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Navbar />
      <Hero />
      <BentoShowcase />
      <BioHero />
      <StoriesCarousel stories={STORIES} delay={5000} visibleCount={3} />
    </main>
  );
}
